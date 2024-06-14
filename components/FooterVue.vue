<template>
    <footer class="footer" id="footer">
        <div class="ft_top">
            <div class="wrap">
                <div class="ft_top_list">
                    <nuxt-link to="/contents/privacyPolicy" class="ft_top_item">
                        개인정보처리방침
                    </nuxt-link>
                    <nuxt-link to="/contents/servicePolicy" class="ft_top_item">
                        이용약관
                    </nuxt-link>
                    <nuxt-link to="/faqs" class="ft_top_item">
                        고객센터
                    </nuxt-link>
                    <nuxt-link to="/mypage/company" class="ft_top_item" v-if="$auth.user && $auth.user.data.type === 'COMPANY'">
                        광고주 센터
                    </nuxt-link>
                    <nuxt-link to="/campaigns" class="ft_top_item">
                        상품소개
                    </nuxt-link>
                </div>
                <p class="copy_txt">
                    © 2024. 기프트인포 INC. all rights reserved.
                </p>
            </div>
        </div>
        <div class="ft_bottom wrap">
            <div class="ft_bottom_left">
                <img class="logo" src="/images/common/logo.svg" alt="CHERIVU 로고">
                <p>
                    서울특별시 중구 퇴계로45길 22-24 대박빌딩 6,7,8층<br>
                    사업자 등록번호 201-86-31022 | 대표자 김형택
                </p>
            </div>
            <div class="ft_bottom_right">
                <p>고객센터</p>
                <strong>02-500-5964</strong>
                <p>평일 09:00 ~ 18:00</p>
            </div>
        </div>
    </footer>
</template>
<script>
import NuxtLogo from "./NuxtLogo";

export default {
    components: {NuxtLogo},

    data() {
        return {}
    },

    methods: {
        top() {
            window.scrollTo({top: 0});
        },

        ready() {
            alert("준비중입니다.");
        },


    },

    watch: {
        '$route'(to, from) {

        }
    },

    mounted() {

    }
}
</script>
