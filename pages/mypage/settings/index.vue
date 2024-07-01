<template>

    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    설정
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="mypage-menu-container row-group">
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        알림
                    </p>
                    <div class="mypage-menu-list row-group">
                        <nuxt-link to="/mypage/settings/notification" class="mypage-menu-item col-group">
                            <p class="title">
                                알림설정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        계정
                    </p>
                    <div class="mypage-menu-list row-group">
                        <a href="mypage_profile.html" class="mypage-menu-item col-group">
                            <p class="title">
                                프로필 수정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <a href="mypage_account.html" class="mypage-menu-item col-group">
                            <p class="title">
                                계정 정보 수정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <a href="" class="mypage-menu-item col-group">
                            <p class="title">
                                로그아웃
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <a href="mypage_withdrawal.html" class="mypage-menu-item col-group">
                            <p class="title">
                                회원탈퇴
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        사용자 설정
                    </p>
                    <div class="mypage-menu-list row-group">
                        <a href="mypage_block.html" class="mypage-menu-item col-group">
                            <p class="title">
                                차단 사용자 관리
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <a href="mypage_keywords.html" class="mypage-menu-item col-group">
                            <p class="title">
                                관심 키워드 설정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        이용약관
                    </p>
                    <div class="mypage-menu-list row-group">
                        <a href="" class="mypage-menu-item col-group">
                            <p class="title">
                                이용약관
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <a href="" class="mypage-menu-item col-group">
                            <p class="title">
                                개인정보처리방침
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <a href="" class="mypage-menu-item col-group">
                            <p class="title">
                                위치기반 서비스 이용약관
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
        </div>
        <!-- gnb End -->
    </div>
    </body>

</template>
<script>
import Form from "@/utils/Form";
export default {

    data() {
        return {
            form: new Form(this.$axios, {

            }),

        };
    },

    methods: {

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