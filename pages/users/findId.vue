<template>
    <div class="subpage">
        <div class="login join">
            <div class="login-find-id-wrap login-find-idpw-wrap">
                <div class="container">
                    <div class="col-group">
                        <h2 class="find-id-tit pdbt40 mgbt24">
                            아이디 찾기
                        </h2>
                    </div>
                    <div class="login-form-list row-group">
                        <input-verify-number @verified="data => form.contact = data" :is-register="false"/>
                        <!-- //인증번호 클릭 시 보이기 -->

                        <a href="#" class="login-btn" @click.prevent="store">
                            아이디 찾기
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
                contact: "",
                name: "",
            }),
        }
    },
    methods: {
        store(){
            this.form.post("/api/findIds")
                .then(response => {
                    this.$router.push({
                        path: "/users/successFindId",
                        query: {
                            email: response.data.email
                        }
                    });
                });
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
