<template>
  <section>
    <div v-for="item in menuItems" :key="item.key">
      <MenuItemTemplate :item="item" :setCurrentView="triggerUpdateView"/>
    </div>
  </section>
</template>

<script type="text/javascript">
  export default {
    components: {
      MenuItemTemplate
    },
    props: ['updateCurrentView'],
    data: function () {
      return {
        menuItems: [{
          key: 'get-started',
          text: 'Get Started',
          icon: '',
          isActive: true
        },
        {
          key: 'find-dentist',
          text: 'Find Dentist',
          icon: '',
          isActive: false
        },
        {
          key: 'view-services',
          text: 'View Services',
          icon: '',
          isActive: false
        },
        {
          key: 'request-appointment',
          text: 'Request Appointment',
          icon: '',
          isActive: false
        },

        {
          key: 'view-scans',
          text: 'View Scans Applications',
          icon: '',
          isActive: false
        },
        {
          key: 'view-treatments',
          text: 'View Treatment Applications',
          icon: '',
          isActive: false
        }]
      }
    },

    methods: {
      triggerUpdateView: function (viewKey) {
        this.menuItems.map(item => {
          if (item.isActive) item.isActive = false
          if (item.key === viewKey) item.isActive = true
        })
        this.updateCurrentView(viewKey)
      }
    }
  }

  import MenuItemTemplate from './MenuItemTemplate.vue'
</script>>
