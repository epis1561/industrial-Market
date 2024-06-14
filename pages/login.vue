<template>
    <div class="subpage">
        <div class="login row-group">
            <div class="login-wrap">
                <div class="container">
                    <img src="/images/logo.svg" alt="" class="logo">

                    <form class="login-form-list row-group" @submit.prevent="login">
                        <input type="text" class="form-input" placeholder="이메일" v-model="form.email">
                        <error :form="form" name="email" />

                        <input type="password" class="form-input" placeholder="비밀번호" v-model="form.password">
                        <error :form="form" name="password" />

                        <div class="login-form-footer col-group">
                            <label for="auto">
                                <input type="checkbox" class="form-checkbox" id="auto">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        자동로그인
                                    </p>
                                </div>
                            </label>

                            <div class="find-account-link-wrap col-group">
                                <nuxt-link to="/users/findId" class="find-account-link">
                                    아이디 찾기
                                </nuxt-link>
                                <nuxt-link to="/users/findPassword" class="find-account-link">
                                    비밀번호 찾기
                                </nuxt-link>
                            </div>
                        </div>
                        <button type="submit" class="login-btn">
                            로그인
                        </button>
                    </form>

                    <!--
                    <div class="sns-login">
                        <div class="login-title-wrap">
                            <p class="sub-title">
                                간편 로그인이 필요하신가요?
                            </p>
                            <p class="title">
                                <strong>SNS 계정 로그인</strong>
                            </p>
                        </div>
                        <div class="sns-login-list col-group">
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_kakao.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_naver.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_facebook.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_apple.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_google.png" alt="">
                            </button>
                        </div>
                    </div>
                    -->
                </div>
            </div>

            <nuxt-link to="/users/create" class="login-wrap login-join-wrap">
                <div class="container col-group">
                    <div class="login-title-wrap">
                        <p class="sub-title">
                            체험하고 리뷰하는 경험을 해보세요!
                        </p>
                        <p class="title">
                            아직 <strong>체리뷰 회원</strong>이 아니신가요?
                        </p>
                    </div>
                    <i class="xi-arrow-right icon"></i>
                </div>
            </nuxt-link>

            <div class="login-title-wrap center">
                <p class="sub-title">
                    광고주 고객이신가요?
                </p>
                <nuxt-link to="/users/create?type=COMPANY" class="title link">
                    사업자 회원가입 바로가기
                </nuxt-link>
            </div>
        </div>
    </div>


</template>
<style>
.space-box {min-height:100vh;}
</style>
<script>
import Form from "../utils/Form";
export default {
    layout: "empty",
    name: 'Login',
    auth: "guest",
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:"",
                push_token: "",
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
                this.form.onFail(error.response.data);
            });

            /*this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.form.post("/api/login")
                    .then(response => {
                        this.$axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

                        this.$store.commit("setToken", response.data.token);
                        this.$store.commit("setUser", response.data.user);

                        console.log(this.$store.state.user);
                    })
                    .catch(error => {

                    })
            });*/
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
