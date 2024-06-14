<template>
    <div class="subpage">
        <div class="login join">
            <div class="login-find-pw-wrap login-find-idpw-wrap">
                <div class="container">
                    <div class="col-group">
                        <h2 class="find-id-tit pdbt40 mgbt24">
                            비밀번호 초기화
                        </h2>
                    </div>
                    <div class="login-form-list row-group">
                        <div class="form-input-wrap">
                            <input type="text" class="form-input" placeholder="이메일" v-model="form.email">
                        </div>

                        <input-verify-number :is-register="false" @verified="data => form.contact= data" />

                        <div class="form-input-wrap">
                            <input type="password" class="form-input" placeholder="비밀번호" v-model="form.password_new">
                        </div>

                        <div class="form-input-wrap">
                            <input type="password" class="form-input" placeholder="비밀번호 확인" v-model="form.password_new_confirmation">
                        </div>

                        <a href="#" class="login-btn" @click.prevent="store">
                            비밀번호 초기화
                        </a>
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
                password_new: "",
                password_new_confirmation: "",
                email: "",
                contact: "",
            }),
            verified: false,
        }
    },
    methods: {
        store(){
            this.$store.commit("setLoading", true);

            this.form.patch("/api/findPasswords")
                .then(response => {
                    /*this.$router.push("/users/resetPassword?token=" + response.data.token);
*/
                    this.$router.push("/users/successFindPassword");
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
