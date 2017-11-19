<template>
  <div class="wrapper">
    <div id="appointment">
      <div class="title">Request Appointment</div>

      <div class="sections">
        <div class="trigger-section">
          <div class="trigger" :class="addClass(1, 'active')" data-open="scan-section" data-type="1" @click="switchView">Scan Appointment</div>
          <div class="trigger" :class="addClass(2, 'active')" data-open="treatment-section" data-type="2" @click="switchView">Treatment Appointment</div>
        </div>

        <div class="view-section">
          <div class="official-info" v-if="officialSN >= 0 && official.fee >= 0">
            <div class="official-name official-detail">Appointment with: <span>{{official.name}}</span></div>
            <div class="official-fee official-detail">Fee: <span>${{official.fee}}</span></div>
          </div>

          <div class="scan-section" :class="addClass(1, 'showing')" id="scan-section">
            <div class="entry-item">
              <div class="entry-param">Preferred Date *</div>
              <div class="entry-value">
                <datepicker   v-model="scanDate" class="list appointment-date scan-date" id="scan-date" @selected="validateScanDate"></datepicker>
              </div>
            </div>

            <div class="entry-item">
              <div class="entry-param">Preferred Time *</div>
              <div class="entry-value">
                <select id="scan-time" class="list">
                  <option>Select</option>
                  <option>Morning (8AM - 12PM)</option>
                  <option>Early Afternoon (12PM - 3PM)</option>
                  <option>Late Afternoon (3PM - 6PM)</option>
                </select>
              </div>
            </div>

            <div class="entry-item">
              <div class="entry-param">Appointment For *</div>
              <div class="entry-value">
                <select id="scan-appointment" class="list" :disabled="officialSN >= 0 && official.fee >= 0"></select>
              </div>
            </div>

            <div class="entry-item">
              <div class="entry-param">Do you have insurance?</div>
              <div class="entry-value">
                <select id="scan-insurance-query" class="list">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div class="entry-item comment">
              <div class="entry-param">Additional Comments [128 characters max]</div>
              <div class="entry-value">
                <textarea id="scan-comment" class="list" maxlength="128"></textarea>
              </div>
            </div>

            <div class="submit">
              <input type="button" class='post button' value="Send" @click="writeScanRequest">
            </div>
          </div>

          <div class="treatment-section" :class="addClass(2, 'showing')" id="treatment-section">
            <div class="entry-item">
              <div class="entry-param">Do you have insurance?</div>
              <div class="entry-value">
                <select id="treatment-insurance-query" class="list">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div class="entry-item">
              <div class="entry-param">Scan Result *</div>
              <div class="entry-value">
                <label for="scan-result" class="scan-result-trigger list">
                  <span class="icon"></span>
                  <span class="text">Choose Scan Result</span>
                </label>
                <input id="scan-result" type="file" accept="image/*" multiple></select>
              </div>
            </div>

            <div class="entry-item comment">
              <div class="entry-param">Additional Comments [128 characters max]</div>
              <div class="entry-value">
                <textarea id="treatment-comment" class="list" maxlength="128"></textarea>
              </div>
            </div>

            <div class="submit">
              <input type="button" class='post button' value="Send" @click="writeTreatmentAppointment">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      Datepicker
    },
    computed: {
      user () {
        return this.$root.user
      },
      official () {
        let official = this.$store.state.searchResult.findDentists.data[this.officialOffset]
        return official ? official[this.officialSN] : {}
      },
      officialOffset () {
        return this.$route.query.o
      },
      officialSN () {
        return this.$route.query.sn
      }
    },
    data: function () {
      return {
        scanDate: '',
        scanDateError: true
      }
    },
    methods: {
      setEventListeners () {
        const _this = this
        document.querySelector('#appointment').addEventListener('change', function (evt) {
          const target = evt.target
          switch (true) {
            case (['scan-time', 'scan-appointment'].includes(target.id)):
              _this.clearError(target)
              break
            case (['scan-result'].includes(target.id)):
              const label = target.closest('.entry-value').querySelector('.scan-result-trigger')
              _this.clearError(label)
              const fileNames = Array.from(target.files).map(file => file.name).join(', ')
              label.querySelector('.text').innerHTML = truncate(fileNames, 50)
              break
            case (['scan-insurance-query', 'treatment-insurance-query'].includes(target.id)):
              const serviceTypeId = target.id === 'scan-insurance-query' ? 1 : 2
              const choice = target.selectedIndex
              let DOMElement
              if (choice === 0 || choice === 2) {
                let insuranceDOMElement = target.closest('.entry-item').nextElementSibling
                insuranceDOMElement = insuranceDOMElement.classList.contains('insurance') ? insuranceDOMElement : null
                if (insuranceDOMElement) _this.removeDOMElement(insuranceDOMElement)
              } else {
                DOMElement = _this.createDOMElementFromString(`
                  <div class="entry-item insurance">
                    <div class="entry-param">Insurance Name</div>
                    <div class="entry-value">
                      <input id="${serviceTypeId === 1 ? 'scan' : 'treatment'}-insurance" class="list" type="text">
                    </div>
                  </div>
                `)
                _this.appendDOMElementAfter(DOMElement, target.closest('.entry-item'), document.querySelector(`.${serviceTypeId === 1 ? 'scan' : 'treatment'}-section`))
              }

              break
          }
        })
      },
      removeDOMElement (DOMElement) {
        DOMElement.remove()
      },
      createDOMElement (tagName, attributes = {}) {
        const tag = document.createElement(tagName)
        Object.keys(attributes).forEach((attribute) => {
          tag[attribute] = attributes[attribute]
        })

        return tag
      },
      createDOMElementFromString (DOMString) {
        return new DOMParser().parseFromString(DOMString, 'text/html').body.firstChild
      },
      appendDOMElementAfter (DOMElement, target, parentDOMElement) {
        parentDOMElement.insertBefore(DOMElement, target.nextElementSibling)
      },
      validateScanDate (dateValue) {
        const today = Math.floor(+(new Date()) / 36000000)
        const pickedDate = Math.floor(+dateValue / 36000000)
        if (today > pickedDate) {
          this.addError(document.querySelector('.scan-date'))
          this.scanDateError = true
        } else {
          this.clearError(document.querySelector('.scan-date'))
          this.scanDateError = false
        }
      },
      serviceTypeIndex () {
        return Number(this.official.serviceTypeId || this.$route.query.sTI || 1)
      },
      serviceSubtypeIndex () {
        return Number(this.official.serviceId || this.$route.query.sSI || 0)
      },
      addClass (check, value) {
        return this.serviceTypeIndex() === check || (!this.serviceTypeIndex() && check === 1) ? value : ''
      },
      switchView (evt) {
        const target = evt.target
        if (!(target.classList.contains('active'))) {
          document.querySelector('.showing').classList.remove('showing')
          document.querySelector('.active').classList.remove('active')
          target.classList.add('active')
          document.querySelector(`.${target.dataset.open}`).classList.add('showing')
          const serviceType = Number(target.dataset.type)
          this.updateAddressBar(serviceType)
          this.populateServices(serviceType)
        }
      },
      updateAddressBar (serviceType = 1) {
        this.$router.push({
          path: '/request-appointment',
          query: {
            sTI: serviceType
          }
        })
      },
      dispatchEventFrom (DOMElement, eventType) {
        const eventObject = document.createEvent('HTMLEvents')
        eventObject.initEvent(eventType, true, true)
        DOMElement.dispatchEvent(eventObject)
      },
      cancelButton () {
        const DOMELement = new DOMParser().parseFromString(`<input type="button" class="button cancel" value="Cancel">`, 'text/html')
        return DOMELement.body.firstChild
      },
      addError (target) {
        target.classList.add('error')
      },
      clearError (target) {
        target.classList.remove('error')
      },
      populateServices (serviceTypeId = 1) {
        const serviceTypeIndex = this.serviceTypeIndex() || serviceTypeId
        const serviceSubtypesElement = document.getElementById(`${serviceTypeIndex === 1 ? 'scan-appointment' : 'treatment-appointment'}`)
        if (serviceSubtypesElement) {
          this.clearDOMElementChildren(serviceSubtypesElement)
          const serviceSubtypes = serviceTypes[serviceTypeIndex].subtypes
          serviceSubtypes.forEach((serviceSubtype, index) => {
            const optionElement = document.createElement('option')
            optionElement.text = serviceSubtype
            if (serviceSubtypesElement) {
              serviceSubtypesElement.appendChild(optionElement)
              if (index === this.serviceSubtypeIndex()) optionElement.selected = true
            }
          })
        }
      },
      writeScanRequest () {
        const appointmentDate = (+(this.scanDate)).toString()
        const scanTime = document.getElementById('scan-time').options[document.getElementById('scan-time').selectedIndex].value
        const scanAppointmentId = Number(document.getElementById('scan-appointment').selectedIndex)
        const scanInsuranceQuery = Number(document.getElementById('scan-insurance-query').selectedIndex)
        const scanInsurance = scanInsuranceQuery === 1 ? document.getElementById('scan-insurance').value : ''
        const scanComment = document.getElementById('scan-comment').value
        let errors = [scanTime === 0 ? document.getElementById('scan-time') : undefined, scanAppointmentId === 0 ? document.getElementById('scan-appointment') : undefined, this.scanDateError ? document.querySelector('.scan-date') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            this.addError(item)
          })
        } else {
          this.scrollToTop()
          this.disableNecessaryButtons()
          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteData({
            requestParams: {
              dentistId: this.official.coinbase || '0x0',
              scanAppointmentId,
              appointmentDate: `b${appointmentDate}`,
              scanTime: `b${scanTime}`,
              scanInsurance: `b${scanInsurance}`,
              scanComment: `b${scanComment}`
            },
            contractIndexToUse: 2,
            methodName: 'writeScanRequest',
            managerIndex: 2,
            callback: (status) => {
              this.endWait(document.querySelector('.wrapper'))
              this.enableNecessaryButtons()
              if (status) {
                this.updateAddressBar()
                this.populateServices()
              }

              this.notify(status ? 'Scan Appointment Successfully added' : 'Unable to add Scan Appointment')
            }
          })
        }
      },
      writeTreatmentAppointment () {
        const treatmentInsuranceQuery = Number(document.getElementById('treatment-insurance-query').selectedIndex)
        const treatmentInsurance = treatmentInsuranceQuery === 1 ? document.getElementById('treatment-insurance').value : ''
        const treatmentComment = document.getElementById('treatment-comment').value
        let errors = [document.getElementById('scan-result').files.length === 0 ? document.getElementById('scan-result') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            if (item.id === 'scan-result') {
              const label = item.closest('.entry-value').querySelector('.scan-result-trigger')
              this.addError(label)
            } else {
              this.addError(item)
            }
          })
        } else {
          const scanResultURL = this.getURLFromFileUpload(document.getElementById('scan-result'))
          this.scrollToTop()
          this.disableNecessaryButtons()
          this.beginWait(document.querySelector('.wrapper'))
          scanResultURL
          .then((urls) => {
            this.$root.callToWriteData({
              requestParams: {
                treatmentInsurance,
                urls,
                treatmentComment
              },
              methodName: 'writeTreatmentAppointment',
              callback: (status) => {
                this.endWait(document.querySelector('.wrapper'))
                this.enableNecessaryButtons()
                if (status) {
                  this.updateAddressBar()
                  this.populateServices()
                }

                this.notify(status ? 'Treatment Appointment Successfully added' : 'Unable to add Treatment Appointment')
              }
            })
          })
          .catch((e) => {
            console.log(e)
          })
        }
      },
      getURLFromFileUpload (fileDOMElement) {
        const files = Array.from(fileDOMElement.files)
        return new Promise(function (resolve, reject) {
          console.log(files)
          resolve(files.map(file => file.name).join('~~~'))
        })
      },
      clearDOMElementChildren (DOMElement) {
        while (DOMElement.hasChildNodes()) {
          DOMElement.firstChild.remove()
        }
      },
      disableNecessaryButtons (evt) {
        Array.from(document.querySelectorAll('.button')).forEach(button => this.disableButton(button))
      },
      enableNecessaryButtons (evt) {
        Array.from(document.querySelectorAll('.button')).forEach(button => this.enableButton(button))
      },
      disableButton (target) {
        target.disabled = true
        target.style.cursor = 'not-allowed'
        target.style.background = '#adcddf'
      },
      enableButton (target) {
        target.disabled = false
        target.style.cursor = 'pointer'
        target.style.background = '#29aae1'
      },
      notify (message) {
        console.log(message)
      },
      beginWait (target) {
        target.classList.add('wait')
      },
      endWait (target) {
        target.classList.remove('wait')
      },
      scrollToTop () {
        $('html, body').animate({scrollTop: '0px'}, 500)
      }
    },
    mounted: function () {
      this.setEventListeners()
      this.populateServices()
    }
  }

  import Datepicker from 'vuejs-datepicker'
  import serviceTypes from '../../../../../../static/json/appointment_types/appointment_types.json'
  import {truncate} from '../../../../../util/StringManager'
  import $ from 'jquery'
</script>

<style scoped>
  .wrapper {
    background: #ffffff;
    height: 100%;
    min-height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .wait:before {
    content: '';
    display: block;
    position: relative;
    width: 200px;
    margin: auto;
    height: 4px;
    background-color: #f4903e;
    animation: wait-keyframe 4.2s infinite
  }

  @keyframes wait-keyframe {
    0% {width: 20%;}
    25% {width: 40%;}
    50% {width: 60%;}
    75% {width: 80%;}
    100% {width: 100%;}
  }

  #appointment {
    background: #ffffff;
    min-height: 70vh;
    width: 90%;
    font-size: 12px;
    margin: 30px auto;
    color: #7a7a7a;
    display: flex;
    flex-direction: column;
  }

  .title {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .query-section {
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .entry-item {
    height: 60px;
    margin-top: 30px;
    justify-content: center;
    width: 50%;
  }

  .entry-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .list, label.list {
    display: block;
    height: 30px;
    width: 100%;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
  }

  label.list {
    cursor: pointer;
    background: #edefef;
    text-align: center;
    line-height: 30px;
  }

  label.list span {
    display: inline-block;
    float: left;
    height: 28px;
  }

  label.list span.icon {
    width: 28px;
    background: url('/static/images/upload.png') no-repeat;
    background-size: contain;
    margin-right: 10px;
  }

  input#scan-result {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  .comment {
    height: 100px;
  }

  #scan-comment, #treatment-comment {
    max-height: 50px;
    min-height: 50px;
    max-width: 100%;
    min-width: 100%;
  }

  .error {
    border: 1px solid #f18787 !important;
  }

  .submit {
    width: 50%;
    height: 30px;
    text-align: right;
  }

  .button {
    padding: 2px;
    text-align: center;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
    display: inline-block;
  }

  .sections {
    position: relative;
    min-height: 300px;
  }

  .trigger-section {
    width: 100%;
    height: 40px;
    background: #edefef;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .trigger {
    height: 35px;
    width: 50%;
    margin-top: 5px;
    cursor: pointer;
    font-size: 16px;
    line-height: 35px;
    text-align: center;
  }

  .active {
    background: #ffffff;
    cursor: auto;
  }

  .view-section {
    background: #ffffff;
    min-height: 260px;
    width: 100%;
  }

  .scan-section, .treatment-section {
    width: 100%;
    min-height: 260px;
    display: none;
  }

  .showing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .navigation {
    width: 100%;
    float: right;
  }

  .official-info {
    margin-top: 20px;
  }

  .official-detail {
    font-weight: bold;
    font-size: 16px;
  }

  .official-detail span {
    color: #296c92;
  }
</style>

<style>
  .entry-item {
    height: 60px;
    margin-top: 30px;
    justify-content: center;
    width: 50%;
  }

  .entry-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .list, label.list {
    display: block;
    height: 30px;
    width: 100%;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
  }

  .spin {
    height: 45px;
    width: 45px;
    border-radius: 45px;
    border-top: 3px solid #3286b0;
    border-right: 3px solid #3286b0;
    border-bottom: 3px solid #ffffff;
    border-left: transparent;
    animation: odll-spin 1.2s cubic-bezier(0.2, 0.92, 0.94, 0.9) infinite;
    position: relative;
  }

  @keyframes odll-spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .button {
    padding: 2px;
    text-align: center;
    outline: 0px;
    border: 0px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    width: 100px;
    background: #29aae1;
    color: #ffffff;
    margin-left: 10px;
    display: inline-block;
  }

  input#scan-date, input#treatment-date {
    height: 28px !important;
    width: 100% !important;
    background: #ffffff !important;
    outline: none !important;
    border: 0px;
    color: #7f7f7f !important;
    cursor: pointer;
  }
</style>
