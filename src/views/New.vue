<template>
  <div class="page home">
    <div class="home__nav">
        <router-link to="/" class="brand">
        <img src="../assets/logo.png" alt="SR Logo">
        <div>
          <p class="SR">Stomp<span class="">Rocket</span></p>
          <p class="product">Analytics</p>
        </div>
      </router-link>

      <button class="btn dark" @click="this.$parent.logout">Logout</button>
    </div>
    <div class="home__main">
      <div class="home__main__header">

        <div class="text">
        <router-link to="/" class="back">back</router-link>
        
          <h1 class="title--large">Add Site</h1>
          <p class="">Stomp Rocket Analytic's simple pricing plan allows you to add unlimited sites to your account.</p>
        </div>
      </div>
      <form class="newPropertyForm" @submit.prevent="create">
      <label for="domain" class="label">Domain <span>(make sure to include the subdomain if you wish to track one)</span></label>
      <input id="domain" class="input" type="text" v-model="domain" placeholder="www.example.com" required>
      <p class="error" v-if="domainError">{{domainError}}</p>
      <div>
       <label for="ip" class="label">Exclude IPs <span>(add comma after each ip with no whitespace)</span></label>
        
      </div>
     
    <input v-model="ips" id="ip"  class="input" placeholder="192.168.1.17,2606:4700:4700::1111">
     <button v-if="excludeIp" class="link exclude" @click.prevent="excludeThisDevice">Include this device in metrics ({{ip}})</button>
      <button v-if="!excludeIp" class="link exclude" @click.prevent="excludeThisDevice">Exclude this device from metrics ({{ip}})</button>

      <button type="submit" class="btn">Add</button>
      </form>
    </div>
  </div>
</template>
<script>
  import "moment"
  import "chart.js"
  export default {
    name: "Home",
    data() {
      return {
        domain: "",
        ips: "",
        date: "",
        ip: "",
        excludeIp: false,
        domainError: false
      }
    },
    computed: {
      auth() {

        return this.$store.getters.authData
      }
    },
    watch: {
      auth(val) {
       // this.init()
      },
     
    },
    async mounted() {
fetch(`${this.$store.getters.api}/api/v1/ip`).then(res => res.json()).then(res => {
  this.ip = res.ip
})
     // this.init()

    },
    methods: {
     excludeThisDevice() {
       this.excludeIp = !this.excludeIp
     },
     create() {
       if (this.domain.length > 1 && this.$dataProcessors.validURL(this.domain)) {
  let url = this.$dataProcessors.getURLComponents(this.domain)
   this.domainError = false
   let cleanedIps = []
   let allIPs = this.ips.replace(/\s+/g, '').split(",")
   cleanedIps = allIPs.filter(a => {
     return this.$dataProcessors.validIP(a)
   })
   if (this.excludeIp) {
     cleanedIps.push(this.ip)
   }
   
   fetch(this.$store.getters.api + "/api/v1/property", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       domain: url.hostname,
       auth: this.auth.token,
       exclude: cleanedIps
     })
   }).then(res => res.json()).then(res => {
       console.log(res)
       if (res.success) {
         this.$router.push("/property/"+ res.id)
       } else {
         this.domainError = res.error
       }
     })
       console.log(url, cleanedIps)
       } else {
         console.log("Invalid")
         this.domainError = "Invalid Domain"
       }
     

     }
    }
  }
</script> 