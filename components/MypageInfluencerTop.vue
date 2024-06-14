<template>
    <div class="mypage-nav-wrap">
        <div class="mypage-nav-list">
            <nuxt-link to="/mypage/influencer" :class="linkClass(['/mypage/influencer'])">
                마이
            </nuxt-link>
            <nuxt-link to="/mypage/influencer/applications?type=application" :class="linkClass(['/mypage/influencer/applications'])">
                캠페인
            </nuxt-link>
            <nuxt-link to="/mypage/influencer/users/edit" :class="linkClass(['/mypage/influencer/users/edit', '/mypage/influencer/users/editMore', '/mypage/influencer/users/editPassword'])">
                내 정보
            </nuxt-link>
            <nuxt-link to="/mypage/influencer/pointHistories" :class="linkClass(['/mypage/influencer/pointHistories', '/mypage/influencer/requestMonies', '/mypage/influencer/requestMonies/create'])">
                포인트
            </nuxt-link>
            <nuxt-link to="/mypage/influencer/qnas" :class="linkClass(['/mypage/influencer/qnas', '/mypage/influencer/qnas/create'])">
                고객센터
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import Form from "../utils/Form";
export default {
    data(){
        return {
            word: "",
            headerClass: "",
            activeHeader: true,
        }
    },

    methods: {
        linkClass(urls){
            let className = "mypage-nav";


            if(urls.some(url => location.pathname === url))
                className += " active";

            return className;
        }

    },

    computed: {

    },

    watch: {

    },

    mounted() {


    }
}
</script>
