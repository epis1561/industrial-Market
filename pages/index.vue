<template>
  <div class="login-form">
    로그인  페이지
    <form @submit.prevent="login">
      <div class="inputs">
        <div class="input-text">
          <input type="text" placeholder="아이디를 입력해주세요." v-model="form.email">
          <error :form="form" name="email" />
        </div>
        <div class="input-text">
          <input type="password" placeholder="비밀번호를 입력해주세요." v-model="form.password">
          <error :form="form" name="password" />
        </div>

        <button class="btn" type="submit">Login</button>
      </div>
    </form>
  </div>
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
