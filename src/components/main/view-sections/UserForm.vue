<template>
  <div id="user-form">
    <div class="title">Register as Patient</div>
    <div class="field">
      <label for="name" class="field-key">Your Name</label>
      <input type="text" class="field-value" id="name" v-model="user.fullName">
    </div>

    <div class="field">
      <label for="email" class="field-key">Your Email</label>
      <input type="text" class="field-value" id="email" v-model="user.email">
    </div>

    <div class="field avatar"></div>

    <div class="field">
      <label for="state" class="field-key">State</label>
      <input type="text" class="field-value" id="state">
    </div>

    <div class="field">
      <label for="residential-address" class="field-key">Residential Address</label>
      <input type="text" class="field-value" id="residential-address" v-model="user.residentialAddress">
    </div>

    <div class="field">
      <label for="phone-number" class="field-key">Phone Number</label>
      <input type="text" class="field-value" id="phone-number" v-model="user.phoneNumber">
    </div>

    <div class="field">
      <label class="field-key">Birthday</label>
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
      }
    },
    mounted: function () {
      dateSelectionManager.loadDate()
      document.querySelector('#user-form').closest('.content').style.borderTop = 'none'
      this.addAvatar()
    },
    watch: {
      avatarCanvas () {
        this.addAvatar()
      }
    }
  }

  import dateSelectionManager from 'date-selection-manager'
</script>

<style scoped>
  #user-form {
    background: #ffffff;
    min-height: 80vh;
    width: 90vh;
    margin: 30px auto;
    color: #adadad;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 150px;
  }

  .title {
    height: 40px;
    width: 100%;
    font-size: 20px;
    color: #4d4c49;
  }

  .field {
    min-height: 80px;
    margin-bottom: 10px;
    width: 100%;
  }

  .field-key {
    height: 20px;
    display: block;
  }

  .field-value {
    height: 30px;
    width: 100%;
  }

  .side-key {
    display: inline-block;
    height: 20px;
    position: relative;
    top: -4px;
    margin-right: 20px;
  }

  .avatar {
    height: 130px;
  }

  input[type=text].field-value, select {
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
</style>
