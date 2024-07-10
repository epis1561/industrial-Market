<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
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
                    <nuxt-link :to="`/review/create/?id=${review.user.id}`" class="form-footer-btn submit-btn" v-if="!review.targetUserReview">후기 보내기</nuxt-link>
                    <nuxt-link :to="`/review/${review.targetUserReview.id}`" class="form-footer-btn submit-btn" v-if="review.targetUserReview && review.emotion==1">내가 보낸 후기 보기</nuxt-link>
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
                            <div class="review-detail-item col-group" v-for="manner in review.manners" :key="manner.id">
                                <i class="icon"></i>
                                <p class="txt">
                                    {{ manner.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-footer row-group" v-if="review.targetUserReview">
                    <nuxt-link :to="`/review/${review.targetUserReview.id}`" class="form-footer-btn submit-btn">상대방이 보낸 후기 보기</nuxt-link>
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
        };
    },

    methods: {
        getReview(){
            this.$axios.get("/api/reviews/" + this.$route.params.id)
                    .then(response => {
                        this.review = response.data.data;
                        console.log(this.review);

                    })
        },

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