<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon @click="drawer =!drawer"/>
    <site-title :title="title"></site-title>
     <v-spacer></v-spacer>
     <v-btn icon @click="save"><v-icon>mdi-check</v-icon></v-btn>
     <v-btn icon @click="read">read</v-btn>
     <v-btn icon @click="readOne">readOne</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <site-menu></site-menu>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>
    <site-footer :footer="footer"></site-footer>
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
      title: '나의 타이틀입니다.',
      footer: '푸터입니다.'
    }
  },
  mounted () {
    console.log('firebase:', this.$firebase)
  },
  methods: {
    save () {
      console.log('save')
      this.$firebase.database().ref().child('abcd').set({
        title: 'abcd',
        text: 'tttt'
      })
    },
    read () {
      this.$firebase.database().ref().child('abcd').on('value', (sn) => {
        console.log(sn)
        console.log(sn.val())
      })
    },
    async readOne () {
      const sn = await this.$firebase.database().ref().child('abcd').once('value')
      console.log('readOne : ', sn.val())
    }
  }
}
</script>
