<template>
    <div id="wrap">
        <main id="main" class="login_page">
            <form @submit.prevent="login" class="login_wrap">
                <div class="LOGO_wrap" style="display: flex; align-items: center; justify-content: center;">
                    <img src="/images/logo_color.png" alt="">
                </div>

                <div class="login_input_wrap">
                    <input type="text" name="" id="" placeholder="ID" v-model="form.email">
                    <error :form="form" name="email" />

                    <input type="password" name="" id="" placeholder="PASSWORD" v-model="form.password">
                    <error :form="form" name="password" />
                </div>

                <button type="submit" class="login_btn" @click.prevent="login">로그인</button>

                <div class="coworkerweb_logo_Wrap">
                    <img src="/admin/images/coworkerweb_logo.svg" alt="">
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import Form from "@/utils/Form";
export default {
    layout: "admin",
    name: 'Login',
    auth: "guest",
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:"",
                type: "ADMIN"
            })
        }
    },
    methods: {
        login(){
            this.$auth.loginWith('laravelSanctum', {
                data: this.form.data(),
            }).then(response => {
                this.$router.push("/admin/products/");
            }).catch(error => {
                this.form.onFail(error.response.data);
            });

        }
    }
}
</script>
