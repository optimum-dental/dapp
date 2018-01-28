<template>
  <div class="wrapper">
    <div id="appointment">
      <div class="title">Request Appointment</div>

      <div class="appointment-sections">
        <div class="appointment-trigger-section">
          <div class="appointment-trigger" :class="addClass(1, 'active')" data-open="appointment-scan-section" data-type="1" @click="switchView">Scan Appointment</div>
          <div class="appointment-trigger" :class="addClass(2, 'active')" data-open="appointment-treatment-section" data-type="2" @click="switchView">Treatment Appointment</div>
        </div>

        <div class="appointment-view-section">
          <div class="appointment-official-info" v-if="officialSN >= 0 && official.fee >= 0">
            <div class="official-name appointment-official-detail">Appointment with: <span>{{official.name}}</span></div>
            <div class="official-fee appointment-official-detail">Fee: <span>${{official.fee}}</span></div>
          </div>

          <div class="appointment-scan-section" :class="addClass(1, 'showing')" id="appointment-scan-section">
            <div class="appointment-entry-item">
              <div class="appointment-entry-param">Preferred Date *</div>
              <div class="appointment-entry-value">
                <datepicker   v-model="scanDate" class="appointment-list appointment-date appointment-scan-date" id="appointment-scan-date" @selected="validateScanDate"></datepicker>
              </div>
            </div>

            <div class="appointment-entry-item">
              <div class="appointment-entry-param">Preferred Time *</div>
              <div class="appointment-entry-value">
                <select id="appointment-scan-time" class="appointment-list">
                  <option>Select</option>
                  <option>Morning (8AM - 12PM)</option>
                  <option>Early Afternoon (12PM - 3PM)</option>
                  <option>Late Afternoon (3PM - 6PM)</option>
                </select>
              </div>
            </div>

            <div class="appointment-entry-item">
              <div class="appointment-entry-param">Appointment For *</div>
              <div class="appointment-entry-value">
                <select id="scan-appointment" class="appointment-list" :disabled="officialSN >= 0 && official.fee >= 0"></select>
              </div>
            </div>

            <div class="appointment-entry-item">
              <div class="appointment-entry-param">Do you have insurance?</div>
                <div class="appointment-entry-value">
                <select id="appointment-scan-insurance-query" class="appointment-list">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div class="appointment-entry-item policy-number">
              <label for="policy-number" class="appointment-entry-param">Policy Number</label>
              <div class="appointment-entry-value">
                <input type="text" class="appointment-list" id="policy-number" data-name="policy-number" required>
                <div class="tip">Important</div>
              </div>
            </div>

            <div class="appointment-entry-item payer-id">
              <label for="payer-id" class="field-key">Payer ID</label>
              <div class="appointment-entry-value">
                <input type="text" class="appointment-list" id="payer-id" data-name="payer-id">
              </div>
            </div>

            <div class="appointment-entry-item main-subscriber">
              <label for="main-subscriber" class="field-key">Insurance Main Subscriber</label>
              <div class="appointment-entry-value">
                <input type="text" class="appointment-list" id="main-subscriber" data-name="main-subscriber">
              </div>
            </div>

            <div class="appointment-entry-item insurance-address">
              <div class="appointment-entry-param">Insurance Address [or P.O.Box Number]</div>
              <div class="appointment-entry-value">
                <textarea id="insurance-address" rows="5" class="appointment-list"></textarea>
              </div>
            </div>

            <div class="appointment-entry-item comment">
              <div class="appointment-entry-param">Additional Comments [128 characters max]</div>
              <div class="appointment-entry-value">
                <textarea id="appointment-scan-comment" class="appointment-list" maxlength="128"></textarea>
              </div>
            </div>

            <div class="appointment-submit">
              <input type="button" class='appointment-post appointment-button' value="Send" @click="writeScanRequest">
            </div>
          </div>

          <div class="appointment-treatment-section" :class="addClass(2, 'showing')" id="appointment-treatment-section">
            <div class="appointment-entry-item">
              <div class="appointment-entry-param">Do you have insurance?</div>
              <div class="appointment-entry-value">
                <select id="treatment-insurance-query" class="appointment-list">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>


            <div class="appointment-entry-item policy-number">
              <label for="policy-number" class="appointment-entry-param">Policy Number</label>
              <div class="appointment-entry-value">
                <input type="text" class="appointment-list" id="policy-number" data-name="policy-number" required>
                <div class="tip">Important</div>
              </div>
            </div>

            <div class="appointment-entry-item payer-id">
              <label for="payer-id" class="field-key">Payer ID</label>
              <div class="appointment-entry-value">
                <input type="text" class="appointment-list" id="payer-id" data-name="payer-id">
              </div>
            </div>

            <div class="appointment-entry-item main-subscriber">
              <label for="main-subscriber" class="field-key">Insurance Main Subscriber</label>
              <div class="appointment-entry-value">
                <input type="text" class="appointment-list" id="main-subscriber" data-name="main-subscriber">
              </div>
            </div>

            <div class="appointment-entry-item insurance-address">
              <div class="appointment-entry-param">Insurance Address [or P.O.Box Number]</div>
              <div class="appointment-entry-value">
                <textarea id="insurance-address" rows="5" class="appointment-list"></textarea>
              </div>
            </div>

            <div class="appointment-entry-item">
              <div class="appointment-entry-param">Scan Results *</div>
              <div class="appointment-entry-value">
                <label for="appointment-scan-results" class="appointment-scan-results-trigger appointment-list">
                  <span class="appointment-icon"></span>
                  <span class="text">Choose Scan Results</span>
                </label>
                <input id="appointment-scan-results" type="file" accept="image/*" multiple></select>
              </div>
            </div>

            <div class="appointment-entry-item comment">
              <div class="appointment-entry-param">Additional Comments [128 characters max]</div>
              <div class="appointment-entry-value">
                <textarea id="appointment-treatment-comment" class="appointment-list" maxlength="128"></textarea>
              </div>
            </div>

            <div class="appointment-submit">
              <input type="button" class='appointment-post appointment-button' value="Send" @click="writeTreatmentAppointment">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // const BigNumber = require('bignumber.js')
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
            case (['appointment-scan-time', 'scan-appointment'].includes(target.id)):
              _this.clearError(target)
              break
            case (['appointment-scan-results'].includes(target.id)):
              const label = target.closest('.appointment-entry-value').querySelector('.appointment-scan-results-trigger')
              _this.clearError(label)
              const fileNames = Array.from(target.files).map(file => file.name).join(', ')
              label.querySelector('.text').innerHTML = truncate(fileNames, 50)
              break
            case (['appointment-scan-insurance-query', 'treatment-insurance-query'].includes(target.id)):
              const serviceTypeId = target.id === 'appointment-scan-insurance-query' ? 1 : 2
              const choice = target.selectedIndex
              let DOMElement
              if (choice === 0 || choice === 2) {
                let insuranceDOMElement = target.closest('.appointment-entry-item').nextElementSibling
                insuranceDOMElement = insuranceDOMElement.classList.contains('insurance') ? insuranceDOMElement : null
                if (insuranceDOMElement) _this.removeDOMElement(insuranceDOMElement)
              } else {
                DOMElement = _this.createDOMElementFromString(`
                  <div class="appointment-entry-item insurance">
                    <div class="appointment-entry-param">Insurance Name</div>
                    <div class="appointment-entry-value">
                      <input id="${serviceTypeId === 1 ? 'scan' : 'treatment'}-insurance" class="appointment-list" type="text">
                    </div>
                  </div>
                `)
                _this.appendDOMElementAfter(DOMElement, target.closest('.appointment-entry-item'), document.querySelector(`.${serviceTypeId === 1 ? 'appointment-scan' : 'appointment-treatment'}-section`))
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
          this.addError(document.querySelector('.appointment-scan-date'))
          this.scanDateError = true
        } else {
          this.clearError(document.querySelector('.appointment-scan-date'))
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
        const DOMELement = new DOMParser().parseFromString(`<input type="button" class="appointment-button appointment-cancel" value="Cancel">`, 'text/html')
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
        const scanTime = document.getElementById('appointment-scan-time').options[document.getElementById('appointment-scan-time').selectedIndex].value
        const scanAppointmentId = Number(document.getElementById('scan-appointment').selectedIndex)
        const scanInsuranceQuery = Number(document.getElementById('appointment-scan-insurance-query').selectedIndex)
        const scanInsurance = scanInsuranceQuery === 1 ? document.getElementById('scan-insurance').value : ''
        const scanComment = document.getElementById('appointment-scan-comment').value
        let errors = [scanTime === 0 ? document.getElementById('appointment-scan-time') : undefined, scanAppointmentId === 0 ? document.getElementById('scan-appointment') : undefined, this.scanDateError ? document.querySelector('.appointment-scan-date') : undefined]
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
        const treatmentComment = document.getElementById('appointment-treatment-comment').value
        let errors = [document.getElementById('appointment-scan-results').files.length === 0 ? document.getElementById('appointment-scan-results') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            if (item.id === 'appointment-scan-results') {
              const label = item.closest('.appointment-entry-value').querySelector('.appointment-scan-results-trigger')
              this.addError(label)
            } else {
              this.addError(item)
            }
          })
        } else {
          const scanResultURL = this.getURLFromFileUpload(document.getElementById('appointment-scan-results'))
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
        Array.from(document.querySelectorAll('.appointment-button')).forEach(button => this.disableButton(button))
      },
      enableNecessaryButtons (evt) {
        Array.from(document.querySelectorAll('.appointment-button')).forEach(button => this.enableButton(button))
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

  .appointment-entry-item {
    height: 60px;
    margin-top: 30px;
    justify-content: center;
    width: 50%;
  }

  .appointment-entry-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .appointment-list, label.appointment-list {
    display: block;
    height: 30px;
    width: 100%;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
  }

  label.appointment-list {
    cursor: pointer;
    background: #edefef;
    text-align: center;
    line-height: 30px;
  }

  label.appointment-list span {
    display: inline-block;
    float: left;
    height: 28px;
  }

  label.appointment-list span.appointment-icon {
    width: 28px;
    background: url('/static/images/upload.png') no-repeat;
    background-size: contain;
    margin-right: 10px;
  }

  input#appointment-scan-results {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  .comment {
    height: 100px;
  }

  #appointment-scan-comment, #appointment-treatment-comment {
    max-height: 50px;
    min-height: 50px;
    max-width: 100%;
    min-width: 100%;
  }

  .error {
    border: 1px solid #f18787 !important;
  }

  .appointment-submit {
    width: 50%;
    height: 30px;
    text-align: right;
  }

  .appointment-button {
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

  .appointment-sections {
    position: relative;
    min-height: 300px;
  }

  .appointment-trigger-section {
    width: 100%;
    height: 40px;
    background: #edefef;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .appointment-trigger {
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

  .appointment-view-section {
    background: #ffffff;
    min-height: 260px;
    width: 100%;
  }

  .appointment-scan-section, .appointment-treatment-section {
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

  .appointment-official-info {
    margin-top: 20px;
  }

  .appointment-official-detail {
    font-weight: bold;
    font-size: 16px;
  }

  .appointment-official-detail span {
    color: #296c92;
  }
</style>

<style>
  .appointment-entry-item {
    height: 60px;
    margin-top: 30px;
    justify-content: center;
    width: 50%;
  }

  .appointment-entry-param {
    color: #7f7f7f;
    margin-bottom: 5px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  .appointment-list, label.appointment-list {
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

  .appointment-button {
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

  input#appointment-scan-date, input#appointment-treatment-date {
    height: 28px !important;
    width: 100% !important;
    background: #ffffff !important;
    outline: none !important;
    border: 0px;
    color: #7f7f7f !important;
    cursor: pointer;
  }

  .tip {
    color: red;
  }
</style>
