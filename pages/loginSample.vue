<template>
    <div id="wrap">
        <main class="login_intro">

            <div class="container row-group">

                <div class="login-header">
                    <img src="/images/LOGO_intro.png" alt="" class="logo">
                    <p class="txt">
                        산업용 모든 중고물품 거래 장터 <br>
                        산업마켓입니다
                    </p>
                </div>

                <div class="sns-login-wrap">
                    <a :href="`${this.$store.state.domain}/openLoginPop/naver`" class="sns-login-item naver">
                        <img src="/images/icon_naver.png" alt="" class="icon">
                        <p class="txt">
                            네이버 계정으로 로그인
                        </p>
                    </a>
                    <a :href="`${this.$store.state.domain}/openLoginPop/kakao`" class="sns-login-item kakao">
                        <img src="/images/icon_kakao.png" alt="" class="icon">
                        <p class="txt">
                            카카오 계정으로 로그인
                        </p>
                    </a>
                    <a :href="`${this.$store.state.domain}/openLoginPop/google`" class="sns-login-item google" @click.prevent="ready">
                        <img src="/images/icon_google.png" alt="" class="icon">
                        <p class="txt">
                            Google 계정으로 로그인
                        </p>
                    </a>
                    <a :href="`${this.$store.state.domain}/openLoginPop/apple`" class="sns-login-item apple" @click.prevent="ready">
                        <img src="/images/icon_apple.png" alt="" class="icon">
                        <p class="txt">
                            Apple 계정으로 로그인
                        </p>
                    </a>
                </div>
            </div>



        </main>
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
        login(){

        },

        ready(){
            alert("준비중입니다. 카카오 로그인으로 이용해주세요.");
        }

    },

    computed: {

    },

    mounted() {
        let pushToken = localStorage.getItem("push_token");

        if(this.$route.query.token){
            this.$auth.loginWith('laravelSanctum', {
                data: {
                    token: this.$route.query.token,
                    push_token : pushToken
                }
            }).then(response => {
                return this.$router.push("/");
            }).catch((e) => {
                alert("소셜로그인에 실패하였습니다. 잠시 후 재시도해주세요.");

                return this.$router.push("/");
            })
        }
    }
}
</script>
