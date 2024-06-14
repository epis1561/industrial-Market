<template>
    <div class="mypage-nav-wrap">
        <div class="mypage-nav-list" v-if="!$auth.user.data.user_id">
            <nuxt-link to="/mypage/company" :class="linkClass(['/mypage/company'])">
                대시보드
            </nuxt-link>
            <nuxt-link to="/mypage/company/campaigns" :class="linkClass(['/mypage/company/campaigns'])">
                캠페인 리스트
            </nuxt-link>
            <nuxt-link to="/mypage/company/users/edit" :class="linkClass(['/mypage/company/users/edit', '/mypage/company/users/editMore', '/mypage/company/users/editPassword'])">
                회원정보
            </nuxt-link>
            <nuxt-link to="/mypage/company/orders" :class="linkClass(['/mypage/company/orders', '/mypage/company/products'])">
                결제
            </nuxt-link>
            <nuxt-link to="/mypage/company/penalties" :class="linkClass(['/mypage/company/penalties', '/mypage/company/penalties/create'])">
                패널티
            </nuxt-link>
            <nuxt-link to="/mypage/company/likes/applications" :class="linkClass(['/mypage/company/likes/applications'])">
                관심 인플루언서
            </nuxt-link>
            <nuxt-link to="/mypage/company/pointHistories" :class="linkClass(['/mypage/company/pointHistories', '/mypage/company/requestMonies', '/mypage/company/requestMonies/create'])">
                포인트
            </nuxt-link>
            <nuxt-link to="/mypage/company/qnas" :class="linkClass(['/mypage/company/qnas', '/mypage/company/qnas/create'])">
                고객센터
            </nuxt-link>
            <nuxt-link to="/mypage/company/members" :class="linkClass(['/mypage/company/members'])">
                직원관리
            </nuxt-link>
        </div>

        <div class="mypage-nav-list" v-else>
            <nuxt-link to="/mypage/company/visits" :class="linkClass(['/mypage/company/visits'])">
                방문 목록
            </nuxt-link>
        </div>

        <div class="campaign-create-btn-wrap" v-if="!$auth.user.data.user_id">
            <nuxt-link to="/campaigns/create" class="campaign-create-btn">
                <p class="txt">새 캠페인 등록</p>
                <i class="xi-pen"></i>
            </nuxt-link>
            <div class="campaign-create-info">
                <p class="title">
                    캠페인 등록이 처음이신가요?
                </p>
                <p class="txt">
                    캠페인 미션이 생소하시거나 <br>
                    이미지를 제공하기 어려우신 경우 <br>
                    체리뷰에 문의해보세요.
                </p>
            </div>
            <a href="tel:02-500-5964" class="contact col-group">
                02-500-5964
                <i class="xi-angle-right"></i>
            </a>
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
        if(this.$auth.user.data.user_id)
            return this.$router.push("/mypage/company/visitApplications");
    }
}
</script>
