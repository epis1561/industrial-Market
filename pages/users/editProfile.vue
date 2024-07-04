<template>

    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    프로필 수정
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="form-wrap row-group">

                    <input-avatar :multiple="0" @change="(data) => {form.img = data;}" :default="user.img ? user.img:''"/>

                    <div class="form-item row-group">
                        <div class="item-default">닉네임</div>
                        <div class="item-user">
                            <input type="text" class="form-input" :value="user.nickname">
                        </div>
                    </div>
                    <div class="form-footer">
                        <button class="form-footer-btn submit-btn" @click="update">프로필 수정</button>
                    </div>
                </div>
            </div>
        </main>
    </div>

</template>
<script>
import Form from "@/utils/Form";
export default {

    data() {
        return {
            form: new Form(this.$axios, {
                nickname:"12312321",
                img:[],
            }),

        };
    },

    methods: {


        update(){
            this.$store.commit("setLoading", true);
            this.form.patch("/api/users/updateProfile")
                    .then(response => {
                        console.log(123);
                        this.$auth.fetchUser();
                        this.$router.back();
                    });
        }
    },

    computed: {
        user(){
            return this.$auth.user.data;
        }
    },
    watch: {

    },
    mounted() {


    }
}
</script>