<template>
    <div class="subpage">
        <div class="login join">
            <div class="login-find-id-wrap find-done login-find-idpw-wrap">
                <div class="container">
                    <div class="col-group">
                        <h2 class="find-id-tit pdbt40 mgbt24">
                            아이디 찾기
                        </h2>
                    </div>
                    <div class="login-form-list row-group">
                        <p class="title">
                            <strong>회원님의 아이디는 {{$route.query.email}} 입니다.</strong>
                        </p>
                        <p class="sub-title">
                            해당 아이디로 로그인을 해주세요.
                        </p>
                        <div class="btn_wrap pdt40">
                            <nuxt-link to="/users/findPassword" class="find-password-btn">
                                비밀번호 찾기
                            </nuxt-link>
                            <nuxt-link to="/login" class="login-btn">로그인</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import Form from "../../utils/Form";
export default {

    data(){
        return {
            form : new Form(this.$axios, {

            }),
        }
    },
    methods: {


    },

    computed: {

    },

    mounted() {
    }
}
</script>
