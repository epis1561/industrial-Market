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
                    받은 후기 보기
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage review_detail">
<!--            <div class="container row-group" v-if="review && review.user.id != $auth.user.data.id">-->
                <div class="container row-group">
                <div class="review-detail-wrap">
                    <div class="review-title-wrap row-group">
                        <h3 class="title">
                            {{ review.user.nickname || review.user.name }}님이 보낸 <br>
                            따뜻한 후기가 도착했어요.
                        </h3>
                        <p class="txt">
                            에이치에이치님과 두산 8인치 CNC선반을 거래했어요.
                        </p>
                    </div>

                    <div class="review-detail receive">
                        <div class="review-detail-list row-group">
                            <div class="review-detail-item col-group">
                                <i class="icon"></i>
                                <p class="txt">
                                    약속 시간을 잘 지켜요
                                </p>
                            </div>
                            <div class="review-detail-item col-group">
                                <i class="icon"></i>
                                <p class="txt">
                                    제품이 설명글과 같아요
                                </p>
                            </div>
                            <div class="review-detail-item col-group">
                                <i class="icon"></i>
                                <p class="txt">
                                    매너가 좋아요
                                </p>
                            </div>
                            <div class="review-detail-item col-group">
                                <i class="icon"></i>
                                <p class="txt">
                                    메시지에 대한 답이 빨라요
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-footer row-group">
                    <a href="review_create.html" class="form-footer-btn submit-btn">후기 보내기</a>
                    <a href="review_send.html" class="form-footer-btn submit-btn">내가 보낸 후기 보기</a>
                </div>
            </div>


<!--            <div class="container row-group" v-if="review && review.user.id == $auth.user.data.id">-->
<!--                <div class="review-detail-wrap">-->
<!--                    <div class="review-title-wrap row-group">-->
<!--                        <h3 class="title">-->
<!--                            {{ review.targetUser.nickname || review.targetUser.name }}님에게 <br>-->
<!--                            따뜻한 후기를 보냈어요.-->
<!--                        </h3>-->
<!--                        <p class="txt">-->
<!--                            {{ review.targetUser.nickname || review.targetUser.name }}님과 {{ review.product.title }}을 거래했어요.-->
<!--                        </p>-->
<!--                    </div>-->

<!--                    <div class="review-detail send">-->
<!--                        <div class="review-detail-list row-group">-->
<!--                            <div class="review-detail-item col-group" v-for="manner in review.manners" :key="manner.id">-->
<!--                                <i class="icon"></i>-->
<!--                                <p class="txt">-->
<!--                                    {{ manner.title }}-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="form-footer row-group" v-if="review.targetUserReview">-->
<!--                    <nuxt-link to="review_receive.html" class="form-footer-btn submit-btn">상대방이 보낸 후기 보기</nuxt-link>-->
<!--                </div>-->
<!--            </div>-->
        </main>


    </div>
</template>
<script>
import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {

            }),
            review:"",
        };
    },

    methods: {
        getReview(){
            console.log(this.$auth.user.data.id);
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