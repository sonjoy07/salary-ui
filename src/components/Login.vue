<template>
  <div>
    <b-container>
      <b-row class="justify-content-md-center mt-4">
        <b-col col md="8">
          <b-card
            header="Login-form"
            header-bg-variant="primary"
            header-text-variant="white"
          >
            <b-card-text>
              <b-form @submit="onSubmit">
                <b-form-group description="Enter your Email" label="Email">
                  <b-form-input
                    v-model="email"
                    type="email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  description="Enter your Passowrd"
                  label="Password"
                >
                  <b-form-input
                    v-model="password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-button
                    type="submit"
                    variant="outline-primary"
                    :disabled="acceptableSubmittion"
                    >Login</b-button
                  >
                </b-form-group>
              </b-form>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
let token = localStorage.getItem("token");
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
export default {
  name: "Login",
  // props: {
  //   msg: String,
  // },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      try {
        const reponse = await axios.post("auth/login", {
          email: this.email,
          password: this.password,
        });
        if (reponse.data.status == false) {
          if (reponse.data.errors.password != undefined) {
            alert(reponse.data.errors.password[0]);
          }
          if (reponse.data.errors.email.length > 0) {
            alert(reponse.data.errors.email[0]);
          }
        }
        localStorage.setItem("token", reponse.data.token);
        // setTimeout(()=>{
        // this.$router.push('/dashboard')
        window.location.href = '/dashboard';
        // },500)
      } catch (err) {
        console.log("asdfasdf", err);
      }
    },
  },
  mounted() {
    //   console.log({router: this.$router});
    if (token) {
      this.$router.push("/dashboard");
      //  router.push('/login')
    }
  },
  acceptableSubmittion() {
    return this.username.length > 0 && this.password.length > 0 ? false : true;
  },
};
</script>

