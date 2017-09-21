<template>
  <div id="user-form">
    <div class="title">Register as Patient</div>
    <div class="field">
      <label for="name" class="field-key">Your Name</label>
      <input type="text" class="field-value has-tip" id="name" v-model="user.fullName" placeholder="Your Name" @input="displayLabel">
      <div class="tip">Write between 5 to 32 characters</div>
    </div>

    <div class="field">
      <label for="email" class="field-key">Your Email</label>
      <input type="email" class="field-value has-tip" id="email" v-model="user.email" placeholder="Your Email" @input="displayLabel">
      <div class="tip">Write between 5 to 32 characters</div>
    </div>

    <div class="field avatar"></div>

    <div class="field">
      <label for="state" class="field-key">State</label>
      <select id='state' class="field-value" @input="displayLabel"><option value=''>State</option></select>
    </div>

    <div class="field">
      <label for="residential-address" class="field-key">Residential Address</label>
      <input type="text" class="field-value has-tip" id="residential-address" v-model="user.residentialAddress" placeholder="Residential Address" @input="displayLabel">
      <div class="tip">Write between 5 to 32 characters</div>
    </div>

    <div class="field">
      <label for="phone-number" class="field-key">Phone Number</label>
      <input type="text" class="field-value" id="phone-number" v-model="user.phoneNumber" placeholder="Phone Number" @input="displayLabel">
    </div>

    <div class="field">
      <label class="field-key date-of-birth">Birthday</label>
      <div class='date-holder'>
        <select id='day'><option value=''>Day</option></select>
        <select id='month'><option value=''>Month</option></select>
        <select id='year'><option value=''>Year</option></select>
      </div>
    </div>

    <div class="field">
      <label class="field-key">Gender</label>
      <input type="checkbox" class="field-value gender" name="gender" id="female" value="Female" @click="resetCheckeBoxValues"><label for="female" class="side-key">Female</label>
      <input type="checkbox" class="field-value gender" name="gender" id="male" value="Male" @click="resetCheckeBoxValues"><label for="male" class="side-key">Male</label>
      <input type="checkbox" class="field-value gender" name="gender" id="others" value="Others" @click="resetCheckeBoxValues"><label for="others" class="side-key">Others</label>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'avatarCanvas', 'user' ],
    name: 'user-form',
    methods: {
      resetCheckeBoxValues (evt) {
        const target = evt.target
        const id = target.id
        Array.from(document.querySelectorAll('.gender')).forEach((checkBox) => {
          if (checkBox.id !== id) checkBox.checked = false
        })
      },
      addAvatar () {
        const avatarCanvas = this.avatarCanvas
        const avatarContainer = document.querySelector('.avatar')
        if (avatarContainer && avatarCanvas && avatarCanvas.style) {
          avatarCanvas.style.borderRadius = '100px'
          avatarContainer.appendChild(avatarCanvas)
        }
      },
      populateStates () {
        Object.keys(states).forEach((id) => {
          const stateName = states[id]
          const optionElement = document.createElement('option')
          optionElement.text = stateName
          optionElement.value = id
          const statesElement = document.getElementById('state')
          if (statesElement) {
            statesElement.appendChild(optionElement)
          }
        })
      },
      displayLabel (evt) {
        const target = evt.target
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
      }
    },
    mounted: function () {
      dateSelectionManager.loadDate()
      document.querySelector('#user-form').closest('.content').style.borderTop = 'none'
      this.addAvatar()
      this.populateStates()
    },
    watch: {
      avatarCanvas () {
        this.addAvatar()
      }
    }
  }

  import dateSelectionManager from 'date-selection-manager'
  import states from '../../../../static/json/states/states_hash.json'
</script>

<style scoped>
  #user-form {
    background: #ffffff;
    min-height: 80vh;
    /*width: 90vh;*/
    font-size: 12px;
    margin: 30px auto;
    color: #adadad;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 150px;
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

  .field-key:not(.date-of-birth) {
    height: 20px;
    display: none;
  }

  .field-value {
    height: 30px;
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
</style>
