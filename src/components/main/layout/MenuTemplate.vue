<template>
  <section>
    <div v-for="item in menuItems" :key="item.key">
      <MenuItemTemplate :item="item" />
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
          key: 'get-started',
          text: 'Get Started',
          icon: '/static/images/person.png'
        },
        {
          key: 'find-dentist',
          text: 'Find Dentist',
          icon: '/static/images/search.png'
        },
        {
          key: 'view-services',
          text: 'View Services',
          icon: '/static/images/teeth.png'
        },
        {
          key: 'request-appointment',
          text: 'Request Appointment',
          icon: '/static/images/calendar.png'
        },

        {
          key: 'view-scan-applications',
          text: 'View Scans Applications',
          icon: '/static/images/scan-application.png'
        },
        {
          key: 'view-treatment-applications',
          text: 'View Treatment Applications',
          icon: '/static/images/file.png'
        }]
      }
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>>
