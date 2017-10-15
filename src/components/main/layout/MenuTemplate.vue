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
    computed: {
      user () {
        return this.$root.user
      },
      menuItems () {
        switch (this.user.type) {
          case '2':
            return [
              {
                key: 'get-started',
                text: 'Get Started',
                icon: '/static/images/person.png'
              },
              {
                key: 'view-apppointment-requests',
                text: 'View Appointment Requests',
                icon: '/static/images/search.png'
              },
              {
                key: 'manage-services',
                text: 'Manage Services',
                icon: '/static/images/teeth.png'
              },
              {
                key: 'view-scan-results',
                text: 'View Scan Results',
                icon: '/static/images/scan-application.png'
              }
            ]
          case '3':
            return [
              {
                key: 'get-started',
                text: 'Get Started',
                icon: '/static/images/person.png'
              },
              {
                key: 'manage-dentists',
                text: 'Manage Dentists',
                icon: '/static/images/search.png'
              },
              {
                key: 'view-services',
                text: 'View Services',
                icon: '/static/images/teeth.png'
              },
              {
                key: 'find-dentists',
                text: 'View Dentists',
                icon: '/static/images/scan-application.png'
              },
              {
                key: 'view-scan-results',
                text: 'View Scan Results',
                icon: '/static/images/scan-application.png'
              }
            ]
          case '4':
            return [
              {
                key: 'get-started',
                text: 'Get Started',
                icon: '/static/images/person.png'
              },
              {
                key: 'managers',
                text: 'Managers',
                icon: '/static/images/search.png'
              },
              {
                key: 'view-services',
                text: 'View Services',
                icon: '/static/images/teeth.png'
              },
              {
                key: 'find-dentists',
                text: 'View Dentists',
                icon: '/static/images/scan-application.png'
              },
              {
                key: 'view-scan-results',
                text: 'View Scan Results',
                icon: '/static/images/scan-application.png'
              }
            ]
          default:
            return [
              {
                key: 'get-started',
                text: 'Get Started',
                icon: '/static/images/person.png'
              },
              {
                key: 'find-dentists',
                text: 'Find Dentists',
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
              }
            ]
        }
      }
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>>
