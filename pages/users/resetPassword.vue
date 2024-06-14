<template>
    <div class="find-account-wrap">
        <a href='/' class="logo">
            <img src="/images/LOGO.svg" alt="" />
        </a>
        <div class="signup-wrap find-account">
            <div class="signup-form">
                <div class="title-wrap">
                    <h2 class="title">
                        비밀번호 변경
                    </h2>
                    <p class="sub-title">
                        새로운 비밀번호를 등록해 주세요
                    </p>
                </div>
                <div class="form-list row-group">
                    <div class="form-item row-group">
                        <div class="item-user row-group pw">
                            <input type="password" placeholder='새로운 비밀번호를 입력해주세요' class='form-input' v-model="form.password_new"><!-- 유효성 검사 실패 시 error 클래스 -->
                            <input type="password" placeholder='비밀번호 확인' class='form-input' v-model="form.password_new_confirmation"><!-- 유효성 검사 실패 시 error 클래스 -->

                            <error :form="form" name="password_new" />
                            <error :form="form" name="password_new_confirmation" />
                        </div>
                    </div>
                </div>
                <div class="btn-wrap col-group">
                    <a href="#" class='submit-btn' @click.prevent="store">
                        비밀번호 변경
                    </a>
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
                password_new: "",
                password_new_confirmation: "",
                token: this.$route.query.token,
            }),
        }
    },
    methods: {
        store(){
            this.form.patch("/api/findPasswords")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "초기화 성공",
                        description: "비밀번호가 초기화되었습니다."
                    });

                    this.$router.push(`/users/successFindPassword`);
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
