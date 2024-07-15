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
                    <a :href="`${this.$store.state.domain}/openLoginPop/naver`" class="sns-login-item naver"  @click.prevent="ready">
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
                    <a :href="`${this.$store.state.domain}/openLoginPop/google`" class="sns-login-item google" @click.prevent="socialLogin('google')">

                        <img src="/images/icon_google.png" alt="" class="icon">
                        <p class="txt">
                            Google 계정으로 로그인
                        </p>
                    </a>
                    <a :href="`${this.$store.state.domain}/openLoginPop/apple`" class="sns-login-item apple" @click.prevent="socialLogin('apple')">
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
        },

        socialLogin(social){
            if(/WEBVIEW/.test(navigator.userAgent)) {
                if(social === 'google') {
                    return window.postMessage(JSON.stringify({key: 'GOOGLE_LOGIN'}));
                }
            }

            if(/WEBVIEW/.test(navigator.userAgent)) {
                if(social === 'apple') {
                    return window.postMessage(JSON.stringify({key: 'APPLE_LOGIN'}));
                }
            }

            return location.href = `${this.$store.state.domain}/openLoginPop/` + social;
        }

    },

    computed: {

    },

    mounted() {
        let pushToken = localStorage.getItem("push_token");

        if(this.$route.query.token){
            this.$store.commit("setLoading", true);

            this.$auth.loginWith('laravelSanctum', {
                data: {
                    token: this.$route.query.token,
                    push_token : pushToken
                }
            }).then(response => {
                localStorage.setItem("token", this.$route.query.token);

                return this.$router.push("/");
            }).catch((e) => {
                alert("소셜로그인에 실패하였습니다. 잠시 후 재시도해주세요.");

                return this.$router.push("/");
            })
        }
        navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    // 사용자의 정확한 위치 정보(latitude, longitude 등)을 얻을 수 있음
                    console.log('성공');
                },
                error => {
                    console.error('Error fetching geolocation', error);
                    // 위치 정보를 가져오지 못했을 때 처리할 로직
                }
        );
    }
}
</script>
