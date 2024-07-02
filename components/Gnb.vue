<template>
    <div id="gnb">
    <div class="container">
        <div class="gnb-wrap col-group">
            <nuxt-link to="/" class="gnb-item active" v-if="home">
                <img src="/images/icon_home_active.png" alt="" class="icon">
                <p class="txt">
                    홈
                </p>
            </nuxt-link>
            <nuxt-link to="/" class="gnb-item"v-if="!home">
                <img src="/images/icon_home.png" alt="" class="icon">
                <p class="txt">
                    홈
                </p>
            </nuxt-link>
            <nuxt-link to="/chats" class="gnb-item active" v-if="chat">
                <div class="rela">
                    <div class="chat-num" v-if="$auth.user.data.count_unread_message <= 0">{{ $auth.user.data.count_unread_message }}</div>
                    <img src="/images/icon_chat_active.png" alt="" class="icon">
                    <p class="txt">
                        채팅
                    </p>
                </div>
            </nuxt-link>
            <nuxt-link to="/chats" class="gnb-item" v-if="!chat">
                <div class="rela">
                    <div class="chat-num" v-if="$auth.user.data.count_unread_message <= 0">{{ $auth.user.data.count_unread_message }}</div>
                    <img src="/images/icon_chat.png" alt="" class="icon">
                    <p class="txt">
                        채팅
                    </p>
                </div>
            </nuxt-link>
            <nuxt-link to="/products/create" class="gnb-item">
                <img src="/images/icon_submit.png" alt="" class="icon">
                <p class="txt">
                    등록
                </p>
            </nuxt-link>
            <nuxt-link to="/like" class="gnb-item active" v-if="like">
                <img src="/images/icon_like_active.png" alt="" class="icon">
                <p class="txt">
                    관심
                </p>
            </nuxt-link>
            <nuxt-link to="/like" class="gnb-item" v-if="!like">
                <img src="/images/icon_like.png" alt="" class="icon">
                <p class="txt">
                    관심
                </p>
            </nuxt-link>
            <nuxt-link to="/mypage" class="gnb-item active" v-if="mypage">
                <img src="/images/icon_mypage_active.png" alt="" class="icon">
                <p class="txt">
                    마이
                </p>
            </nuxt-link>
            <nuxt-link to="/mypage" class="gnb-item" v-if="!mypage">
                <img src="/images/icon_mypage.png" alt="" class="icon">
                <p class="txt">
                    마이
                </p>
            </nuxt-link>
        </div>
    </div>
    </div>
</template>
<script>
import Form from "../utils/Form";

export default {
    props: ["home","chat","like","mypage"],

    data() {
        return {}
    },

    methods: {},

    computed: {},

    watch: {},

    mounted() {

    }
}
</script>