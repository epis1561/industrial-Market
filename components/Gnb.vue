<template>
    <div class="container">
        <div class="gnb-wrap col-group">
            <nuxt-link to="/" class="gnb-item">
                <img src="/images/icon_home.png" alt="" class="icon">
                <p class="txt">
                    홈
                </p>
            </nuxt-link>
            <nuxt-link to="/chats" class="gnb-item">
                <div class="rela">
                    <div class="chat-num" v-if="$auth.user.data.count_unread_message <= 0">{{ $auth.user.data.count_unread_message }}</div>
                    <img src="/images/icon_chat.png" alt="" class="icon">
                    <p class="txt">
                        채팅
                    </p>
                </div>
            </nuxt-link>
            <a href="create.html" class="gnb-item">
                <img src="/images/icon_submit.png" alt="" class="icon">
                <p class="txt">
                    등록
                </p>
            </a>
            <a href="like_list.html" class="gnb-item">
                <img src="/images/icon_like.png" alt="" class="icon">
                <p class="txt">
                    관심
                </p>
            </a>
            <a href="mypage.html" class="gnb-item">
                <img src="/images/icon_mypage.png" alt="" class="icon">
                <p class="txt">
                    마이
                </p>
            </a>
        </div>
    </div>

</template>
<script>
import Form from "../utils/Form";

export default {
    props: ["item"],

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