<template>
  <div>
    <!-- <b-container class="bv-example-row"> -->
    <b-row>
      <navbar />
      <b-col cols="10">
        <h1>Bank</h1>
        <div>
          <b-button v-b-modal.modal-lg variant="primary" @click="addBank">Add Bank</b-button>

          <b-modal ref="save-modal" id="modal-lg" size="lg" title="Bank">
            <b-form @submit="onSave">
              <b-form-group label="Bank Name">
                <b-form-input
                  v-model="bank_name"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Branch Name">
                <b-form-input
                  v-model="branch_name"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Account Name">
                <b-form-input
                  v-model="account_name"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Account Number">
                <b-form-input
                  v-model="account_number"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Current Balance">
                <b-form-input
                  v-model="current_balance"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Account Type">
                <select
                  class="form-control"
                  v-model="account_type"
                  name=""
                  id=""
                >
                  <option value="">Select</option>
                  <option value="0">Savings</option>
                  <option value="1">Current</option>
                </select>
              </b-form-group>
              <b-form-group label="User Type">
                <select
                  class="form-control"
                  v-model="user_type"
                  name=""
                  id=""
                >
                  <option value="">Select</option>
                  <option value="0">Employee</option>
                  <option value="1">Company</option>
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
              <th>Bank Name</th>
              <th>Branch Name</th>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Current Balance</th>
              <th>Account Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bank in bank_info" :key="bank.id">
              <td>{{ bank.bank_name }}</td>
              <td>{{ bank.branch_name }}</td>
              <td>{{ bank.account_name }}</td>
              <td>{{ bank.account_number }}</td>
              <td>{{ bank.current_balance }}</td>
              <td>{{ bank.account_type == 0 ? "Savings" : "Current" }}</td>
              <td>
                <button class="btn btn-success" @click="onEdit(bank)">
                  Edit
                </button>
                <button class="btn btn-danger" @click="onDelete(bank)">
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
      bank_info: [],
      bank_name: "",
      branch_name: "",
      account_name: "",
      account_number: "",
      current_balance: "",
      account_type: "",
      user_type: "",
      id: "",
    };
  },
  methods: {
    addBank(){
      this.bank_name = "";
      this.branch_name = "";
      this.account_name = "";
      this.account_number = "";
      this.current_balance = "";
      this.account_type = "";
      this.user_type = "";
      this.id = "";
    },
    getBank() {
      axios.get("/bank").then((res) => {
        // console.log("asfas", res);
        this.bank_info = res.data.data;
      });
    },
    onSave(e) {
      e.preventDefault();
      if (this.id == "") {
        axios
          .post("/bank", {
            bank_name: this.bank_name,
            branch_name: this.branch_name,
            account_name: this.account_name,
            account_number: this.account_number,
            current_balance: this.current_balance,
            account_type: this.account_type,
            user_type: this.user_type,
          })
          .then((reponse) => {
            console.log(reponse);
            if (reponse.data.status == false) {
              if (reponse.data.errors.bank_name != undefined) {
                alert(reponse.data.errors.bank_name[0]);
              }
              if (reponse.data.errors.branch_name != undefined) {
                alert(reponse.data.errors.branch_name[0]);
              }
              if (reponse.data.errors.account_name != undefined) {
                alert(reponse.data.errors.account_name[0]);
              }
              if (reponse.data.errors.account_type != undefined) {
                alert(reponse.data.errors.account_type[0]);
              }
              if (reponse.data.errors.account_number != undefined) {
                alert(reponse.data.errors.account_number[0]);
              }
              if (reponse.data.errors.current_balance.length > 0) {
                alert(reponse.data.errors.current_balance[0]);
              }
            } else {
              this.getBank();
              this.$refs["save-modal"].hide();
            }
          })
          .catch((error) => {
            console.log("bank_id ", error);
          });
      }else{
          axios
          .put("/bank/"+this.id, {
            bank_name: this.bank_name,
            branch_name: this.branch_name,
            account_name: this.account_name,
            account_number: this.account_number,
            current_balance: this.current_balance,
            account_type: this.account_type,
            user_type: this.user_type,
          })
          .then((reponse) => {
            console.log(reponse);
            if (reponse.data.status == false) {
              if (reponse.data.errors.bank_name != undefined) {
                alert(reponse.data.errors.bank_name[0]);
              }
              if (reponse.data.errors.branch_name != undefined) {
                alert(reponse.data.errors.branch_name[0]);
              }
              if (reponse.data.errors.account_name != undefined) {
                alert(reponse.data.errors.account_name[0]);
              }
              if (reponse.data.errors.account_type != undefined) {
                alert(reponse.data.errors.account_type[0]);
              }
              if (reponse.data.errors.account_number != undefined) {
                alert(reponse.data.errors.account_number[0]);
              }
              if (reponse.data.errors.current_balance.length > 0) {
                alert(reponse.data.errors.current_balance[0]);
              }
            } else {
              this.getBank();
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
        .get("/bank/" + item.id + "/edit")
        .then((res) => {
          this.bank_name = res.data.bank_name;
          this.branch_name = res.data.branch_name;
          this.account_name = res.data.account_name;
          this.account_number = res.data.account_number;
          this.current_balance = res.data.current_balance;
          this.account_type = res.data.account_type;
          this.user_type = res.data.user_type;
          this.id = res.data.id;
          this.$refs["save-modal"].show();
          // this.getBank();
        })
        .catch((error) => {
          console.log("bank_id ", error);
        });
    },
    onDelete(item) {
      let confirmation = confirm("Are you sure to delete");
      if (confirmation) {
        axios
          .delete("/bank/" + item.id, item)
          .then(() => {
            this.getBank();
          })
          .catch((error) => {
            console.log("bank_id ", error);
          });
      }
    },
  },
  created() {
    this.getBank();
  },
  mounted() {
    //   console.log({router: this.$router});
    if (!token) {
      this.$router.push("/login");
      //  router.push('/login')
    }
  },
  acceptableSubmittion() {
    return this.bank_name.length > 0 &&
      this.branch_name.length > 0 &&
      this.account_name.length > 0 &&
      this.account_number.length > 0 &&
      this.current_balance.length > 0 &&
      this.account_type.length > 0
      ? false
      : true;
  },
};
</script>
