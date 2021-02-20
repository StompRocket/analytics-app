<template>
  <div id="app" class="app">

    <router-view />
    <footer class="">
    <div class="brand">
      <img  src="./assets/logo.png" alt="SR Logo">
     <div>
       <p class="SR">Stomp<span class="">Rocket</span></p>
       <p class="product">Analytics</p>
     </div>
     </div>
     

    </footer>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {}
  },
  mounted() {
    this.$firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    let email = user.email
   console.log("user", uid)
   if (this.$route.path == "/auth") {
     this.$router.push("/")
   }
   this.$firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {

   fetch(`${this.$store.state.api}/api/v1/user/${uid}/update`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
      body: JSON.stringify({
        uid: uid, 
        name: user.displayName,
        email: user.email,
        auth: idToken
      })
      
   }).then(res => res.json()).then(res => {
     console.log(res)
   })
   this.$store.commit("authData", {token: idToken, uid: uid, email: email})
   console.log(email)

}).catch(function(error) {
  // Handle error
});

  } else {
    // User is signed out
    // ...
    console.log("no user")
    if (this.$route.path != "/auth") {
    this.$router.push("/auth")
    }

  }
});
    
  }
}
</script>