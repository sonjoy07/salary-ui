<template>
  <div>
    <!-- <b-container class="bv-example-row"> -->
    <b-row>
      <navbar />
      <b-col cols="10">
        <h1>Salary</h1>
        <div>
          <b-button v-b-modal.modal-1 @click="addEmployee">Add Salary</b-button>

          <b-modal ref="save-modal" id="modal-1" title="Salary">
            <b-form @submit="onSave">
              <b-form-group label="Basic Salary">
                <b-form-input
                  v-model="basic_salary"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Balance">
                <b-form-input
                  v-model="balance"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Company Info">
                <select
                  class="form-control"
                  v-model="company_account"
                  name=""
                  id=""
                >
                  <option value="" selected>select</option>
                  <option
                    v-for="bank in bank"
                    :key="bank.id"
                    :value="bank.id"
                    selected
                  >
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
          <b-modal ref="edit-modal" title="Run Out the balance please add some money">
            <b-form @submit="onSaveLast">
                <input type="hidden" v-model="basic_salary">
              <b-form-group label="Balance">
                <b-form-input
                  v-model="balance"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>

                <input type="hidden" v-model="company_account">

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
              <th>Employee Name</th>
              <th>Grade</th>
              <th>Company Account</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empl in employee" :key="empl.id">
              <td>{{ empl.employee_name }}</td>
              <td>{{ empl.grade }}</td>
              <td>{{ empl.company_account }}</td>
              <td>৳ {{ empl.salary }}</td>
            </tr>
          </tbody>
          <tr>
            <th colspan="2">Total Salary</th>
            <td>{{total_salary}}</td>
          </tr>
          <tr>
            <th colspan="2">Company Balance</th>
            <td>{{company_balance}}</td>
          </tr>
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
      basic_salary: "",
      balance: "",
      company_account: "",
      total_salary: 0,
      company_balance: 0,
      id: "",
    };
  },
  methods: {
    addEmployee() {
      this.basic_salary = "";
      this.balance = "";
      this.company_account = "";
      this.id = "";
    },
    getEmployee() {
      axios.get("/salarySheet").then((res) => {
        this.employee = res.data.data;
        this.total_salary = res.data.total_salary;
        this.company_balance = res.data.company_balance;
      });
    },
    getBankInfo() {
      axios.get("/getBankSalary").then((res) => {
        this.bank = res.data.data;
      });
    },
    onSave(e) {
      e.preventDefault();
        axios
          .post("/salary", {
            basic_salary: this.basic_salary,
            balance: this.balance,
            company_account: this.company_account,
          })
          .then((reponse) => {
            console.log(reponse);
            if (reponse.data.status == false) {
              if (reponse.data.not_complete == 1) {
                this.$refs["edit-modal"].show();
                this.$refs["save-modal"].hide();
              }
              if (reponse.data.errors.basic_salary != undefined) {
                alert(reponse.data.errors.basic_salary[0]);
              }
              if (reponse.data.errors.balance != undefined) {
                alert(reponse.data.errors.balance[0]);
              }
              if (reponse.data.errors.company_account != undefined) {
                alert(reponse.data.errors.company_account[0]);
              }
            } else {
              this.getEmployee();
              this.$refs["save-modal"].hide();
              this.$refs["edit-modal"].hide();
            }
          })
          .catch((error) => {
            console.log("bank_id ", error);
          });
    },
    onSaveLast(e) {
      e.preventDefault();
        axios
          .post("/resalary", {
            basic_salary: this.basic_salary,
            balance: this.balance,
            company_account: this.company_account,
          })
          .then((reponse) => {
            console.log(reponse);
            if (reponse.data.status == false) {
              if (reponse.data.not_complete == 1) {
                this.$refs["edit-modal"].show();
                this.$refs["save-modal"].hide();
              }
              if (reponse.data.errors.basic_salary != undefined) {
                alert(reponse.data.errors.basic_salary[0]);
              }
              if (reponse.data.errors.balance != undefined) {
                alert(reponse.data.errors.balance[0]);
              }
              if (reponse.data.errors.company_account != undefined) {
                alert(reponse.data.errors.company_account[0]);
              }
            } else {
              this.getEmployee();
              this.$refs["save-modal"].hide();
              this.$refs["edit-modal"].hide();
            }
          })
          .catch((error) => {
            console.log("bank_id ", error);
          });
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
