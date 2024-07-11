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
                <button class="sub-header-btn search-btn" :class="{'active' : user.has_unread_alarm > 0}"
                        @click="$router.push('/alarms')">
                    <img src="/images/icon_bell.png" alt="">
                </button>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-label-wrap col-group">
                <div class="label-item" :class="{'active': url==='/api/chats'}" @click="url = '/api/chats'">
                    전체
                </div>
                <div class="label-item" :class="{'active': url==='/api/chats/indexByOwner'}" @click="url = '/api/chats/indexByOwner'">
                    판매
                </div>
                <div class="label-item" :class="{'active': url==='/api/chats/indexByAsker'}" @click="url = '/api/chats/indexByAsker'">
                    구매
                </div>
            </div>
            <div class="container">

                <!-- 채팅 내역 0개 -->
                <div class="null-txt chat-null-txt row-group" v-if="chats.data.length==0">
                    <i class="icon"></i>
                    채팅 내역이 없습니다.
                </div>

                <div class="chat-list" v-else>
                    <chat :item="chat" v-for="chat in chats.data" :key="chat.id"/>

                    <infinite-scroll v-if="chats.meta" :loading="loading" :form="form" :meta="chats.meta" :target-contents="'.chat-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getChats(true);}"/>
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

export default {
    middleware: ["user"],
    load: false,

    data() {

        return {
            form: new Form(this.$axios, {
                page: 1,
                product_id: "",
            }),

            chats: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                },
            },

            url: "/api/chats",

            loading: false,
        }

    },


    methods: {
        getChats(loadMore = false) {
            this.$store.commit("setLoading", true);

            this.loading = true;

            if (this.$route.query.product_id)
                this.form.product_id = this.$route.query.product_id;

            this.$axios.get(this.url, {
                params: this.form.data(),
            }).then(response => {
                this.loading = false;

                if (loadMore) {
                    this.chats.data = [...this.chats.data, ...response.data.data];

                    return this.chats.meta = response.data.meta;
                }

                this.chats = response.data;
            })
        },
    },

    computed: {
        user() {
            return this.$auth.user.data;
        }
    },

    watch: {
        url: {
            handler(){
                this.form.page = 1;

                this.getChats();
            }
        }
    },

    mounted() {
        this.getChats(false);
    }
};
</script>
