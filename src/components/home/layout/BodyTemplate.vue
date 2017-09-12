<template>
  <div id="body-template">
    <Intro />
    <About />
    <Appointment />
    <Scan />
    <Why />
    <HowItWorks />
    <UseApp />
  </div>
</template>

<script>
export default {
  name: 'body-template',
  components: {
    Intro,
    About,
    Appointment,
    Scan,
    Why,
    HowItWorks,
    UseApp
  }
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
  }
</style>
