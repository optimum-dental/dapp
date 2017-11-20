<template>
  <div id="body-template">
    <Intro />
    <Why />
    <Appointment :book-appointment-vector="bookAppointmentVector" />
    <Scan :scan-appointment-vector="scanAppointmentVector" />
    <About :within-the-blockchain-vector="withinTheBlockchainVector" />
    <HowItWorks />
    <UseApp />
  </div>
</template>

<script>
export default {
  name: 'body-template',
  components: {
    Intro,
    Why,
    Appointment,
    Scan,
    About,
    HowItWorks,
    UseApp
  },
  computed: {
    bookAppointmentVector () {
      return this.vectors.bookAppointmentVector
    },
    scanAppointmentVector () {
      return this.vectors.scanAppointmentVector
    },
    withinTheBlockchainVector () {
      return this.vectors.withinTheBlockchainVector
    }
  },
  props: [ 'vectors' ]
}

import Intro from '../sections/Intro'
import About from '../sections/About'
import Appointment from '../sections/Appointment'
import Scan from '../sections/Scan'
import Why from '../sections/Why'
import HowItWorks from '../sections/HowItWorks'
import UseApp from '../sections/UseApp'
</script>

<style scoped>
  #body-template {
    width: 100%;
    background: #ffffff;
  }
</style>
