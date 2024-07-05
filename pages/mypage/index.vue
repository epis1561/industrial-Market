<template>

    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="detail-header">
            <div class="container col-group">
                <div class="sub-header-btn-wrap col-group">
                    <a href="javascript:window.history.back();" class="sub-header-btn prev-btn"></a>
                </div>
                <div class="sub-header-btn-wrap col-group">
                    <nuxt-link to="/mypage/settings" class="sub-header-btn setting-btn"></nuxt-link>
                </div>
            </div>
        </header>
        <!-- header End -->

        <main class="mypage">
            <div class="product-detail-section-wrap row-group">
                <div class="product-detail-section user-detail-top">
                    <div class="user-profile-wrap">
                        <div class="profile-img">
                            <img :src="user.img ? user.img.url : '/images/profile_null.png'" alt="">
                        </div>
                        <div class="title-wrap col-group">
                            <p class="title">
                                {{ user.nickname || user.name }}
                            </p>
                        </div>
                        <p class="txt">
                            {{ user.activeCounty.city.title + ' ' + user.activeCounty.title }}
                        </p>
                    </div>
                    <div class="container">
                        <div class="user-profile-info-wrap col-group">
                            <div class="user-profile-info-item row-group">
                                <nuxt-link :to="`/mypage/products/indexBySell?id=${1}`" class="num">{{user.count_product_sell}} </nuxt-link>
                                <p class="txt">판매상품</p>
                            </div>
                            <div class="user-profile-info-item row-group">
                                <p class="num">{{ user.count_product_finish }}</p>
                                <p class="txt">거래완료</p>
                            </div>
                            <div class="user-profile-info-item row-group">
                                <nuxt-link to="/like" class="num">{{user.count_like_user }}</nuxt-link>
                                <p class="txt">관심회원</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container row-group">
                    <div class="mypage-menu-wrap">
                        <p class="mypage-menu-title">
                            나의 활동
                        </p>
                        <div class="mypage-menu-list row-group">
                            <nuxt-link :to="`/mypage/products/indexBySell?id=${2}`" class="mypage-menu-item col-group">
                                <p class="title">
                                    판매 내역
                                </p>
                                <div class="more-btn col-group">
                                    <p class="num">{{ user.count_product_sell }}</p>
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                            <nuxt-link :to="`/mypage/products/indexByBuy?id=${user.id}`" class="mypage-menu-item col-group">
                                <p class="title">
                                    구매 내역
                                </p>
                                <div class="more-btn col-group">
                                    <p class="num">{{ user.count_product_buy }}</p>
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                            <nuxt-link to="" class="mypage-menu-item col-group">
                                <p class="title">
                                    활동지역 설정
                                </p>
                                <div class="more-btn">
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                            <nuxt-link to="" class="mypage-menu-item col-group">
                                <p class="title">
                                    받은 후기
                                </p>
                                <div class="more-btn col-group">
                                    <p class="num">{{ user.count_review_receive }}</p>
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="mypage-menu-wrap">
                        <p class="mypage-menu-title">
                            고객지원
                        </p>
                        <div class="mypage-menu-list row-group">
                            <nuxt-link to="/events" class="mypage-menu-item col-group">
                                <p class="title">
                                    이벤트
                                    <span class="badge" v-if="newEvents.data.length!=0 && newEvents.data[0].new == 1">N</span>
                                </p>
                                <div class="more-btn">
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                            <nuxt-link to="/faqs" class="mypage-menu-item col-group">
                                <p class="title">
                                    자주 묻는 질문
                                </p>
                                <div class="more-btn">
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                            <nuxt-link to="/notices" class="mypage-menu-item col-group">
                                <p class="title">
                                    공지사항
                                    <span class="badge" v-if="newNotice.data.length!=0 && newNotice.data[0].new == 1">N</span>
                                </p>
                                <div class="more-btn">
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                            <nuxt-link to="/qnas"class="mypage-menu-item col-group">
                                <p class="title">
                                    1:1 문의
                                </p>
                                <div class="more-btn">
                                    <i class="icon"></i>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- gnb Start -->

            <gnb :mypage="isMy" />

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
            isMy:true,
        };
    },

    methods: {

    },

    computed: {
            user(){
                return this.$auth.user.data;
            },
        newNotice(){
                return this.$store.state.notices;
        },
        newEvents(){
            return this.$store.state.events;
        },
    },
    watch: {

    },
    mounted() {

console.log(this.user);
    }
}
</script>