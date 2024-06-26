<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    채팅
                </h2>
                <button class="sub-header-btn search-btn">
                    <img src="images/icon_bell.png" alt="">
                </button>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-label-wrap col-group">
                <div class="label-item active">
                    전체
                </div>
                <div class="label-item">
                    내가올린글
                </div>
                <div class="label-item">
                    내가문의한글
                </div>
            </div>
            <div class="container" v-if="chattings.data.length==0">

                <!-- 채팅 내역 0개 -->
                <div class="null-txt chat-null-txt row-group">
                    <i class="icon"></i>
                    채팅 내역이 없습니다.
                </div>

                <div class="chat-list" v-if="chattings">
<!--                 <chat :item="targetUser"></chat>-->
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb"></div>
        <!-- gnb End -->
    </div>


</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default{


    data() {

        return {
            form: new Form(this.$axios, {

            }),
            chattings:{
                data:[],
                meta: {
                    current_page: 1,
                    last_page: 10,
                }
            }
        }

    },



    methods: {
        getChattings(){
            this.$axios.get("/api/chats", {

            }).then(response => {
                console.log(response.data.data);
                this.chattings = response.data.data;
            })
        },

    },

    computed: {
        targetUser(){

            // if(this.chattings.data.owner.id === this.$auth.user.data.id){
            //     return this.chattings.data.asker;
            // }
            // else if(this.chattings.data.asker.id === this.$auth.user.data.id){
            //     return this.chattings.data.owner;
            // }
        },
    },

    mounted() {
        this.getChattings();
    }
};
</script>
