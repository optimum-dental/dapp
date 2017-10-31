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
        const profile = {
          key: `${this.user.type === '0' ? 'get-started' : 'profile'}`,
          text: `${this.user.type === '0' ? 'Get Started' : 'Profile'}`,
          icon: '/static/images/person.png'
        }
        switch (this.user.type) {
          case '2':
            return [
              {
                key: 'manage-services',
                text: 'Manage Services',
                icon: '/static/images/teeth.png'
              },
              {
                key: 'view-apppointment-requests',
                text: 'View Appointment Requests',
                icon: '/static/images/appointment.png'
              },
              {
                key: 'view-scan-results',
                text: 'View Scan Results',
                icon: '/static/images/file.png'
              },
              profile
            ]
          case '3':
            return [
              {
                key: 'manage-dentists',
                text: 'Manage Dentists',
                icon: '/static/images/file.png'
              },
              {
                key: 'view-services',
                text: 'View Services',
                icon: '/static/images/teeth.png'
              },
              {
                key: 'find-dentists',
                text: 'View Dentists',
                icon: '/static/images/search.png'
              },
              {
                key: 'view-scan-results',
                text: 'View Scan Results',
                icon: '/static/images/scan-application.png'
              },
              profile
            ]
          case '4':
            return [
              {
                key: 'managers',
                text: 'Managers',
                icon: '/static/images/file.png'
              },
              {
                key: 'view-services',
                text: 'View Services',
                icon: '/static/images/teeth.png'
              },
              {
                key: 'find-dentists',
                text: 'View Dentists',
                icon: '/static/images/search.png'
              },
              {
                key: 'view-scan-results',
                text: 'View Scan Results',
                icon: '/static/images/scan-application.png'
              },
              profile
            ]
          default:
            return [
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
                key: 'view-applications',
                text: 'View Applications',
                icon: '/static/images/file.png'
              },
              {
                key: 'notifications',
                text: 'Notifications',
                icon: '/static/images/notifications.png'
              },
              profile
            ]
        }
      }
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>
