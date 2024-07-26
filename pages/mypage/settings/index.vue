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
                        <nuxt-link to="/users/editAlarm" class="mypage-menu-item col-group">
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
                        <nuxt-link to="/users/editProfile" class="mypage-menu-item col-group">
                            <p class="title">
                                프로필 수정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                        <nuxt-link to="/users/editAccount" class="mypage-menu-item col-group">
                            <p class="title">
                                계정 정보 수정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                        <a href="#" class="mypage-menu-item col-group" @click.prevent="logout">
                            <p class="title">
                                로그아웃
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </a>
                        <nuxt-link to="/users/remove" class="mypage-menu-item col-group">
                            <p class="title">
                                회원탈퇴
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        사용자 설정
                    </p>
                    <div class="mypage-menu-list row-group">
                        <nuxt-link to="/mypage/blocks" class="mypage-menu-item col-group">
                            <p class="title">
                                차단 사용자 관리
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                        <nuxt-link to="/keywords" class="mypage-menu-item col-group">
                            <p class="title">
                                관심 키워드 설정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        이용약관
                    </p>
                    <div class="mypage-menu-list row-group">
                        <nuxt-link to="/contents/servicePolicy" class="mypage-menu-item col-group">
                            <p class="title">
                                이용약관
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                        <nuxt-link to="/contents/privacyPolicy" class="mypage-menu-item col-group">
                            <p class="title">
                                개인정보처리방침
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                        <nuxt-link to="/contents/locationPolicy" class="mypage-menu-item col-group">
                            <p class="title">
                                위치기반 서비스 이용약관
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>

        </main>

        <!-- gnb Start -->

            <gnb :mypage="isMy"/>

        <!-- gnb End -->
    </div>


</template>
<script>
import Form from "@/utils/Form";
export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {

            }),
            isMy:true,
        };
    },

    methods: {
                logout(){
                    this.$auth.logout();
                    this.$router.push("/login")
                }
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