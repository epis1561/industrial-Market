<template>

</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {
   name: 'Login',
   auth: "guest",
   layout: "empty",
  head(){
    return {
      link: [
        {rel: 'stylesheet', href: '/css/developer.css'},

      ],
    }
  },
  data(){
    return {
      form : new Form(this.$axios, {
        email:"",
        password:"",
      })
    }
  },
  methods: {
   goProduct() {
       this.$router.push("/products")
   }




  },

  computed: {

  },

  mounted() {
       this.goProduct();
  }
}
</script>
