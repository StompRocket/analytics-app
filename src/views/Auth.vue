<template>
  <div class="page home">
   <div class="home__nav">
     <div class="brand">
      <img  src="../assets/logo.png" alt="SR Logo">
     <div>
       <p class="SR">Stomp<span class="">Rocket</span></p>
       <p class="product">Analytics</p>
     </div>
     </div>
    
     <a href="https://analytics.stomprocket.io" class="btn dark">leave</a>
   </div>
   <div class="auth__main">
     <div class="auth__container">
       <h1 class="title--large">Login</h1>
      <form @submit.prevent="login" class="auth__form">
        <label class="input__label" for="email">Email</label>
        <input class="input" id="email" type="email" placeholder="hello@stomprocket.io" v-model="email" required>
         <label class="input__label" for="pass" placeholder="password">Password</label>
        <input class="input" id="pass" type="password" v-model="pass" required>
        <button class="btn" type="submit">Submit</button>
      </form>
     </div>

   </div>
  </div>
</template>
<script>
export default {
  name: "Auth",
  data() {
    return {
      email: "",
      pass: "",
      error: ""
    }
  },
  computed: {
      auth() {

        return this.$store.getters.authData
      },
    },
  methods: {
    login() {
      if (this.email.length > 1 && this.pass.length > 1) {
        this.$firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message
    console.log(errorMessage)
  });
      }
    }
  },
  mounted() {
    if (this.auth.token) {
      this.$router.push('/')
    }
  }
}
</script>