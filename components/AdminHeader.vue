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
                            <nuxt-link to="/admin/products" class="sub-gnb-item">
                                제품
                            </nuxt-link>
                        </div>
                        <div class="sub-gnb row-group">

                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/users" class="sub-gnb-item">
                                사용자
                            </nuxt-link>
                        </div>
                        <div class="sub-gnb row-group">

                        </div>
                    </div>


                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/alarms" class="sub-gnb-item">
                                알람
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/events" class="sub-gnb-item">
                                이벤트
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/faqs" class="sub-gnb-item">
                                자주묻는질문
                            </nuxt-link>
                        </div>

                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/notices" class="sub-gnb-item">
                                공지사항
                            </nuxt-link>

                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/qnas" class="sub-gnb-item">
                                QNA
                            </nuxt-link>

                        </div>
                    </div>
                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/chats" class="sub-gnb-item">
                                채팅내역
                            </nuxt-link>

                        </div>
                    </div>
                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/reports" class="sub-gnb-item">
                                신고내역
                            </nuxt-link>

                        </div>
                    </div>

                    <div class="gnb-item">
                        <div class="item-default">
                            <nuxt-link to="/admin/settings" class="sub-gnb-item">
                                최소금액세팅
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
