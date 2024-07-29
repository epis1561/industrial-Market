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
                    거래 후기 보내기
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage mypage_sub review_create" v-if="product">
            <div class="chat-prod prod-item">
                <div class="container col-group">
                    <div class="item-img">
                        <img :src="product.img ? product.img.url:'/images/notification_icon_bg.png'" alt="">
                    </div>
                    <div class="item-txt-wrap">
                        <p class="title">
                            {{ product.title }}
                        </p>
                        <p class="title buyer" >
                           거래한회원
                            <span v-if="$auth.user.data.id != product.buyer.id">{{ product.buyer.nickname || product.buyer.name }}</span>
                            <span v-if="$auth.user.data.id == product.buyer.id">{{ product.user.nickname || product.user.name }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="container row-group">
                <div class="review-create-wrap">
                    <div class="review-title-wrap row-group">
                        <h3 class="title" v-if="$auth.user.data.id != product.buyer.id">
                            {{ this.$auth.user.data.nickname || this.$auth.user.data.name }}님, <br>
                            {{ product.buyer.nickname || product.buyer.name }}님과의 거래 어떠셨어요?
                        </h3>
                        <h3 class="title" v-if="$auth.user.data.id == product.buyer.id">
                            {{ this.$auth.user.data.nickname || this.$auth.user.data.name }}님, <br>
                            {{ product.user.nickname || product.user.name }}님과의 거래 어떠셨어요?
                        </h3>
                        <p class="txt">
                            거래 선호도는 나만 볼 수 있어요.
                        </p>
                    </div>

                    <div class="review-score-wrap col-group">
                        <label for="score_1" class="review-score review-score-01" @click="good=false, form.emotion=0">
                            <input type="radio" name="score" id="score_1">
                            <div class="checked-box">
                                <div class="img-box"></div>
                                <p class="txt">
                                    별로예요
                                </p>
                            </div>
                        </label>
                        <label for="score_2" class="review-score review-score-02" @click="good=true, form.emotion=1">
                            <input type="radio" name="score" id="score_2">
                            <div class="checked-box">
                                <div class="img-box"></div>
                                <p class="txt">
                                    좋아요!
                                </p>
                            </div>
                        </label>
                        <label for="score_3" class="review-score review-score-03" @click="good=true, form.emotion=1">
                            <input type="radio" name="score" id="score_3">
                            <div class="checked-box">
                                <div class="img-box"></div>
                                <p class="txt">
                                    최고예요!
                                </p>
                            </div>
                        </label>
                    </div>

                    <!-- 별로예요 선호도 체크시 나타나는 부분 -->
                    <div v-if="badManners" class="mannerBox" :class="{'active':good==false}">
                        <div class="review-title-wrap row-group">
                            <h3 class="title">
                                어떤 점이 별로였나요?
                            </h3>
                            <p class="txt">
                                부정 거래 후기, 비매너 평가는 익명으로 처리됩니다. <br>
                                솔직한 거래 후기를 남겨주세요.
                            </p>
                        </div>
                        <div class="form-label-wrap row-group">
                            <label :for="`type_${badManner.id}`" v-for="badManner in badManners.data"
                                   :key="badManner.id">
                                <input type="checkbox" class="form-checkbox" :id="`type_${badManner.id}`" name="type" :value="badManner.id" v-model="form.manner_ids">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        {{ badManner.title }}
                                    </p>
                                </div>
                            </label>
                        </div>

                    </div>
                    <!-- //별로예요 선호도 체크시 나타나는 부분 -->

                    <!-- 좋아요/최고예요 선호도 체크시 나타나는 부분 -->
                    <div v-if="goodManners" class="mannerBox" :class="{'active':good==true}">
                        <div class="review-title-wrap row-group">
                            <h3 class="title">
                                어떤 점이 좋았나요?
                            </h3>
                            <p class="txt">
                                남겨주신 거래 후기는 상대방의 프로필에 공개돼요.
                            </p>
                        </div>
                        <div class="form-label-wrap row-group">
                            <label :for="`type_${goodManner.id}`" v-for="goodManner in goodManners.data"
                                   :key="goodManner.id">
                                <input type="checkbox" class="form-checkbox" :id="`type_${goodManner.id}`" :value="goodManner.id" name="type" v-model="form.manner_ids">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        {{ goodManner.title }}
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <!-- //좋아요/최고예요 선호도 체크시 나타나는 부분 -->
                </div>
                <div class="form-footer row-group">
                    <a href="" class="form-footer-txt" @click.prevent="$router.back()">
                        다음에 할래요
                    </a>
                    <button class="form-footer-btn submit-btn" @click="store">
                        후기 보내기
                    </button>
                </div>
                <div class="modal-container modal_leave" :class="{'active':isSuccess}">
                    <div class="modal-wrap modal-alert">
                        <div class="modal-title-wrap">

                            <h3 class="modal-title">
                                후기보내기
                            </h3>
                        </div>
                        <p class="modal-alert-txt">
                            후기를 성공적으로 보냈습니다.
                        </p>

                        <div class="modal-footer col-group">
                        </div>
                    </div>
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
                product_id: this.$route.query.id,
                emotion: null,
                manner_ids: [],
            }),
            product: "",
            good:"",
            isSuccess:false,
        };
    },

    methods: {
        getProduct() {
            this.$store.commit('setLoading',true);
            this.$axios.get("/api/products/" + this.$route.query.id, {}).then(response => {
                this.product = response.data.data;
            })
        },
        store(){
            this.$store.commit('setLoading',true);
            this.form.post("/api/reviews",{
                params:this.form.data(),
            }).then(response =>{
                if(this.good ==true){
                    this.isSuccess=true;
                    setTimeout(() => {
                        this.$router.replace(`/reviews/${response.data.id}`);
                    }, 2500);
                }
                else{
                    this.isSuccess=true;
                    setTimeout(() => {
                    this.$router.back();
                }, 2500);
                }
            })

        },


    },

    computed: {
        goodManners() {
            return this.$store.state.goodManners;
        },
        badManners() {
            return this.$store.state.badManners;
        }
    },
    watch: {},
    mounted() {
        this.getProduct();
    }
}
</script>