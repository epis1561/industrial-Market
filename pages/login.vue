<template>
    <div class="login-form">
        로그인  페이지
        <form @submit.prevent="login">
            <div class="inputs">
                <div class="input-text">
                    <input type="text" placeholder="아이디를 입력해주세요." v-model="form.ids">
                    <error :form="form" name="ids" />
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
.space-box {min-height:100vh;}
</style>
<script>
import Form from "../utils/Form";
export default {
    link: [
        {rel: 'stylesheet', href: '/css/developer.css'},

    ],
    layout: "empty",
    name: 'Login',
    auth: "guest",
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:"",
            })
        }
    },
    methods: {
        login(){
            // this.form.push_token = this.$store.state.push_token;

            this.$store.commit("setLoading", true);

            this.$auth.loginWith('laravelSanctum', {
                data: this.form.data()
            }).then(response => {
                if(this.$store.state.intendedUrl) {
                    this.$store.commit("setIntendedUrl", null);

                    return this.$router.push(this.$store.state.intendedUrl);
                }

                return this.$router.push("/");
            }).catch(error => {
                // this.form.onFail(error.response.data);
            });
        },

        ready(message = '심사준비중입니다.'){
            return alert(message);
        },

        clearLetter(){
            this.form.contact = this.form.contact.replace("-", "");
        }
    },

    computed: {

    },

    mounted() {
    }
}
</script>
