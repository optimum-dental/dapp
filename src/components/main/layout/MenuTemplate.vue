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
          icon: '/static/images/person.png',
          isActive: true
        },
        {
          key: 'find-dentist',
          text: 'Find Dentist',
          icon: '/static/images/search.png',
          isActive: false
        },
        {
          key: 'view-services',
          text: 'View Services',
          icon: '/static/images/teeth.png',
          isActive: false
        },
        {
          key: 'request-appointment',
          text: 'Request Appointment',
          icon: '/static/images/calendar.png',
          isActive: false
        },

        {
          key: 'view-scans',
          text: 'View Scans Applications',
          icon: '/static/images/scan-application.png',
          isActive: false
        },
        {
          key: 'view-treatments',
          text: 'View Treatment Applications',
          icon: '/static/images/file.png',
          isActive: false
        }]
      }
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>>
