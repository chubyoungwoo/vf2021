<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon @click="drawer =!drawer"/>
    <site-title :title="site.title"></site-title>
     <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" width="400">
      <site-menu :items="site.menu"></site-menu>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
    <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
import siteTitle from '@/views/site/title'
import siteFooter from '@/views/site/footer'
import siteMenu from '@/views/site/menu'

export default {
  components: { siteTitle, siteFooter, siteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      site: {
        menu: [
          {
            title: 'home',
            icon: 'mdi-home',
            subItems: [
              {
                title: 'Dashboard',
                to: '/'
              },
              {
                title: 'About',
                to: '/about'
              }

            ]
          },
          {
            title: 'about',
            active: true,
            icon: 'mdi-account',
            subItems: [
              {
                title: 'xxx',
                to: '/xxx'
              }
            ]
          }
        ],
        title: '나의 타이틀입니다.',
        footer: '푸터입니다.'
      }
    }
  },
  created () {
    this.subscribe()
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
          return
        }
        this.site = v
        console.log('this.site :', this.site)
      }, (e) => {
        console.log(e.message)
      })
    },
    save () {
      console.log('save')
      this.$firebase.database().ref().child('site').set({
        title: 'abcd',
        text: 'tttt'
      })
    },
    read () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        console.log(sn)
        console.log('site :', sn.val())
      })
    },
    async readOne () {
      const sn = await this.$firebase.database().ref().child('site').once('value')
      console.log('readOne : ', sn.val())
    }
  }
}
</script>
