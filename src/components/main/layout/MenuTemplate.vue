<template>
  <section>
    <div v-for="item in menuItems" :key="item.key">
      <MenuItemTemplate :item="item"/>
    </div>
  </section>
</template>

<script type="text/javascript">
  export default {
    components: {
      MenuItemTemplate
    },

    data: function () {
      return {
        menuItems: [{
          key: 'getStarted',
          text: 'Get Started',
          icon: '',
          isActive: true
        },
        {
          key: 'findDentist',
          text: 'Find Dentist',
          icon: '',
          isActive: false
        },
        {
          key: 'viewServices',
          text: 'View Services',
          icon: '',
          isActive: false
        },
        {
          key: 'requestAppointment',
          text: 'Request Appointment',
          icon: '',
          isActive: false
        },

        {
          key: 'viewScans',
          text: 'View Scans Applications',
          icon: '',
          isActive: false
        },
        {
          key: 'viewTreatments',
          text: 'View Treatment Applications',
          icon: '',
          isActive: false
        }]
      }
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>>
