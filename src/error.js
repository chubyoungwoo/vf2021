import Vue from 'vue'

Vue.config.errorHandler = e => {
//  Vue.prototype.$toast(e.message)
  console.log('에러 : ', e.message)
}
