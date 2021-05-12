<template>
  <div>
    <!-- <b-container class="bv-example-row"> -->
    <b-row>
      <navbar/>
      <b-col cols="10"> <h1>Dashboard</h1></b-col>
    </b-row>
    <!-- </b-container> -->
  </div>
</template>
<script>
let token = localStorage.getItem("token");
import navbar from "./navbar";

export default {
  name: "app",
  components:{
      navbar
  },

  mounted() {
    //   console.log({router: this.$router});
    if (!token) {
      this.$router.push("/login");
      //  router.push('/login')
    }
  },
};
</script>
