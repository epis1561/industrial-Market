<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="index-header">
            <div class="container col-group">
                <h1 class="logo">
                    <img src="/images/LOGO.png" alt="">
                </h1>
                <div class="header-menu-wrap col-group">
                    <button class="header-menu search-btn">
                        <img src="/images/icon_search.png" alt="">
                    </button>
                    <a href="notification.html" class="header-menu active"> <!-- 알림 갯수 1개 이상일 때 active 클래스 추가 -->
                        <img src="/images/icon_bell.png" alt="">
                    </a>
                </div>
            </div>
        </header>
        <!-- header End -->

        <main class="index">
            <div class="cate-wrap">
                <div class="cate-list col-group">
                    <a href="products.html" class="cate-item active" v-for="item in productsCategories.data" @click.prevent="checkId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
            <div class="container">
                <div class="prod-list">
                    <ProductList :item="item" v-for="item in products.data" :key="item.id"></ProductList>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb"></div>
        <!-- gnb End -->

        <div class="modal-container local_select_1">
            <div class="modal-select-wrap modal-wrap">
                <i class="close-btn"></i>
                <div class="modal-title-wrap center">
                    <h3 class="modal-title">지역</h3>
                </div>

                <div class="form-label-wrap row-group">
                    <label for="type_1">
                        <input type="radio" class="form-radio" id="type_1" name="type">
                        <div class="checked-item col-group">
                            <div class="icon">
                                <i class="xi-check"></i>
                            </div>
                            <p class="txt">
                                전국
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
                                현 위치로 보기
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
                                경기도
                            </p>
                        </div>
                    </label>
                </div>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn local_select_btn_2">
                        지역선택
                    </button>
                    <button class="modal-footer-btn submit-btn">
                        상품보기
                    </button>
                </div>
            </div>

        </div>
        <!-- //지역 필터 선택 시 나타나는 select -->

        <!-- 지역 필터 선택 시 나타나는 select -->
        <div class="modal-container local_select_2">
            <div class="modal-select-wrap modal-wrap">
                <i class="close-btn"></i>
                <div class="modal-title-wrap center">
                    <h3 class="modal-title">지역</h3>
                </div>

                <div class="modal-scroll-wrap">
                    <div class="form-label-wrap row-group">
                        <label for="type_1">
                            <input type="radio" class="form-radio" id="type_1" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    서울특별시
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
                                    부산광역시
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
                                    대구광역시
                                </p>
                            </div>
                        </label>
                        <label for="type_4">
                            <input type="radio" class="form-radio" id="type_3" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    인천광역시
                                </p>
                            </div>
                        </label>
                        <label for="type_5">
                            <input type="radio" class="form-radio" id="type_3" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    광주광역시
                                </p>
                            </div>
                        </label>
                    </div>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn close-btn">
                        지역선택
                    </button>
                </div>
            </div>

        </div>
        <!-- //지역 필터 선택 시 나타나는 select -->

        <!-- 정렬 필터 선택 시 나타나는 select -->
        <div class="modal-container align_select">
            <div class="modal-select-wrap modal-wrap">
                <i class="close-btn"></i>
                <div class="modal-title-wrap center">
                    <h3 class="modal-title">정렬</h3>
                </div>

                <div class="modal-scroll-wrap">
                    <div class="form-label-wrap row-group">
                        <label for="type_1">
                            <input type="radio" class="form-radio" id="type_1" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    최신순
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
                                    인기순
                                </p>
                            </div>
                        </label>
                    </div>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn close-btn">
                        상품보기
                    </button>
                </div>
            </div>

        </div>
    </div>
    </body>
</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {
                page:1,
                product_qna_category_id: 40,
            }),
            products:{
                data: [],
            },
            productsCategories:{
                data: [],
            },

        }
    },

    methods: {
        getProductCategories(){
            this.$axios.get("/api/productCategories",{
                params:this.form.data(),
            }).then(response => {
                console.log(response.data);
                this.items = response.data;
            })
        },
        getProducts(){
            this.$axios.get("/api/products",{
                params:this.form.data(),
            }).then(response => {
                console.log(response.data);
                this.products = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.getProducts();
        this.getProductCategories();

        this.$route.params.id;
        this.$route.query.product_category_id;
    }
};
</script>
