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
                <select id="scan-appointment" class="list"></select>
              </div>
            </div>

            <div class="entry-item comment">
              <div class="entry-param">Additional Comments [128 characters max]</div>
              <div class="entry-value">
                <textarea id="scan-comment" class="list" maxlength="128"></textarea>
              </div>
            </div>

            <div class="submit">
              <input type="button" class='post button' value="Send" @click="writeScanAppointment">
            </div>
          </div>

          <div class="treatment-section" :class="addClass(2, 'showing')" id="treatment-section">
            <div class="entry-item">
              <div class="entry-param">Appointment For *</div>
              <div class="entry-value">
                <select id="treatment-appointment" class="list"></select>
              </div>
            </div>

            <div class="entry-item">
              <div class="entry-param">Scan Result *</div>
              <div class="entry-value">
                <input id="scan-result" type="file" class="list"></select>
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
      }
    },
    data: function () {
      return {
        scanDate: '',
        scanDateError: true
      }
    },
    methods: {
      appointmentWith () {
        const serialNumber = this.$route.query.sn
        const offset = this.$route.query.o
        return serialNumber !== undefined && offset !== undefined ? this.$store.state.searchResult.findDentists.data[offset][serialNumber].address : '0x0'
      },
      setEventListeners () {
        const _this = this
        document.querySelector('#appointment').addEventListener('change', function (evt) {
          const target = evt.target
          switch (true) {
            case (['scan-time', 'scan-appointment', 'treatment-appointment'].includes(target.id)):
              _this.clearError(target)
              break
          }
        })
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
        return Number(this.$route.query.sTI)
      },
      serviceSubtypeIndex () {
        return Number(this.$route.query.sSI)
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
        const serviceSubtypesElement = document.getElementById(`${serviceTypeId === 1 ? 'scan-appointment' : 'treatment-appointment'}`)
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
      writeScanAppointment () {
        const appointmentDate = (+(this.scanDate)).toString()
        const scanTime = Number(document.getElementById('scan-time').selectedIndex)
        const scanAppointmentId = Number(document.getElementById('scan-appointment').selectedIndex)
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
              dentistId: this.appointmentWith(),
              appointmentDate,
              scanTime,
              scanAppointmentId,
              scanComment
            },
            methodName: 'writeScanAppointment',
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
        const treatmentAppointmentId = Number(document.getElementById('treatment-appointment').selectedIndex)
        const treatmentComment = document.getElementById('treatment-comment').value
        const scanResultURL = ''
        let errors = [treatmentAppointmentId === 0 ? document.getElementById('treatment-appointment') : undefined]
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
              dentistId: this.appointmentWith(),
              treatmentAppointmentId,
              scanResultURL,
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
        }
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
      this.populateServices(Number(this.$route.query.sTI))
    }
  }

  import Datepicker from 'vuejs-datepicker'
  import serviceTypes from '../../../../../../static/json/appointment_types/appointment_types.json'
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

  .list, #fee {
    height: 30px;
    width: 100%;
    background: #ffffff;
    outline: none;
    border: 1px solid #d3d3d3;
    color: #7f7f7f;
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

  .fetch-next, .fetch-previous {
    cursor: pointer;
    color: #6592ad;
    background: #ffffff;
    height: 30px;
    line-height: 30px;
    width: 120px;
    display: inline-block;
    float: right;
    text-align: center;
    margin-right: 5px;
    font-size: 14px;
  }

  .fetch-next:hover, .fetch-previous:hover {
    background: #dae3e8;
  }
</style>

<style>
  .no-service {
    position: absolute;
    top: 40px;
    width: 100%;
    min-height: 260px;
    text-align: center;
    font-size: 16px;
  }

  .no-service-message {
    height: 30px;
    position: relative;
    top: 110px;
  }

  .wait-overlay {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 16px;
    height: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
  }

  .wait-message {
    height: 30px;
    line-height: 30px;
    position: relative;
    font-size: 16px;
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

  .result {
    width: 95%;
    border-bottom: 1px solid #a7a7a7;
    min-height: 180px;
    padding: 10px 0px;
  }

  .gravatar-section {
    width: 60px;
    height: 60px;
    float: left;
    display: inline-block;
    margin-right: 10px;
    border: 1px solid #c3c3c3;
    border-radius: 6px;
    padding: 3px;
  }

  .gravatar-section > canvas {
    height: 100%;
    width: 100%;
    border-radius: 6px;
  }

  .about-section {
    width: 250px;
    height: 150px;
    display: inline-block;
    float: left;
  }

  .about-section > div {
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }

  .profile-link {
    font-size: 10px !important;
    color: #bfced9;
    cursor: pointer;
  }

  .average-rating > div {
    background: url(/static/images/star_line.png) no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    display: inline-block;
    float: left;
    margin: 0px 5px;
  }

  .average-rating > .filled {
    background: url(/static/images/star.png) no-repeat;
    background-size: contain;
  }

  .request-service-section {
    width: auto;
    height: 150px;
    line-height: 150px;
    display: inline-block;
    float: right;
  }

  .link-to-service {
    width: 200px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    background: #3285b1;
    display: inline-block;
    text-decoration: none;
    font-size: 14px;
    text-align: center;
  }

  .service-name {
    width: 50%;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
  }

  .service-fee {
    width: 50%;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
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

  .edit-service, .delete-service {
    background: #3285b1 !important;
    text-decoration: none;
    margin: 0px 10px 0px 0px !important;
  }

  input#scan-date, input#treatment-date, input#scan-result {
    height: 28px !important;
    width: 100% !important;
    background: #ffffff !important;
    outline: none !important;
    border: 0px;
    color: #7f7f7f !important;
    cursor: pointer;
  }
</style>

