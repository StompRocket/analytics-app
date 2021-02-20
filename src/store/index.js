import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   // api: "http://localhost:3056",
     api: "https://a.stomprocket.io",
    token: false,
    uid: "",
    properties: []
  },
  mutations: {
    authData (state, auth) {
      state.uid = auth.uid,
        state.token = auth.token
    },
    properties (state, props) { 
      state.properties = props
    }
  },
  actions: {
  },
  getters: {
    authData: state => { 
      return {uid: state.uid, token: state.token}
    },
    api: state => { 
      return state.api
    },
    properties: state => {
      return state.properties
    }
  },
  modules: {
  }
})
