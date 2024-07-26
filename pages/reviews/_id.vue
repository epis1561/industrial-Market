<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <button @click="goBack" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="뒤로 가기">
                </button>
                <h2 class="title" v-if="review && review.user.id != $auth.user.data.id">
                    받은 후기 보기
                </h2>
                <h2 class="title" v-if="review && review.user.id == $auth.user.data.id">
                    보낸 후기 보기
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage review_detail">
            <div class="container row-group" v-if="review && review.user.id != $auth.user.data.id">
                <div class="container row-group">
                <div class="review-detail-wrap">
                    <div class="review-title-wrap row-group">
                        <h3 class="title">
                            {{ review.user.nickname || review.user.name }}님이 보낸 <br>
                            따뜻한 후기가 도착했어요.
                        </h3>
                        <p class="txt">
                            {{ review.user.nickname || review.user.name }}님과 {{ review.product.title }}을 거래했어요.
                        </p>
                    </div>

                    <div class="review-detail receive">
                        <div class="review-detail-list row-group">
                            <div class="review-detail-item col-group" v-for="manner in review.manners" :key="manner.id">
                                <i class="icon"></i>
                                <p class="txt">
                                    {{ manner.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-footer row-group">
                    <nuxt-link :to="`/reviews/create/?id=${review.product.id}`" class="form-footer-btn submit-btn" v-if="!review.targetUserReview">후기 보내기</nuxt-link>
                    <nuxt-link :to="`/reviews/${review.targetUserReview.id}`" class="form-footer-btn submit-btn" v-if="review.targetUserReview && review.targetUserReview.emotion==1">내가 보낸 후기 보기</nuxt-link>
                </div>
            </div>
            </div>

            <div class="container row-group" v-if="review && review.user.id == $auth.user.data.id">
                <div class="review-detail-wrap">
                    <div class="review-title-wrap row-group">
                        <h3 class="title">
                            {{ review.targetUser.nickname || review.targetUser.name }}님에게 <br>
                            따뜻한 후기를 보냈어요.
                        </h3>
                        <p class="txt">
                            {{ review.targetUser.nickname || review.targetUser.name }}님과 {{ review.product.title }}을 거래했어요.
                        </p>
                    </div>

                    <div class="review-detail send">
                        <div class="review-detail-list row-group">
                            <div class="review-detail-item col-group" v-for="manner in review.manners.filter(manner => manner.emotion != 0)" :key="manner.id">
                                <i class="icon"></i>
                                <p class="txt">
                                    {{ manner.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-footer row-group" v-if="review.targetUserReview && review.targetUserReview.emotion != 0">
                    <nuxt-link :to="`/reviews/${review.targetUserReview.id}`" class="form-footer-btn submit-btn">상대방이 보낸 후기 보기</nuxt-link>
                </div>
            </div>
        </main>


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
            review:"",
            previousPath:"",
        };
    },

    methods: {
        getReview(){
            this.$axios.get("/api/reviews/" + this.$route.params.id)
                    .then(response => {
                        this.review = response.data.data;
                        console.log(this.review);

                    })
        },goBack() {
            // 현재 라우트의 이름이나 경로를 확인
            const currentRoute = this.$route.name || this.$route.path;

            // 현재 페이지가 특정 페이지일 때만 특별한 로직 적용
            if (currentRoute === 'specificPageName' || currentRoute === '/specific-page-path') {
                // 브라우저의 히스토리를 확인
                const previousPage = window.history.state?.back;

                if (previousPage === '/reviews/create') {
                    this.$router.go(-2);
                } else {
                    this.$router.go(-1);
                }
            } else {
                // 다른 모든 페이지에서는 그냥 한 칸 뒤로
                this.$router.go(-1);
            }
        }


    },





    computed: {

    },
    watch: {

    },

    mounted() {

        this.getReview();
    }
}
</script>