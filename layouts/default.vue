<template>
    <div id="wrap">
<!--        <pops />-->

        <loading v-if="$store.state.loading" />

        <pop />

        <!-- 헤더 -->
        <header-vue />

        <!-- 페이지마다 바뀔 영역 -->
        <div class="wrap-inner">
            <Nuxt />
        </div>

        <!-- 푸터 -->
        <footer-vue />
    </div>

</template>
<style>
.page-enter-active, .page-leave-active {
    transition: opacity .3s ease-in-out;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
</style>
<script>
import HeaderVue from "../components/HeaderVue";
import FooterVue from "../components/FooterVue";
import TopNavs from "../components/TopNavs.vue";
import Form from "@/utils/Form";
export default {
    head() {
        return {
            script: [
         /*       {
                    hid: 'google-analytics',
                    src: 'https://www.googletagmanager.com/gtag/js?id=GTM-NNSD2QJX',
                    defer: true
                },
                {
                    hid: 'gtm-script',
                    src: 'https://www.googletagmanager.com/gtm.js?id=GTM-NNSD2QJX',
                    defer: true
                }*/
            ],
        }
    },

    data(){
        return {
            timer: null,
            form: new Form(this.$axios,{
                push_token: "",
            }),
            mannerForm: new Form(this.$axios,{
                type:"",
                // user_id:this.$auth.user.data.id,
            })

        }
    },

    components: {

    },

    computed:{

    },

    methods:{
        getPushToken(){
            let self = this;

            webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify({"action": "getpushid","callback": "get_pushid"}));

            this.$store.commit("setPushToken", localStorage.getItem('pushid'));

            if(this.$store.state.push_token) {

                this.form.push_token = this.$store.state.push_token;

                if(this.$auth.user){
                    this.form.patch("/api/users/updatePushToken")
                        .then(response => {
                            clearInterval(self.timer);
                            this.$auth.fetchUser();
                        })
                }
            }

        },

        getProductCategories(){
            this.$axios.get("/api/productCategories")
                    .then(response => {
                        this.$store.commit("setProductCategories", response.data);
                    });
        },

        getNoticeCategories(){
            this.$axios.get("/api/noticeCategories")
                    .then(response => {
                        this.$store.commit("setNoticeCategories", response.data);
                    });
        },
        getEvents(){
            this.$axios.get("/api/events", {}).then(response => {
                this.$store.commit("setEvents", response.data);
            })
        },
        getNotices(){
            this.$axios.get("/api/notices", {
            }).then(response => {
                this.$store.commit("setNotices", response.data);
            })
        },
        getCities(){
            this.$axios.get("/api/cities", {
            }).then(response => {
                this.$store.commit("setCities", response.data);
            })
        },
        getFaqCategories(){
            this.$axios.get("/api/faqCategories")
                    .then(response => {
                        this.$store.commit("setFaqCategories", response.data);
                    });
        },
        getUserLocation(){

        },
        getGoodManners(){
            this.mannerForm.type = 1
            this.$axios.get("/api/manners",{
                params: this.mannerForm.data(),
            }).then(response => {

                this.$store.commit("setGoodManners",response.data);
            })
        },
        getBadManners(){
            this.mannerForm.type = 0
            this.$axios.get("/api/manners",{
                params: this.mannerForm.data(),
            }).then(response => {

                this.$store.commit("setBadManners",response.data);
            })
        },
    },
    mounted() {
        this.getProductCategories();
        this.getNoticeCategories();
        this.getFaqCategories();
        this.getEvents();
        this.getNotices();
        this.getCities();
        this.getGoodManners();
        this.getBadManners();
        this.$store.dispatch("getCoords");
     /*   this.$store.dispatch("getCenterTypes");
      //아래처럼 푸시id 가져오는 구문 사용(웹페이지가 로딩되자마자 가져오는 방법사용)

        let self = this;

        if(!this.$store.state.push_token){
            this.timer = setInterval(() => {
                self.getPushToken();
            }, 3000)
        }*/


    }
}
</script>
