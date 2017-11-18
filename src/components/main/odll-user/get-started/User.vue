<template>
  <div class="wrapper">
    <div id="user">
      <div class="title">{{ title }}</div>
      <div class="field">
        <label for="name" class="field-key">Last Name   First Name   Middle Name</label>
        <input type="text" class="field-value has-tip" id="name" placeholder="Last Name   First Name   Middle Name" @input="displayLabel" data-name="name">
        <div class="tip">Write between 5 to 50 characters</div>
      </div>

      <div class="field">
        <label for="email" class="field-key">Your Email</label>
        <input type="email" class="field-value has-tip" id="email" placeholder="Your Email" @input="setAvatar" data-name="email">
        <div class="tip">Write between 5 to 80 characters</div>
      </div>

      <div class="field avatar"></div>

      <div class="field">
        <label for="street" class="field-key">Street</label>
        <input type="text" class="field-value" id="street" placeholder="Street" @input="displayLabel" data-name="street">
      </div>


      <div class="field">
        <label for="city" class="field-key">City</label>
        <input type="text" class="field-value" id="city" placeholder="City" @input="displayLabel" data-name="city">
      </div>

      <div class="field">
        <label for="state" class="field-key">State</label>
        <select id='state' class="field-value" @input="displayLabel" data-name="state"></select>
        <div class="tip"></div>
      </div>

      <div class="field">
        <label for="zip-code" class="field-key">Zip Code</label>
        <input type="text" class="field-value" id="zip-code" placeholder="Zip Code" @input="displayLabel" data-name="zipCode">
        <div class="tip"></div>
      </div>

      <div class="field">
        <label for="country" class="field-key">Country</label>
        <select id='country' class="field-value" @input="displayLabel" data-name="country"></select>
        <div class="tip"></div>
      </div>

      <div class="field">
        <label for="phone-number" class="field-key">Phone Number</label>
        <input type="text" class="field-value" id="phone-number" placeholder="Phone Number" @input="displayLabel" data-name="phoneNumber">
      </div>

      <div class="field">
        <label class="field-key show">Social Security Number</label>
        <input type="text" id='area-number' data-next="group-number" class="field-value special social-security-number" maxlength="3" size="3" required placeholder="XXX" @input="decideIfNext" data-name="areaNumber"></span>
        <input type="text" id='group-number' data-next="sequence-number" class="field-value special social-security-number" maxlength="2" size="2" required placeholder="XX" @input="decideIfNext" data-name="groupNumber"></span>
        <input type="text" id='sequence-number' class="field-value special social-security-number" maxlength="4" size="4" required placeholder="XXXX" @input="decideIfNext" data-name="sequenceNumber">
      </div>

      <div class="field">
        <label class="field-key show">Birthday</label>
        <div class='date-holder'>
          <select id='day' data-name="day"><option value=''>Day</option></select>
          <select id='month' data-name="month"><option value=''>Month</option></select>
          <select id='year' data-name="year"><option value=''>Year</option></select>
        </div>
      </div>

      <div class="field">
        <label class="field-key">Gender</label>
        <input type="checkbox" class="field-value gender" name="gender" id="female" value="1" @click="resetCheckeBoxValues" :checked="user.gender.toString() === '1'"><label for="female" class="side-key">Female</label>
        <input type="checkbox" class="field-value gender" name="gender" id="male" value="2" @click="resetCheckeBoxValues" :checked="user.gender.toString() === '2'"><label for="male" class="side-key">Male</label>
        <input type="checkbox" class="field-value gender" name="gender" id="others" value="3" @click="resetCheckeBoxValues" :checked="user.gender.toString() === '3'"><label for="others" class="side-key">Others</label>
      </div>

      <div class="field">
        <input type="button" class='submit-button' :value="user.type > 0 ? 'Update Profile' : 'Register'" @click="writeUser">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      socialSecurityNumber () {
        const areaNumber = this.user.areaNumber
        const groupNumber = this.user.groupNumber
        const sequenceNumber = this.user.sequenceNumber
        if (areaNumber && groupNumber && sequenceNumber) {
          return `${areaNumber}-${groupNumber}-${sequenceNumber}`
        }
      },
      user () {
        return this.$root.user
      },
      title () {
        switch (this.user.type) {
          case '1':
            return 'Patient Profile'
          case '2':
            return 'Dentist Profile'
          case '3':
            return 'Manager Profile'
          case '4':
            return 'Admin Profile'
          default:
            return 'Register As Patient'
        }
      },
      type () {
        switch (this.user.type) {
          case '0':
            return '1'
          default:
            return this.user.type
        }
      }
    },
    name: 'user',
    methods: {
      resetCheckeBoxValues (evt) {
        const target = evt.target
        const id = target.id
        Array.from(document.querySelectorAll('.gender')).forEach((checkBox) => {
          if (checkBox.id !== id) checkBox.checked = false
        })
      },
      setAvatar (evt = null) {
        if (evt) this.displayLabel(evt)
        const email = evt && evt.target && evt.target.value !== undefined ? evt.target.value.trim() : this.user.email.trim()
        this.$root.callUpdateUserGravatar({
          email: email,
          callback: (avatarCanvas) => {
            this.styleAndAddAvatarCanvasToPage(avatarCanvas)
          }
        })
      },
      styleAvatarCanvas (avatarCanvas) {
        if (avatarCanvas && avatarCanvas.style) {
          avatarCanvas.style.borderRadius = '104px'
          avatarCanvas.style.marginTop = '3px'
        }
      },
      addAvatarCanvasToPage (avatarCanvas) {
        const avatarContainer = document.querySelector('.avatar')
        if (avatarContainer && avatarCanvas && avatarCanvas.style) {
          const formerCanvas = avatarContainer.querySelector('canvas')
          if (formerCanvas) {
            avatarContainer.replaceChild(avatarCanvas, formerCanvas)
          } else {
            avatarContainer.appendChild(avatarCanvas)
          }
        }
      },
      styleAndAddAvatarCanvasToPage (avatarCanvas) {
        this.styleAvatarCanvas(avatarCanvas)
        this.addAvatarCanvasToPage(avatarCanvas)
      },
      populateCountries () {
        const countriesElement = document.getElementById('country')
        const userCountryIndex = this.user.country && Number(this.user.country) !== 0 ? Number(this.user.country) : countries.findIndex((country) => country.code === 'US')
        countries.forEach((country, index) => {
          const optionElement = document.createElement('option')
          optionElement.text = country.name
          if (countriesElement) {
            countriesElement.appendChild(optionElement)
            if (userCountryIndex === index) {
              optionElement.selected = true
              if (index !== 0) this.displayLabel(null, countriesElement)
            }
          }
        })
      },
      populateStates () {
        const statesElement = document.getElementById('state')
        const userStateIndex = Number(this.user.state)
        states.forEach((state, index) => {
          const optionElement = document.createElement('option')
          optionElement.text = state.name
          if (statesElement) {
            statesElement.appendChild(optionElement)
            if (userStateIndex === index) {
              optionElement.selected = true
              if (index !== 0) this.displayLabel(null, statesElement)
            }
          }
        })
      },
      displayLabel (evt, target = null) {
        target = target || evt.target
        const id = target.id
        if (document.querySelector(`label[for=${id}]`)) document.querySelector(`label[for=${id}]`).style.display = target.value === '' || target.selectedIndex === 0 ? 'none' : 'block'
        if (target.classList.contains('has-tip')) {
          this.warnOfInputLength(target)
        } else {
          let tip = target.nextElementSibling
          if (tip && tip.classList.contains('tip')) tip.style.display = 'none'
        }
      },
      warnOfInputLength (target) {
        const tip = target.nextElementSibling
        const entryValue = target.value.trim()

        if (entryValue !== '' && entryValue.length < 5) {
          tip.innerHTML = 'Type more than 5 characters'
        } else if (entryValue !== '' && entryValue.length > 32) {
          tip.innerHTML = 'You have exceeded 32 characters'
        } else {
          tip.innerHTML = 'Write between 5 to 32 characters'
        }

        tip && tip.classList && entryValue !== '' && (entryValue.length < 5 || entryValue.length > 32) ? tip.classList.add('error') : tip.classList.remove('error')
      },
      setEventListeners () {
        const countriesElement = document.getElementById('country')
        if (countriesElement) {
          const _this = this
          countriesElement.addEventListener('change', function () {
            const phoneNumberElement = document.getElementById('phone-number')
            if (phoneNumberElement) {
              phoneNumberElement.value = `${countries[this.selectedIndex].dial}`
              _this.displayLabel(null, phoneNumberElement)
              phoneNumberElement.focus()
            }
          })
        }
      },
      decideIfNext (evt) {
        const target = evt.target
        const entry = target.value.trim()
        if (isNaN(entry)) {
          target.value = ''
        } else {
          if (target.value.trim().length === target.maxLength) {
            if (!validateFor(target.id, entry)) {
              target.value = ''
            } else {
              const nextInput = document.getElementById(target.dataset.next)
              if (nextInput) {
                nextInput.focus()
              }
            }
          }
        }
      },
      populateOtherInputs () {
        const elements = [ document.getElementById('name'), document.getElementById('email'), document.getElementById('street'), document.getElementById('city'), document.getElementById('zip-code'), document.getElementById('phone-number'), document.getElementById('area-number'), document.getElementById('group-number'), document.getElementById('sequence-number') ]
        elements.forEach((element) => {
          if (element) {
            element.value = this.user[element.dataset.name] || ''
            if (element.value.trim() !== '') this.displayLabel(null, element)
          }
        })

        const phoneNumberElement = document.getElementById('phone-number')
        if (phoneNumberElement && phoneNumberElement.value === '') {
          phoneNumberElement.value = '+1 '
        }
      },
      registerUser (evt) {
        let target = evt.target
        this.disableButton(target)
        const name = document.getElementById('name').value
        const [ lastName, firstName, middleName ] = name.split(/\s+/)
        const fullName = [ lastName, firstName, middleName ].filter((item) => item !== undefined)
        const email = document.querySelector('#email:invalid') ? '' : document.getElementById('email').value
        const gender = document.querySelector('.gender:checked') ? document.querySelector('.gender:checked').value : 0
        const street = document.getElementById('street').value
        const city = document.getElementById('city').value
        const state = Number(document.getElementById('state').selectedIndex)
        const zipCode = document.getElementById('zip-code').value
        const country = Number(document.getElementById('country').selectedIndex)
        const areaNumber = document.getElementById('area-number').value
        const groupNumber = document.getElementById('group-number').value
        const sequenceNumber = document.getElementById('sequence-number').value
        const socialSecurityNumber = `${areaNumber}-${groupNumber}-${sequenceNumber}`
        const day = document.getElementById('day').options[document.getElementById('day').selectedIndex].value
        const month = document.getElementById('month').selectedIndex - 1
        const year = document.getElementById('year').options[document.getElementById('year').selectedIndex].value
        const birthday = `${year}/${month}/${day}`

        let errors = [fullName.length < 2 ? document.getElementById('name') : undefined, state === 0 ? document.getElementById('state') : undefined, country === 0 ? document.getElementById('country') : undefined]
        errors = errors.filter(entry => entry !== undefined)
        if (errors.length > 0) {
          errors.forEach((item) => {
            let tip = item.nextElementSibling
            tip.innerHTML = `Please check your ${item.id}`
            tip.classList.add('error')
            tip.style.display = 'block'
            this.enableButton(target)
          })
        } else {
          this.scrollToTop()
          const userObject = {
            type: Number(this.type),
            name: `b${name}`,
            email: `b${email}`,
            gravatar: `b${this.user.gravatar || ''}`,
            street: `b${street}`,
            city: `b${city}`,
            state,
            zipCode: `b${zipCode}`,
            country,
            phoneNumber: `b${document.getElementById('phone-number').value}`,
            socialSecurityNumber: `b${socialSecurityNumber}`,
            birthday: `b${birthday}`,
            gender: Number(gender)
          }

          const vueUserObject = Object.assign({}, userObject, {
            type: this.type,
            name: name,
            email: email,
            gravatar: this.user.gravatar || '',
            street: street,
            city: city,
            state,
            zipCode,
            country,
            phoneNumber: document.getElementById('phone-number').value,
            socialSecurityNumber: socialSecurityNumber,
            birthday: birthday,
            gender: Number(gender),
            lastName,
            firstName,
            middleName,
            areaNumber,
            groupNumber,
            sequenceNumber,
            day,
            month,
            year
          })

          this.beginWait(document.querySelector('.wrapper'))
          this.$root.callToWriteUser({
            vueObject: vueUserObject,
            requestParams: userObject,
            contractIndexToUse: 0,
            methodName: 'writeUser',
            managerIndex: 0,
            callback: (userData = null) => {
              this.endWait(document.querySelector('.wrapper'))
              this.enableButton(target)
            }
          })
        }
      },
      writeUser (evt) {
        this.registerUser(evt)
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
      dateSelectionManager.loadDate({
        yearEndDigit: 2000,
        yearStartDigit: 1920,
        dayDefaultValue: this.user.day,
        monthDefaultValue: dateSelectionManager.getMonthNames()[Number(this.user.month)],
        yearDefaultValue: this.user.year
      })
      this.setAvatar()
      this.populateCountries()
      this.populateStates()
      this.populateOtherInputs()
      this.setEventListeners()
    }
  }

  import countries from '../../../../../static/json/countries/countries.json'
  import states from '../../../../../static/json/states/states.json'
  import dateSelectionManager from 'date-selection-manager'
  import { validateFor } from '../../../../util/ssnValidator'
  import $ from 'jquery'
</script>

<style scoped>
  .wrapper {
    background: #ffffff;
    height: 100%;
    min-height: 80vh;
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wait {
    border-top: 3px solid #fbfbfb;
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

  #user {
    background: #ffffff;
    min-height: 70vh;
    width: 400px;
    font-size: 12px;
    margin: 30px auto;
    color: #7a7a7a;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    height: 25px;
    margin-bottom: 20px;
    width: 100%;
    font-size: 20px;
    color: #4d4c49;
  }

  .field {
    margin-bottom: 20px;
    width: 100%;
  }

  .field-key {
    height: 20px;
    display: block;
    margin-top: 10px;
  }

  .field-key:not(.show) {
    display: none;
  }

  .field-value {
    height: 20px;
  }

  .field-value:not(.special) {
    width: 100%;
  }

  .tip {
    width: 100%;
    color: #adadad;
  }

  .tip.error {
    color: #f18787;
  }

  ::placeholder {
    color: #bababa;
  }

  .side-key {
    display: inline-block;
    height: 20px;
    position: relative;
    top: -4px;
    margin-right: 20px;
  }

  .avatar {
    height: 110px;
  }

  input[type=email].field-value, input[type=text].field-value, input[type=number].field-value, select {
    outline: none;
    border-width: 0px 0px 2px 0px;
    border-color: #a0a0a0;
    color: #7a7a7a;
    background: none;
  }

  input[type=text].field-value:focus, input[type=number].field-value:focus {
    background: #fafafa;
  }

  input[type=checkbox].field-value {
    height: 20px;
    width: 20px;
    display: inline-block;
  }

  select {
    height: 30px;
    min-width: 100px;
    margin-right: 20px;
    color: #7a7a7a;
  }

  input:not(:placeholder-shown):not(:focus):invalid {
    border-bottom: 2px solid #f18787;
  }

  .hyphen {
    display: inline-block;
  }

  .hyphen:after {
    content: '-'
  }

  .social-security-number {
    text-align: center;
  }

  .submit-button {
    background: #29aae1;
    color: #ffffff;
    height: 30px;
    width: 100px;
    float: right;
    outline: 0px;
    border: 0px;
    cursor: pointer;
  }
</style>
