<template>
     <b-col cols="2">
        <b-list-group class="float-left" variant="primary">
          <b-list-group-item variant="dark"><router-link to="/bank"> Bank Info</router-link></b-list-group-item>
          <b-list-group-item variant="dark"><router-link to="/employee"> Employee Info</router-link></b-list-group-item>
          <b-list-group-item variant="dark"><router-link to="/salary"> Salary</router-link></b-list-group-item>
        </b-list-group>
      </b-col>
</template>
<script>

export default{
    name:'navbar'
}
</script>
