<template>
  <div>
    <!-- <b-container class="bv-example-row"> -->
    <b-row>
      <navbar />
      <b-col cols="10">
        <h1>Employee</h1>
        <div>
          <b-button v-b-modal.modal-1 @click="addEmployee">Add Employee</b-button>

          <b-modal ref="save-modal" id="modal-1" title="Employee">
            <b-form @submit="onSave">
              <b-form-group label="Name">
                <b-form-input
                  v-model="name"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Grade">
                <b-form-input
                  v-model="grade"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Address">
                <b-form-input
                  v-model="address"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Mobile">
                <b-form-input
                  v-model="mobile"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Bank Info">
                <select
                  class="form-control"
                  v-model="bank_info_id"
                  name=""
                  id=""
                >
                  <option value="" selected>select</option>
                  <option v-for="bank in bank" :key="bank.id" :value="bank.id" selected>
                    {{ bank.account_number }}
                  </option>
                </select>
              </b-form-group>

              <b-form-group>
                <b-button
                  type="submit"
                  variant="outline-primary"
                  :disabled="acceptableSubmittion"
                  >Save</b-button
                >
              </b-form-group>
            </b-form>
          </b-modal>
        </div>
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Account Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empl in employee" :key="empl.id">
              <td>{{ empl.employee_id }}</td>
              <td>{{ empl.name }}</td>
              <td>{{ empl.grade }}</td>
              <td>{{ empl.address }}</td>
              <td>{{ empl.mobile }}</td>
              <td>{{ empl.account_number }}</td>
              <td>
                <button class="btn btn-success" @click="onEdit(empl)">
                  Edit
                </button>
                <button class="btn btn-danger" @click="onDelete(empl)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <!-- </b-container> -->
  </div>
</template>
<script>
let token = localStorage.getItem("token");
import navbar from "./navbar";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export default {
  name: "app",
  components: {
    navbar,
  },
  data() {
    return {
      employee: [],
      bank: [],
      name: "",
      grade: "",
      address: "",
      mobile: "",
      bank_info_id: "",
      id: "",
    };
  },
  methods: {
    addEmployee(){
      this.name = "";
      this.grade = "";
      this.address = "";
      this.mobile = "";
      this.bank_info_id = "";
      this.id= "";
    },
    getEmployee() {
      axios.get("/employee").then((res) => {
        console.log("asfas", res);
        this.employee = res.data.data;
      });
    },
    getBankInfo() {
      axios.get("/getBank").then((res) => {
        this.bank = res.data.data;
      });
    },
    onSave(e) {
      e.preventDefault();
      if (this.id == "") {
        axios
          .post("/employee", {
            name: this.name,
            grade: this.grade,
            address: this.address,
            mobile: this.mobile,
            bank_info_id: this.bank_info_id,
          })
          .then((reponse) => {
            console.log(reponse);
            if (reponse.data.status == false) {
              if (reponse.data.errors.name != undefined) {
                alert(reponse.data.errors.name[0]);
              }
              if (reponse.data.errors.grade != undefined) {
                alert(reponse.data.errors.grade[0]);
              }
              if (reponse.data.errors.address != undefined) {
                alert(reponse.data.errors.address[0]);
              }
              if (reponse.data.errors.mobile != undefined) {
                alert(reponse.data.errors.mobile[0]);
              }
              if (reponse.data.errors.bank_info_id != undefined) {
                alert(reponse.data.errors.bank_info_id[0]);
              }
            } else {
              this.getEmployee();
              this.$refs["save-modal"].hide();
            }
          })
          .catch((error) => {
            console.log("bank_id ", error);
          });
      } else {
        axios
          .put("/employee/" + this.id, {            
            name: this.name,
            grade: this.grade,
            address: this.address,
            mobile: this.mobile,
            bank_info_id: this.bank_info_id,
          })
          .then((reponse) => {
            console.log(reponse);
            if (reponse.data.status == false) {
              if (reponse.data.errors.name != undefined) {
                alert(reponse.data.errors.name[0]);
              }
              if (reponse.data.errors.grade != undefined) {
                alert(reponse.data.errors.grade[0]);
              }
              if (reponse.data.errors.address != undefined) {
                alert(reponse.data.errors.address[0]);
              }
              if (reponse.data.errors.mobile != undefined) {
                alert(reponse.data.errors.mobile[0]);
              }
              if (reponse.data.errors.bank_info_id != undefined) {
                alert(reponse.data.errors.bank_info_id[0]);
              }
            } else {
              this.getEmployee();
              this.$refs["save-modal"].hide();
            }
          })
          .catch((error) => {
            console.log("bank_id ", error);
          });
      }
    },
    onEdit(item) {
      axios
        .get("/employee/" + item.id + "/edit")
        .then((res) => {
          this.name = res.data.name;
          this.grade = res.data.grade;
          this.address = res.data.address;
          this.mobile = res.data.mobile;
          this.bank_info_id = res.data.bank_info_id;
          this.id = res.data.id;
          this.$refs["save-modal"].show();
        })
        .catch((error) => {
          console.log("bank_id ", error);
        });
    },
    onDelete(item) {
      let confirmation = confirm("Are you sure to delete");
      if (confirmation) {
        axios
          .delete("/employee/" + item.id, item)
          .then(() => {
            this.getEmployee();
          })
          .catch((error) => {
            console.log("employee ", error);
          });
      }
    },
  },
  created() {
    this.getEmployee();
    this.getBankInfo();
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
