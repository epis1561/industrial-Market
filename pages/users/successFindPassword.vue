<template>
    <div class="subpage">
        <div class="login join">
            <div class="login-find-id-wrap find-done login-find-idpw-wrap">
                <div class="container">
                    <div class="col-group">
                        <h2 class="find-id-tit pdbt40 mgbt24">
                            비밀번호 찾기
                        </h2>
                    </div>
                    <div class="login-form-list row-group">
                        <p class="title">
                            <strong>비밀번호를 재설정했습니다.</strong>
                        </p>
                        <p class="sub-title">
                            재설정한 비밀번호로 로그인해주세요!
                        </p>
                        <div class="btn_wrap pdt40">
                            <nuxt-link to="/login" class="login-btn">로그인 페이지로 이동</nuxt-link>
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
