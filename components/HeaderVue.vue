<template>
    <header class="header" id="header">
        <nav id="gnb">
            <a href="#" class="gnb_prev_btn" @click.prevent="() => $router.back()">
                <i class="xi-angle-left"></i>
            </a>
            <div class="gnb_left">
                <h1 class="logo">
                    <nuxt-link to="/">
                        <img src="/images/common/logo.svg" alt="로고" />
                    </nuxt-link>
                </h1>
                <div class="gnb_left_list">
                    <button class="gnb_toggle_btn">
                        <img src="/images/header/gnb_btn.svg" alt="GNB 버튼" />
                    </button>
                    <nuxt-link to="/campaigns?type=LOCAL" class="gnb_left_item">지역 캠페인</nuxt-link>
                    <nuxt-link to="/campaigns?type=PRODUCT" class="gnb_left_item">제품 캠페인</nuxt-link>
                    <nuxt-link to="/campaigns?type=REPORTER" class="gnb_left_item">기자단 캠페인</nuxt-link>
                    <nuxt-link to="/premiums/create" class="gnb_left_item">프리미어</nuxt-link>
                    <nuxt-link to="/notices" class="gnb_left_item">공지사항</nuxt-link>
                    <nuxt-link to="/faqs" class="gnb_left_item">FAQ</nuxt-link>
                    <nuxt-link to="/communities" class="gnb_left_item">커뮤니티</nuxt-link>
                </div>
            </div>
            <div class="gnb_right">
                <div class="gnb_right_list">
                    <button class="gnb_right_item gnb_search_btn">
                        <img src="/images/header/search_icon.svg" alt="검색 아이콘" />
                        <p>검색</p>
                    </button>
                    <nuxt-link to="/alarms" class="gnb_notice_btn gnb_right_item">
                        <span class="count" v-if="$auth.user && $auth.user.data.count_alarm > 0">{{$auth.user.data.count_alarm}}</span>
                        <img src="/images/header/notice_icon.svg" alt="알림 아이콘" />
                        <p>알림</p>
                    </nuxt-link>

                    <template v-if="!$auth.user">
                        <nuxt-link to="/login" class="gnb_right_item"><!-- 로그인 전 보이기 -->
                            <img src="/images/header/login_icon.svg" alt="로그인 아이콘" />
                            <p>로그인</p>
                        </nuxt-link>
                        <nuxt-link to="/users/create" class="gnb_right_item"><!-- 로그인 전 보이기 -->
                            <img src="/images/header/join_icon.svg" alt="회원가입 아이콘" />
                            <p>회원가입</p>
                        </nuxt-link>
                    </template>
                    <template v-else>
                        <nuxt-link to="/mypage/company" class="gnb_right_item" v-if="$auth.user.data.type === 'COMPANY'"><!-- 로그인 후 보이기 / 광고주 마이페이지 -->
                            <img src="/images/header/mypage_icon.svg" alt="마이페이지 아이콘" />
                            <p>마이</p>
                        </nuxt-link>
                        <nuxt-link to="/mypage/influencer" class="gnb_right_item" v-else><!-- 로그인 후 보이기 / 체험단 마이페이지 -->
                            <img src="/images/header/mypage_icon.svg" alt="마이페이지 아이콘" />
                            <p>마이</p>
                        </nuxt-link>

                        <a href="#" class="gnb_right_item" @click.prevent="() => {$auth.logout()}"><!-- 로그인 후 보이기 -->
                            <img src="/images/header/logout_icon.svg" alt="로그아웃 아이콘" />
                            <p>로그아웃</p>
                        </a>
                    </template>
                    

                </div>
            </div>
        </nav>

        <div class="site_map">
            <div class="container w1440">
                <img src="/images/logo.svg" alt="" class="logo">

                <div class="top-wrap col-group">
                    <div class="search-wrap">
                        <input type="text" class="search-input" placeholder="찾으시는 캠페인이 있으신가요?" v-model="form.word">
                        <button class="search-btn" @click.prevent="search">
                            <i class="xi-search"></i>
                        </button>
                    </div>
                    <div class="gnb_right_list">
                        <nuxt-link to="/alarms" class="gnb_right_item">
                            <img src="/images/header/notice_icon.svg" alt="알림 아이콘" />
                            <p>알림</p>
                        </nuxt-link>

                        <template v-if="!$auth.user">
                            <nuxt-link to="/login" class="gnb_right_item">
                                <img src="/images/header/login_icon.svg" alt="로그인 아이콘" /><!-- 로그인 전 보이기 -->
                                <p>로그인</p>
                            </nuxt-link>
                        </template>

                        <template v-else>
                            <nuxt-link to="/mypage/company" class="gnb_right_item" v-if="$auth.user.data.type === 'COMPANY'"><!-- 로그인 후 보이기 / 광고주 마이페이지 -->
                                <img src="/images/header/mypage_icon.svg" alt="마이페이지 아이콘" />
                                <p>마이</p>
                            </nuxt-link>
                            <nuxt-link to="/mypage/influencer" class="gnb_right_item" v-else><!-- 로그인 후 보이기 / 체험단 마이페이지 -->
                                <img src="/images/header/mypage_icon.svg" alt="마이페이지 아이콘" />
                                <p>마이</p>
                            </nuxt-link>

                            <a href="#" class="gnb_right_item" @click.prevent="() => $auth.logout()"><!-- 로그인 후 보이기 -->
                                <img src="/images/header/logout_icon.svg" alt="로그아웃 아이콘" />
                                <p>로그아웃</p>
                            </a>
                        </template>

                    </div>
                </div>

                <div class="site_map_menu_wrap">
                    <div class="site_map_menu_group">
                        <nuxt-link to="/campaigns?type=LOCAL" class="title pc">
                            지역 캠페인 <i class="xi-angle-right"></i>
                        </nuxt-link>
                        <div class="title mb">
                            지역 캠페인 <i class="xi-angle-down"></i>
                        </div>
                        <div class="category_ul">
                            <nuxt-link :to="`/campaigns?type=LOCAL`" class="category_item">
                                <img src="/images/all.png">
                                <p>전체</p>
                            </nuxt-link>
                            <nuxt-link :to="`/campaigns?type=LOCAL&category_id=${category.id}`" class="category_item" v-for="category in categories.data" :key="category.id" v-if="category.type === 'LOCAL'">
                                <img :src="category.img ? category.img.url : ''" alt="">
                                <p>{{ category.title }}</p>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="site_map_menu_group">
                        <nuxt-link to="/campaigns?type=PRODUCT" class="title pc">
                            제품 캠페인 <i class="xi-angle-right"></i>
                        </nuxt-link>
                        <div class="title mb">
                            제품 캠페인 <i class="xi-angle-down"></i>
                        </div>
                        <div class="category_ul">
                            <nuxt-link :to="`/campaigns?type=PRODUCT`" class="category_item">
                                <img src="/images/all.png">
                                <p>전체</p>
                            </nuxt-link>
                            <nuxt-link :to="`/campaigns?type=PRODUCT&category_id=${category.id}`" class="category_item" v-for="category in categories.data" :key="category.id" v-if="category.type === 'PRODUCT'">
                                <img :src="category.img ? category.img.url : ''" alt="">
                                <p>{{ category.title }}</p>
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="btm-wrap col-group">
                    <div class="site_map_item_group col-group">
                        <nuxt-link to="/campaigns?type=REPORTER" class="site_map_item">
                            <img src="/images/icon_mic.png" alt="" class="icon">
                            기자단 캠페인
                            <i class="xi-angle-right"></i>
                        </nuxt-link>
                        <nuxt-link to="/premiums/create" class="site_map_item">
                            <img src="/images/icon_premier.png" alt="" class="icon">
                            프리미어
                            <i class="xi-angle-right"></i>
                        </nuxt-link>
                    </div>
                    <nuxt-link to="/notices" class="site_map_item">
                        공지사항
                        <i class="xi-angle-right"></i>
                    </nuxt-link>
                    <nuxt-link to="/faqs" class="site_map_item">
                        FAQ
                        <i class="xi-angle-right"></i>
                    </nuxt-link>
                    <nuxt-link to="/communities" class="site_map_item">
                        커뮤니티
                        <i class="xi-angle-right"></i>
                    </nuxt-link>
                    <button class="logout_btn" @click.prevent="() => $auth.logout()" v-if="$auth.user">
                        로그아웃
                        <i class="xi-log-out"></i>
                    </button>
                    <button class="close-btn">
                        <img src="/images/icon_close.png" alt="">
                        닫기
                    </button>
                </div>
            </div>
        </div>

        <div class="mb_gnb">
            <div class="mb_gnb_item gnb_toggle_btn">
                <img src="/images/icon_mb_menu.png" alt="" class="icon">
                <p class="txt">
                    메뉴
                </p>
            </div>
            <nuxt-link to="/campaigns" class="mb_gnb_item">
                <i class="xi-book-o icon"></i>
                <p class="txt">
                    캠페인
                </p>
            </nuxt-link>
            <nuxt-link to="/" class="mb_gnb_item">
                <img src="/images/icon_mb_home.png" alt="" class="icon">
                <p class="txt">
                    홈
                </p>
            </nuxt-link>
            <nuxt-link to="/mypage/influencer" class="mb_gnb_item">
                <i class="xi-heart-o icon"></i>
                <p class="txt">
                    찜
                </p>
            </nuxt-link>

            <nuxt-link to="/mypage/company" class="mb_gnb_item" v-if="$auth.user && $auth.user.data.type === 'COMPANY'">
                <img src="/images/icon_mb_mypage.png" alt="" class="icon">
                <p class="txt">
                    마이
                </p>
            </nuxt-link>
            <nuxt-link to="/mypage/influencer" class="mb_gnb_item" v-else>
                <img src="/images/icon_mb_mypage.png" alt="" class="icon">
                <p class="txt">
                    마이
                </p>
            </nuxt-link>
        </div>
    </header>

</template>
<script>
import Form from "../utils/Form";
export default {
    data(){
        return {
            form: new Form(this.$axios, {
                word: "",
            }),

            alarms: {
                data: [],
                meta: {

                }
            },

        }
    },

    methods: {
        addEvents(){
            let self = this;

            $("#header .site_map_menu_wrap a, #header .btm-wrap a").unbind("click").bind("click", function (){
                self.closeSiteMap();
            });

            $('.gnb_toggle_btn, .gnb_search_btn').unbind("click").bind("click",function(){
                $('.site_map').addClass('active');

                $('#rental_popup .modal-scroll-wrap').scrollTop(0);

                var scrollPosition = window.scrollY; //스크롤 위치 저장
                $('body').data('scroll', scrollPosition);

                $('body').css('position', 'fixed');
                $('body').css('top', -scrollPosition + 'px');
            });

            $(".close-btn").unbind("click").bind("click",function(){
                self.closeSiteMap();
            });

            //모바일 site map gnb 열고 닫기
            $('.title.mb').unbind("click").bind("click", function(){
                $(this).toggleClass('active');

                if ($(this).hasClass('active')) {
                    $(this).next('.category_ul').stop().slideDown();
                } else {
                    $(this).next('.category_ul').stop().slideUp();
                }
            });
        },

        closeSiteMap(){
            $('.site_map').removeClass('active');

            var scrollPosition = $('body').data('scroll');

            $('body').css('position', '');
            $('body').css('top', '');

            // 스크롤 위치 복원
            window.scrollTo(0, scrollPosition);
        },

        search(){
            this.$router.push({
                path: "/campaigns",
                query: {
                    word: this.form.word
                }
            })
        },

        logout(){
            this.$store.commit("setPushToken", null);

            this.$auth.logout();
        }

    },

    computed: {

        categories() {
            return this.$store.state.categories;
        },

    },

    watch: {
        "$route": {
            deep: true,
            handler(){
                this.closeSiteMap();
            }
        },
    },

    mounted() {
        this.addEvents();
    }
}
</script>


