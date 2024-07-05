<template>
    <div>
        <div class="toggle-bar"><i class="xi-bars toggle-btn"></i></div>
        <div class="header-wrap" v-if="activeHeader">
            <h3 class="logo" style="padding:30px 20px; font-size:24px; text-align: center; color:#fff;">관리자</h3>
            <!--        <img src="/images/logo.png" alt="" class="header-logo">-->

            <div class="menu-wrap row-group">
                <div class="gnb">
                    <div class="gnb-item">
                        <div class="item-default">
                            <i class="xi-home"></i>
                            홈페이지 관리
                            <i class="xi-angle-down-thin"></i>
                        </div>
                        <div class="sub-gnb row-group">
                            <nuxt-link to="/admin/banners" class="sub-gnb-item">
                                메인배너
                            </nuxt-link>
                            <nuxt-link to="/admin/groups" class="sub-gnb-item">
                                추천 캠페인
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <i class="xi-user"></i>
                            회원 관리
                            <i class="xi-angle-down-thin"></i>
                        </div>
                        <div class="sub-gnb row-group">
                            <nuxt-link to="/admin/influencers" class="sub-gnb-item">
                                인플루언서
                            </nuxt-link>
                            <nuxt-link to="/admin/companies" class="sub-gnb-item">
                                광고주
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <i class="xi-cart"></i>
                            캠페인 관리
                            <i class="xi-angle-down-thin"></i>
                        </div>
                        <div class="sub-gnb row-group">
                            <nuxt-link to="/admin/campaigns" class="sub-gnb-item">
                                캠페인
                            </nuxt-link>
                            <nuxt-link to="/admin/applications" class="sub-gnb-item">
                                지원내역
                            </nuxt-link>
                            <nuxt-link to="/admin/reviews" class="sub-gnb-item">
                                후기
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <i class="xi-money"></i>
                            주문/결제 관리
                            <i class="xi-angle-down-thin"></i>
                        </div>
                        <div class="sub-gnb row-group">
                            <nuxt-link to="/admin/orders" class="sub-gnb-item">
                                구매내역
                            </nuxt-link>
                            <nuxt-link to="/admin/requestMonies" class="sub-gnb-item">
                                출금신청
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <i class="xi-forum"></i>
                            고객센터 관리
                            <i class="xi-angle-down-thin"></i>
                        </div>
                        <div class="sub-gnb row-group">
                            <nuxt-link to="/admin/notices" class="sub-gnb-item">
                                공지사항
                            </nuxt-link>
                            <nuxt-link to="/admin/communities" class="sub-gnb-item">
                                커뮤니티
                            </nuxt-link>
                            <nuxt-link to="/admin/faqs" class="sub-gnb-item">
                                FAQ
                            </nuxt-link>
                            <nuxt-link to="/admin/qnas" class="sub-gnb-item">
                                1:1 문의
                            </nuxt-link>
                            <nuxt-link to="/admin/penalties" class="sub-gnb-item">
                                패널티
                            </nuxt-link>
                            <nuxt-link to="/admin/reports" class="sub-gnb-item">
                                신고내역
                            </nuxt-link>
                            <nuxt-link to="/admin/requestPremiums" class="sub-gnb-item">
                                프리미어 신청
                            </nuxt-link>
                        </div>

                    </div>

                </div>

                <div class="header-btm">
                    <p class="copy-txt">
                        Copyright 2024 산업마켓 <br>
                        All rights reserved
                    </p>
                    <a href="#" class="logout-btn" @click.prevent="logout">
                        <i class="xi-log-out"></i>
                        로그아웃
                    </a>
                </div>
            </div>
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
        logout(){
            this.$auth.logout();

            location.href="/admin/login";
        },

    },

    computed: {

    },

    watch: {
        '$route'(to, from) {
            this.activeHeader = this.$route.path === "/admin/login" ? false : true;

            setTimeout(function(){
                $('.gnb-item').unbind("click").bind("click",function(){
                    $(this).toggleClass('active');
                });
            },10);

            $('.header-wrap').removeClass('active');
        }
    },

    mounted() {
        this.activeHeader = this.$route.path === "/admin/login" ? false : true;

        this.$nextTick(() => {
            $('.gnb-item').unbind("click").bind("click",function(){
                $(this).toggleClass('active');
            });

            $('.toggle-btn').click(function(){
                $('.header-wrap').toggleClass('active');
            });
        });
    }
}
</script>
