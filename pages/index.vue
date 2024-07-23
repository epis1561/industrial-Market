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
      // if(/WEBVIEW/.test(navigator.userAgent)){
      //
      //     console.log('프로덕트이동')
      //     this.goProduct();
      // }
      // else{
      //     this.$router.push("/intro");
      // }
      this.goProduct();
  }
}
</script>
