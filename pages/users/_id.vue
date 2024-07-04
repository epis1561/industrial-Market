<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="detail-header user-detail-header">
            <div class="container col-group">
                <div class="sub-header-btn-wrap col-group">
                    <a href="javascript:window.history.back();" class="sub-header-btn prev-btn"></a>
                </div>
                <div class="sub-header-btn-wrap col-group">
                    <button class="sub-header-btn more-btn">
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
                            <img :src="user.img.url || '/images/replace-user.png'" alt="">
                        </div>
                        <div class="title-wrap col-group">
                            <p class="title">
                                {{ user.nickname || user.name }}
                            </p>
                            <button class="like-btn" :class="{'active':user.like==1}" @click="toggleLike"></button>
                        </div>
                        <p class="txt">
                            {{ user.activeCounty || user.city.title + ' ' + user.county.title }}
                        </p>
                    </div>
                    <div class="container">
                        <div class="user-profile-info-wrap col-group">
                            <div class="user-profile-info-item row-group">
                                <a href="" class="num">{{ user.count_product_ongoing_sell }}</a>
                                <p class="txt">판매상품</p>
                            </div>
                            <div class="user-profile-info-item row-group">
                                <p class="num">{{ user.count_product_finish }}</p>
                                <p class="txt">거래완료</p>
                            </div>
                            <div class="user-profile-info-item row-group">
                                <a href="" class="num">{{ user.count_like_user }}</a>
                                <p class="txt">관심회원</p>
                            </div>
                        </div>

                        <h4 class="product-detail-title">
                            거래 후 이런 평가를 받았어요
                        </h4>
                        <div class="user-review-report row-group">
                            <div class="user-review-report-item col-group" v-for="manner in manners.data" :key="manner.id">
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
                        <nuxt-link to="user_detail_products.html">
                            <i class="icon"></i>
                        </nuxt-link>
                    </h4>
                    <div class="prod-list prod-half-list col-group">
                        <nuxt-link :to="products" class="prod-item row-group">
                            <div class="item-img">
                                <img src="" alt="">
                            </div>
                            <div class="item-txt-wrap">
                                <p class="title">
                                    두산 8인치 CNC선반
                                </p>
                                <div class="price">
                                    <p class="label">
                                        삽니다
                                    </p>
                                    7,200만원
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </main>

        <!-- 헤더 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_chat">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
                    <button class="chat-more-option col-group modal_block_btn">
                        <i class="icon"></i>
                        차단하기
                    </button>
                    <button class="chat-more-option col-group modal_report_btn">
                        <i class="icon"></i>
                        신고하기
                    </button>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn">
                        취소
                    </button>
                </div>
            </div>

        </div>
        <!-- //헤더 버튼 클릭시 나타나는 팝업 -->

        <!-- 차단하기 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_block">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon red"></i>
                    <h3 class="modal-title">
                        차단하기
                    </h3>
                </div>
                <p class="modal-alert-txt">
                    회원사 가공제품 페이지는 <br>
                    <strong>사업자 정보 등록 후</strong> 작성 가능합니다. <br>
                    지금 사업자 정보를 등록하시겠습니까?
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn">
                        취소
                    </button>
                    <button class="modal-footer-btn submit-btn">
                        차단하기
                    </button>
                </div>
            </div>
        </div>
        <!-- //차단하기 버튼 클릭 시 팝업 -->

        <!-- 신고하기 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_report">
            <div class="modal-wrap">
                <i class="xi-close close-btn"></i>
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
                        <label for="type_1">
                            <input type="radio" class="form-radio" id="type_1" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    허위 내용
                                </p>
                            </div>
                        </label>
                        <label for="type_2">
                            <input type="radio" class="form-radio" id="type_2" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    동일 내용 반복 게시 (도배)
                                </p>
                            </div>
                        </label>
                        <label for="type_3">
                            <input type="radio" class="form-radio" id="type_3" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    음란 / 선정성 / 비방
                                </p>
                            </div>
                        </label>
                        <label for="type_4">
                            <input type="radio" class="form-radio" id="type_4" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    광고/홍보
                                </p>
                            </div>
                        </label>
                        <label for="type_5">
                            <input type="radio" class="form-radio" id="type_5" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <div class="txt-wrap row-group">
                                    <p class="txt">
                                        기타
                                    </p>
                                    <!-- 기타 선택 시 input 활성화 (disable 클래스 삭제) -->
                                    <input type="text" class="form-input disable" disabled="" placeholder="간단한 사유 입력">
                                </div>

                            </div>
                        </label>
                    </div>
                </div>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn">
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
            user_id:"",
            likeable_id : "",
             likeable_type : "User",

            }),

            user :"",
            products : {
                data:[],
                meta:{
                   current_page:1,
                   last_page:1,
                },
            },

            manners: {
                data:[],
                meta:{
                    current_page:1,
                    last_page:1,
                },
            },
        };

    },

    methods: {
        getUser(){
            this.$axios.get("/api/users/" + this.$route.params.id,{

            }).then(response => {
                this.user = response.data.data;
                this.getManners();
            })
        },
        getManners(){
            this.form.user_id = this.user.id;
            this.$axios.get("/api/manners",{

                params:this.form.data(),
            }).then(response => {
                console.log(this.form.user_id);
                this.manners = response.data;
                this.manners.data  = this.manners.data.filter(manners => manners.type != 0);
                console.log(this.manners.data);
            })
        },
        getProducts(){
            this.$axios.get("/api/products",{
                params:this.form.data(),
            }).then(response =>{
                this.products = response.data;

            })
        },
        toggleLike(){
            if(this.user.like == 1){
                this.user.like = 0;
                this.form.likeable_id = this.user.id;
                return this.form.delete("/api/likes",{

                }).then(
                        console.log('좋아요가취소되버림ㅋ'),
                        console.log('대상아이디 =',this.form.likeable_id)
                )
            }
            else{
                this.user.like = 1;
                this.form.likeable_id = this.user.id;
                return this.form.post("/api/likes",{

                }).then(
                        console.log('좋아요가되버림ㅋ'),
                        console.log('대상아이디 =',this.form.likeable_id)
                )
            }
        }


    },

    computed: {

    },
    watch: {},
    mounted() {
    this.getUser();
    this.getProducts();
    }
}
</script>