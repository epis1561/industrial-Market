<template>
    <div id="wrap" class="users">

        <!-- header Start -->
        <header id="header" class="detail-header user-detail-header">
            <div class="container col-group">
                <div class="sub-header-btn-wrap col-group">
                    <a href="javascript:window.history.back();" class="sub-header-btn prev-btn"></a>
                </div>
                <div class="sub-header-btn-wrap col-group">
                    <button class="sub-header-btn more-btn" @click="ismore=true">
                        <i></i>
                    </button>
                </div>
            </div>
        </header>
        <!-- header End -->

        <main class="products_detail user_detail" v-if="user">
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
                            <button class="like-btn" :class="{'active':user.like==1}" @click="toggleLike"></button>
                        </div>
                        <p class="txt">
                            {{ user.activeCounty.city.title + ' ' + user.activeCounty.title || user.city.title + ' ' + user.county.title }}
                        </p>
                    </div>
                    <div class="container">
                        <div class="user-profile-info-wrap col-group">
                            <div class="user-profile-info-item row-group">
                                <nuxt-link :to="`/sell?id=${user.id}`" class="num">{{
                                        user.count_product_ongoing_sell
                                    }}
                                </nuxt-link>
                                <p class="txt">판매상품</p>
                            </div>
                            <div class="user-profile-info-item row-group">
                                <p class="num">{{ user.count_product_finish }}</p>
                                <p class="txt">거래완료</p>
                            </div>
                            <div class="user-profile-info-item row-group">
                                <nuxt-link :to="``" class="num">{{ user.count_like_user }}</nuxt-link>
                                <p class="txt">관심회원</p>
                            </div>
                        </div>

                        <h4 class="product-detail-title">
                            거래 후 이런 평가를 받았어요
                        </h4>
                        <div class="user-review-report row-group">
                            <div class="user-review-report-item col-group" v-for="manner in manners.data"
                                 :key="manner.id">
                                <div class="item-box col-group">
                                    <i class="icon blue"></i>
                                    <p class="title">
                                        {{ manner.title }}
                                    </p>
                                </div>
                                <div class="item-box col-group">
                                    <img src="/images/icon_user.png" alt="" class="icon">
                                    <p class="num">
                                        {{ manner.count }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="product-detail-section container">
                    <h4 class="product-detail-title col-group">
                        판매중인 상품
                        <nuxt-link :to="`/sell?id=${user.id}`">
                            <i class="icon"></i>
                        </nuxt-link>
                    </h4>
                    <div class="prod-list prod-half-list col-group">
                        <nuxt-link :to="`/products/${product.id}`" class="prod-item row-group"
                                   v-for="(product,index) in products.data" :key="product.id" v-if="index < 4">
                            <div class="item-img">
                                <img :src="product.img ? product.img.url : ''" alt="">
                                <div class="ongoing" v-if="product.state_transaction ==1">
                                    거래중
                                </div>
                            </div>
                            <div class="item-txt-wrap">
                                <p class="title">
                                    {{ product.title }}
                                </p>
                                <div class="price">
                                    {{ product.format_price }}
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </main>

        <!-- 헤더 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_chat" :class="{'active': ismore}">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
                    <button class="chat-more-option col-group modal_block_btn" @click="isblock=true">
                        <i class="icon"></i>
                        차단하기
                    </button>
                    <button class="chat-more-option col-group modal_report_btn" @click="isreport=true">
                        <i class="icon"></i>
                        신고하기
                    </button>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="ismore=false">
                        취소
                    </button>
                </div>
            </div>

        </div>
        <!-- //헤더 버튼 클릭시 나타나는 팝업 -->

        <!-- 차단하기 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_block" :class="{'active':isblock}">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon red"></i>
                    <h3 class="modal-title">
                        차단하기
                    </h3>
                </div>
                <p class="modal-alert-txt">
                    차단하면 서로의 게시글을 확인하거나<br>
                    채팅할 수 없습니다. 차단하시겠습니까? <br>
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isblock=false">
                        취소
                    </button>
                    <button class="modal-footer-btn submit-btn" @click="block">
                        차단하기
                    </button>
                </div>
            </div>
        </div>
        <!-- //차단하기 버튼 클릭 시 팝업 -->

        <!-- 신고하기 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_report" :class="{'active':isreport}">
            <div class="modal-wrap">
                <i class="xi-close close-btn" @click="isreport=false"></i>
                <div class="modal-title-wrap border">
                    <p class="modal-title">
                        신고하기
                    </p>
                    <p class="modal-sub-title">
                        아래의 목록에서 신고 사유를 선택해 주세요
                    </p>
                </div>

                <div class="form-item row-group">
                    <div class="form-label-wrap row-group">
                        <label :for="'type_'+report.id" v-for="report in ReportCategories.data" :key="report.id">
                            <input type="radio" class="form-radio" :id="'type_'+report.id" name="type" :value="report.id"
                                   v-model="reportForm.report_category_id" @click="enable(report.id)">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    {{ report.title }}
                                </p>
                            </div>
                            <div class="checked-item row-group" v-if="report.id==5">
                                <input type="text" class="form-input" :class="{ 'disable': isDisabled }"
                                       :disabled="isDisabled" placeholder="간단한 사유 입력" v-model="reportForm.description">
                            </div>
                        </label>
                    </div>
                </div>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn" @click="submitReport('User')">
                        신고하기
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {
                user_id: "",
                likeable_id: "",
                likeable_type: "User",

            }),
            reportForm: new Form(this.$axios, {
                reportable_id: "",
                reportable_type: "",
                report_category_id: "",
                description: "",
            }),
            blockForm: new Form(this.$axios, {
                target_user_id: "",
            }),
            user: "",
            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
            },

            manners: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                },
            },
            ReportCategories: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            ismore: false,
            isreport: false,
            isblock: false,
            isDisabled: true,
        };

    },

    methods: {
        getUser() {
            this.$axios.get("/api/users/" + this.$route.params.id, {}).then(response => {
                if(this.$auth.user.data.id == this.$route.params.id){
                    this.$router.push('/mypage');
                }
                this.user = response.data.data;
                this.getManners();

            })
        },
        getManners() {
            this.form.user_id = this.user.id;
            this.$axios.get("/api/manners", {
                params: this.form.data(),
            }).then(response => {

                this.manners = response.data;
                this.manners.data = this.manners.data.filter(manners => manners.type != 0);

            })
        },
        getProducts() {
            this.form.user_id = this.$route.params.id;

            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                this.products = response.data;
                console.log(this.products.data);
            })
        },
        toggleLike() {
            if (this.user.like == 1) {
                this.user.like = 0;
                this.form.likeable_id = this.user.id;
                return this.form.delete("/api/likes", {}).then(
                        console.log('좋아요가취소되버림ㅋ'),
                        console.log('대상아이디 =', this.form.likeable_id)
                )
            } else {
                this.user.like = 1;
                this.form.likeable_id = this.user.id;
                return this.form.post("/api/likes", {}).then(
                        console.log('좋아요가되버림ㅋ'),
                        console.log('대상아이디 =', this.form.likeable_id)
                )
            }
        },
        getReportCategories() {
            this.$axios.get("/api/reportCategories", {
                params: this.form.data(),
            }).then(response => {
                console.log(response.data);
                this.ReportCategories = response.data;

            })
        },
        submitReport(type) {
            this.reportForm.reportable_id = this.$route.params.id;
            this.reportForm.reportable_type = type;
            console.log(this.reportForm.reportable_id);
            console.log(this.reportForm.report_category_id);
            console.log(this.reportForm.reportable_type);
            this.reportForm.post("/api/reports").then(response => {
                this.isreport=false;
            })
        },
        block(){
            this.blockForm.target_user_id = this.user.id;
            this.blockForm.post("/api/blocks/")
                    .then(response => {
                        console.log(this.blockForm.target_user_id);
                        this.$router.back();
                    })
        },
        enable(num) {
            if (num === 5) {
                this.isDisabled = false;  // 5번째 카테고리일 때만 입력 상자를 활성화
            } else {
                this.isDisabled = true;   // 그 외의 경우에는 입력 상자를 비활성화
            }
        },
    },

    computed: {},
    watch: {},
    mounted() {
        this.getUser();
        this.getProducts();
        this.getReportCategories();
    }
}
</script>