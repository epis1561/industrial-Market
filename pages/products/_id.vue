<template>
  <body>
  <div id="wrap" class="subpage">

    <!-- header Start -->
      <header id="header" class="sub-header">
          <div id="search"></div> <!-- 검색창 -->
          <div class="container col-group">
              <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                  <img src="/images/icon_prev.png" alt="">
              </a>
              <h2 class="title">
                  중고기계
              </h2>
              <button class="sub-header-btn search-btn">
                  <img src="/images/icon_search.png" alt="">
              </button>
          </div>
      </header>
    <!-- header End -->

    <main class="index">
      <div class="cate-wrap">

      </div>
      <div class="container">
          <div class="top-filter-wrap col-group">
              <button class="filter-item local_select_btn">
                  전국 <i></i>
              </button>
              <button class="filter-item align_select_btn">
                  최신순 <i></i>
              </button>
          </div>
        <div class="prod-list">
          <product :item="product" v-for="product in products.data" :key="product.id" />
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
        product_category_id:"",
        location_id: "",
        order_by: "",
        word: "",
        user_id:"",
        state_transaction: "",
        random:"",
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
    getItem() {
        this.$axios.get("/api/products", {
            params: {
                product_category_id:5
            },
        }).then(response => {
          // 백엔드에서 나는 요청을 이렇게 보내는것뿐이고, 여기에따른 필터링 및 요구에 따른 데이터전송은 백엔드쪽아닌가??? 그래서안뜨는거아닌가???
          this.products = response.data
        })
    },

     getProductCategories(){
       this.$axios.get("/api/productCategories",{
         prams:this.form.data(),
       }).then(response => {
         this.productsCategories = response.data;
       })
     },

    getConsole(){
      console.log(this.products);
    },
  },

  computed: {


  },

  mounted() {
      this.form.product_category_id = this.$route.params.id;
    this.getProducts();
    this.getProductCategories();
    this.getConsole();
  }
};
</script>
