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
                    채팅
                </h2>
                <button class="sub-header-btn search-btn" :class="{'active' : $auth.user.data.count_unread_message!=0}" @click="$router.push('/alarms')">
                    <img src="/images/icon_bell.png" alt="">
                </button>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-label-wrap col-group">
                <div class="label-item" :class="{'active': isMy==='전체'}" @click="changeMy('전체')">
                    전체
                </div>
                <div class="label-item" :class="{'active': isMy==='내가올린글'}" @click="changeMy('내가올린글')">
                    판매
                </div>
                <div class="label-item" :class="{'active': isMy==='내가문의한글'}" @click="changeMy('내가문의한글')">
                    구매
                </div>
            </div>
            <div class="container">

                <!-- 채팅 내역 0개 -->
                <div class="null-txt chat-null-txt row-group" v-if="chattings.data.length==0">
                    <i class="icon"></i>
                    채팅 내역이 없습니다.
                </div>

                <div class="chat-list" v-else>
                    <chat item=chatting v-for="chatting in chattings.data" :key="chatting.id" />
                </div>
            </div>

        </main>


        <!-- gnb Start -->

        <gnb chat="isChat"></gnb>
        <!-- gnb End -->
    </div>


</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default{
    middleware: ["user"],
    load: false,

    data() {

        return {
            form: new Form(this.$axios, {
                page: 1,
                product_id:"",
            }),

            chattings: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",

                },
            },

            isMy: "전체",
            isChat:true,
        }

    },



    methods: {
        getChats(loadMore){
            this.$store.commit("setLoading",true);
            
            if(this.$route.query.product_id)
                this.form.product_id = this.$route.query.product_id;

            this.$axios.get("/api/chats", {
                params: this.form.data(),
            }).then(response => {

                if(loadMore) {

                    this.chattings.data = [...this.chattings.data, ...response.data.data];
                    this.load = false;
                }
                else{

                    this.chattings = response.data;
                    console.log(this.chattings);
                }

            })
        },


        loadMore(){
            var scrollTop = $('.subpage').scrollTop();

            var innerHeight = $('.subpage').innerHeight();

            var scrollHeight = $('.subpage').prop('scrollHeight');

            if (this.load || this.form.page >= this.chattings.meta.last_page) {
                return;
            }


            if (scrollTop + innerHeight >= scrollHeight - 100) {
                this.load = true;
                this.form.page += 1;


                if(this.isMy =="전체"){
                   return this.getChats(this.load);
                }
                else if(this.isMy =="내가쓴글"){

                   return this.getMyChat(this.load);
                }
                else if(this.isMy == "문의한글"){
                   return this.getAskChat(this.load);
                }
                // if(내가올린글 클릭 시 isMy=2, 내가문의한글 클릭시 isMy=3, 전체는 isMy=1)
            };

        },
        scroll(){
            $('.subpage').scroll(this.loadMore);
        },
        getMyChat(loadMore){
            this.$store.commit("setLoading",true);
            this.$axios.get("/api/chats/indexByOwner", {
                params: this.form.data(),
            }).then(response => {
                console.log(response.data);
                if(loadMore) {
                    this.chattings.data = [...this.chattings.data, ...response.data.data];
                    this.load = false;
                }
                else{

                    this.chattings = response.data;

                }

            })
        },
        getAskChat(loadMore){

            this.$store.commit("setLoading",true);
            this.$axios.get("/api/chats/indexByAsker", {
                params: this.form.data(),
            }).then(response => {

                if(loadMore) {

                    this.chattings.data = [...this.chattings.data, ...response.data.data];
                    this.load = false;

                }
                else{

                    this.chattings = response.data;

                }

            })
        },
        changeMy(text){
            this.isMy= text;
            if(this.isMy==='전체'){
                this.load= false;
                this.form.page=1;
                this.chattings = "";
                return this.getChats();
            }
            else if(this.isMy==='내가올린글'){
                this.load= false;
                this.form.page=1;
                this.chattings = "";
                return this.getMyChat();
            }
            else{
                this.load= false;
                this.form.page=1;
                this.chattings = "";
                return this.getAskChat();
            }
        },

    },

    computed: {

    },

    mounted() {
        this.getChats(false);
        this.scroll();
    }
};
</script>
