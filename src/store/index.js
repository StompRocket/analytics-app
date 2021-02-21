import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   apiBeta: "http://localhost:3056",
   api: "https://a.stomprocket.io",
    token: false,
    uid: "",
    properties: [],
    email: "",
    beta: window.location.hostname.indexOf("localhost") > -1
  },
  mutations: {
    authData (state, auth) {
      state.uid = auth.uid,
        state.token = auth.token
      state.email = auth.email
    },
    properties (state, props) { 
      state.properties = props
    }
  },
  actions: {
  },
  getters: {
    authData: state => { 
      return {uid: state.uid, token: state.token, email: state.email}
    },
    api: state => { 
      if (state.beta) { 
        return state.apiBeta
      }
      return state.api
    },
    properties: state => {
      return state.properties
    }
  },
  modules: {
  }
})
