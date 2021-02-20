import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import moment from "moment"
import * as dataProcessors from "./Logic/dataProcessors"
import "firebase/auth";
import './assets/main.scss'
import '../node_modules/minireset.css/minireset.min.css'
Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyA6ATir_aPLh3P9-juc22aaw4cd-OnMS4Q",
  authDomain: "stomp-rocket-analytics.firebaseapp.com",
  projectId: "stomp-rocket-analytics",
  storageBucket: "stomp-rocket-analytics.appspot.com",
  messagingSenderId: "705626604214",
  appId: "1:705626604214:web:b026d661752038afa2dc17",
  measurementId: "G-YV75S515XW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.prototype.$firebase = firebase
Vue.prototype.$moment = moment
Vue.prototype.$dataProcessors = dataProcessors
let srApp;
firebase.auth().onAuthStateChanged((user) => {
  if (!srApp) {
    srApp = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

  }
});