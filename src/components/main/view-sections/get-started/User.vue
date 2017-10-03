<template>
  <div class="wrapper">
    <div id="user">
      <div class="title">Register as Patient</div>
      <div class="field">
        <label for="name" class="field-key">Last Name   First Name   Middle Name</label>
        <input type="text" class="field-value has-tip" id="name" placeholder="Last Name   First Name   Middle Name" @input="displayLabel" data-name="fullName">
        <div class="tip">Write between 5 to 32 characters</div>
      </div>

      <div class="field">
        <label for="email" class="field-key">Your Email</label>
        <input type="email" class="field-value has-tip" id="email" placeholder="Your Email" @input="displayLabel" @blur="setAvatar" data-name="email">
        <div class="tip">Write between 5 to 32 characters</div>
      </div>

      <div class="field avatar"></div>

      <div class="field">
        <label for="street" class="field-key">Street</label>
        <input type="text" class="field-value has-tip" id="street" placeholder="Street" @input="displayLabel" data-name="street">
        <div class="tip">Write between 5 to 32 characters</div>
      </div>


      <div class="field">
        <label for="city" class="field-key">City</label>
        <input type="text" class="field-value" id="city" placeholder="City" @input="displayLabel" data-name="city">
      </div>

      <div class="field">
        <label for="state" class="field-key">State</label>
        <select id='state' class="field-value" @input="displayLabel" data-name="state"><option value=''>State</option></select>
      </div>

      <div class="field">
        <label for="zip-code" class="field-key">Zip Code</label>
        <input type="text" class="field-value has-tip" id="zip-code" placeholder="Zip Code" @input="displayLabel" data-name="zipCode">
        <div class="tip">Write between 5 to 32 characters</div>
      </div>

      <div class="field">
        <label for="country" class="field-key">Country</label>
        <select id='country' class="field-value" @input="displayLabel" data-name="country"><option value=''>Country</option></select>
      </div>

      <div class="field">
        <label for="phone-number" class="field-key">Phone Number</label>
        <input type="text" class="field-value" id="phone-number" placeholder="Phone Number" @input="displayLabel" data-name="phoneNumber">
      </div>

      <div class="field">
        <label class="field-key show">Social Security Number</label>
        <input type="text" id='area-number' data-next="group-number" class="field-value special social-security-number" maxlength="3" size="3" required placeholder="XXX" @input="decideIfNext" data-name="areaNumber"><span class="hyphen"></span>
        <input type="text" id='group-number' data-next="sequence-number" class="field-value special social-security-number" maxlength="2" size="2" required placeholder="XX" @input="decideIfNext" data-name="groupNumber"><span class="hyphen"></span>
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
        <input type="checkbox" class="field-value gender" name="gender" id="female" value="1" @click="resetCheckeBoxValues" :checked="user.gender === '1'"><label for="female" class="side-key">Female</label>
        <input type="checkbox" class="field-value gender" name="gender" id="male" value="2" @click="resetCheckeBoxValues" :checked="user.gender === '2'"><label for="male" class="side-key">Male</label>
        <input type="checkbox" class="field-value gender" name="gender" id="others" value="3" @click="resetCheckeBoxValues" :checked="user.gender === '3'"><label for="others" class="side-key">Others</label>
      </div>

      <div class="field">
        <input type="button" class='submit-button' value="Register">
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
      }
    },
    props: [ 'avatarCanvas', 'user' ],
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
        const email = evt && evt.target && evt.target.value ? evt.target.value.trim() : this.user.email.trim()
        this.$emit('updateAvatarCanvas', {
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
        countries.forEach((country) => {
          const optionElement = document.createElement('option')
          optionElement.text = country.name
          optionElement.value = country.code
          if (countriesElement) {
            countriesElement.appendChild(optionElement)
            if (this.user.country === country.code) {
              optionElement.selected = true
            }
          }
        })

        this.setEventListeners()
      },
      populateStates () {
        const statesElement = document.getElementById('state')
        states.forEach((state) => {
          const optionElement = document.createElement('option')
          optionElement.text = state.name
          optionElement.value = state.code
          if (statesElement) {
            statesElement.appendChild(optionElement)
            if (this.user.state === state.code) {
              optionElement.selected = true
            }
          }
        })
      },
      displayLabel (evt, target = null) {
        target = target || evt.target
        const id = target.id
        document.querySelector(`label[for=${id}]`).style.display = target.value === '' ? 'none' : 'block'
        if (target.classList.contains('has-tip')) this.warnOfInputLength(target)
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
              console.log(`${countries.find((country) => country.code === this.options[this.selectedIndex].value).dial}`)
              phoneNumberElement.value = `${countries.find((country) => country.code === this.options[this.selectedIndex].value).dial} `
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
            element.value = this.user[element.dataset.name]
          }
        })
      }
    },
    mounted: function () {
      dateSelectionManager.loadDate({
        yearEndDigit: 2000,
        yearStartDigit: 1920,
        dayDefaultValue: this.user.day,
        monthDefaultValue: this.user.month,
        yearDefaultValue: this.user.year
      })
      this.setAvatar()
      this.populateCountries()
      this.populateStates()
      this.populateOtherInputs()
    }
  }

  import dateSelectionManager from 'date-selection-manager'
  import { validateFor } from '../../../../util/ssnValidator'
  import countries from '../../../../../static/json/countries/countries.json'
  import states from '../../../../../static/json/states/states.json'
</script>

<style scoped>
  .wrapper {
    background: #ffffff;
    height: 100%;
    min-height: 80vh;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #user {
    background: #ffffff;
    min-height: 70vh;
    width: 400px;
    font-size: 12px;
    margin: 30px auto;
    color: #adadad;
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
    min-height: 60px;
    margin-bottom: 10px;
    width: 100%;
  }

  .field-key {
    height: 20px;
    display: block;
  }

  .field-key:not(.show) {
    display: none;
  }

  .field-value {
    height: 30px;
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

  :placeholder {
    color: #adadad;
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

  input[type=email].field-value, input[type=text].field-value, select {
    outline: none;
    border-width: 0px 0px 2px 0px;
    border-color: #a0a0a0;
    color: #4d4c49;
    background: none;
  }

  input[type=text].field-value:focus {
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
    background: #adcddf;
    color: #ffffff;
    height: 30px;
    width: 100px;
    float: right;
    outline: 0px;
    border: 0px;
  }
</style>
