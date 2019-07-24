<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/"><li class="nav-item nav-link">Home</li></router-link>
        <router-link to="/search"><li class="nav-item nav-link">Search</li></router-link>
        <router-link v-if="isLoggedIn" to="/profile"><li class="nav-item nav-link">Profile</li></router-link>
        <router-link v-if="!isLoggedIn" to="/login"><li class="nav-item nav-link">Log In</li></router-link>
        <router-link v-if="!isLoggedIn" to="/signup"><li class="nav-item nav-link">Sign Up</li></router-link>
        <a href="#"><li v-if="isLoggedIn" class="nav-item"><a class="nav-link" v-on:click="logOut()">Log Out</a></li></a>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return{
      isLoggedIn: this.authenticate()
    }
  },

  created: function()
  {
    this.$bus.$on('logged', () => {
      this.authenticate();
    });
  },

  methods: {
    // Check if user is logged in or not
    authenticate() {
      let url = '/users/authenticate';
      const config = {
        withCredentials: true
      };
      this.axios.get(url, config).then((response) => {
        this.isLoggedIn = response.data;
      });
    },

    // Log the user out from both server and client side and then redirect to home
    logOut() {
      let url = '/users/logout';
      const config = {
        withCredentials: true
      };
      this.axios.get(url, config).then(() => {
        this.authenticate();
        this.$bus.$emit('logged', 'User logged out');
      });
      this.$router.push('/');
    }
  }
}
</script>