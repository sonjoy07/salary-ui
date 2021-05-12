<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Salary</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!token" href="/login">Login</b-nav-item>

            <b-nav-item-dropdown right v-if="token"> 
              <!-- Using 'button-content' slot -->

              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item
                ><p v-on:click="logout">Sign Out</p></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
let token = localStorage.getItem("token");
if (token != null) {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
export default {
  data() {
    return {
      token: token,
    };
  },
  methods: {
    async logout(e) {
      e.preventDefault();
      console.log("reponse");
      try {
        const reponse = await axios.post("auth/logout");
        console.log(reponse);
        if (reponse.status == 200) {
          localStorage.removeItem("token");
          
        window.location.href = '/login';
          // setTimeout(() => {
          //   this.$router.push("/login");
          // }, 500);
        }
        // window.location.href = '/login';
      } catch (err) {
        console.log("asdfasdf", err);
      }
    },
  },
  name: "App",
  components: {
    // Login,
  },
};
</script>
<style>
.ml-auto,
.mx-auto {
  margin-left: auto !important;
}
.navbar {
  padding: 0.5rem 1rem;
}
.navbar-expand-lg .navbar-nav .dropdown-menu {
  right: 0;
}
</style>
