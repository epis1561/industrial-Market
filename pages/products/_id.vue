<template>
  <body>

  <div id="wrap">

      <!-- header Start -->
      <header id="header" class="detail-header" v-if="product">
          <div class="container col-group">
              <div class="sub-header-btn-wrap col-group">
                  <a href="javascript:window.history.back();" class="sub-header-btn prev-btn"></a>
                  <nuxt-link to="/" class="sub-header-btn home-btn"></nuxt-link>
<!--  인덱스로가는게 맞음. 일단 지금 인덱스는 로그인페이지라 놔두자.-->
              </div>
              <div class="sub-header-btn-wrap col-group">
                  <button class="sub-header-btn share-btn"></button>
                  <button class="sub-header-btn report-btn" @click="isReport=true"></button><!-- 다른 유저의 상품 확인 시 보이는 버튼 -->
                  <button class="sub-header-btn more-btn" v-if="user.id == product.user.id" @click="isMore=true"><!-- 본인의 상품 확인 시 보이는 버튼 -->
                      <i class="icon"></i>
                  </button>
              </div>
          </div>
      </header>
      <!-- header End -->

      <main class="products_detail" v-if="product">
          <div class="detail-img-wrap">
              <div class="swiper detail-img-slide">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="img in product.imgs" :key="img.id">
                          <div class="img-container">
                              <img :src="img.url ? img.url : ''" />
                          </div>
                      </div>

                  </div>
                  <div class="swiper-pagination detail-img-pagination"></div>
              </div>
          </div>

          <div class="product-detail-section-wrap row-group">
              <div class="product-detail-section container">
                  <div class="detail-txt-wrap">

                      <!-- 본인의 상품 확인 시 보이는 섹션 -->
<!--                      <div class="detail-status-select col-group">-->
<!--                          <div class="txt">-->
<!--                              나눔완료-->
<!--                          </div>-->
<!--                          <i class="icon"></i>-->
<!--                      </div>-->
                      <!-- //본인의 상품 확인 시 보이는 섹션 -->

                      <div class="detail-sub-title-wrap col-group">
                          <div class="detail-sub-title-group col-group">
                              <p class="detail-sub-title">
                            {{product.productCategory.title}}
                              </p>
                              <p class="detail-sub-title">
                                  {{ product.format_created_at }}
                              </p>
                          </div>
                          <div class="prod-btn-wrap col-group">
                              <div class="prod-btn col-group">
                                  <img src="/images/icon_view_gray.png" alt="" class="icon">
                                  <p class="txt">{{ product.count_view }}</p>
                              </div>
                              <div class="prod-btn col-group">
                                  <img src="/images/icon_chat_gray.png" alt="" class="icon">
                                  <p class="txt">{{ product.count_chat }}</p>
                              </div>
                              <div class="prod-btn col-group">
                                  <img src="/images/icon_like_gray.png" alt="" class="icon">
                                  <p class="txt">{{ product.count_like }}</p>
                              </div>
                          </div>
                      </div>
                      <h2 class="detail-title">
                          {{product.title}}
                          <div class="label">
                              {{ product.format_state }}
                          </div>
                          <div class="label hide" v-if="product.hide==1"> <!-- 숨김 -->
                              숨김
                          </div>
                      </h2>
                      <p class="detail-txt">
                          <editor-content :description="this.product.description" />
                      </p>
                      <div class="detail-prod-list col-group">
                          <div class="detail-prod-item" v-for="item in this.product.keywords" :key="item.id">
                              {{ item.title }}
                          </div>
                      </div>
                  </div>
                  <h4 class="product-detail-title col-group">
                      희망 거래 장소
                      <a href="" class="more-btn col-group">
                         {{ product.location.format_title }} <i></i>
                      </a>
                  </h4>
                  <div class="map-wrap">
                      <!-- * 카카오맵 - 지도퍼가기 -->
                      <!-- 1. 지도 노드 -->
                      <div id="map" class="root_daum_roughmap root_daum_roughmap_landing"></div>

                  </div>
              </div>

              <!-- 다른 유저의 상품 확인 시 보이는 섹션 -->
              <div class="product-detail-section container">
                  <div class="detail-profile-wrap col-group">
                      <button class="like-btn" :class="{'active':product.user.like==1}" @click="toggleLike(product.user,'User')"></button>
                      <div class="profile-img">
                          <img src="" alt="">
                      </div>
                      <div class="txt-wrap row-group">
                          <p class="title">
                            {{ product.user.nickname || product.user.name}}
                          </p>
                          <p class="txt">
                              {{ product.address }}
                          </p>
                      </div>
                  </div>

                  <div class="prod-list prod-half-list col-group">
                      <nuxt-link :to="`/products/${otherItem.id}`" class="prod-item row-group" v-if="index < 4" v-for="(otherItem,index) in otherProducts.data" key="randomItem.id">
                          <div class="item-img">
                              <img :src="otherItem.img.url ? otherItem.img.url : ''" />
                          </div>
                          <div class="item-txt-wrap">
                              <p class="title">
                                  {{ otherItem.title }}
                              </p>
                              <div class="price">

                                  {{ otherItem.format_price }}
                              </div>
                          </div>
                      </nuxt-link>
                  </div>
              </div>

              <div class="product-detail-section container">
                  <h4 class="product-detail-title">
                      이런 상품은 어떠세요?
                  </h4>
                  <div class="prod-list prod-half-list col-group" v-if="randomProducts">
                     <nuxt-link :to="`/products/${randomItem.id}`" class="prod-item row-group" v-if="index < 4" v-for="(randomItem,index) in randomProducts.data" key="randomItem.id">
                          <div class="item-img">
                              <img :src="randomItem.img.url ? randomItem.img.url : ''" />
                          </div>
                          <div class="item-txt-wrap">
                              <p class="title">
                                  {{ randomItem.title }}
                              </p>
                              <div class="price">
                                  <p class="label">
                                      {{ randomItem.format_type }}
                                  </p>
                                  {{ randomItem.format_price }}
                              </div>
                          </div>
                     </nuxt-link>
                  </div>
              </div>
              <!-- //다른 유저의 상품 확인 시 보이는 섹션 -->

              <!-- 본인의 상품 확인 시 보이는 섹션 -->
<!--              <div class="product-detail-section container">-->
<!--                  <h4 class="product-detail-title">-->
<!--                      내가 등록한 상품과 비슷한 상품이에요-->
<!--                  </h4>-->
<!--                  <div class="prod-list prod-half-list col-group">-->
<!--                      <nuxt-link :to="`/products/${similarProduct.id}`" class="prod-item row-group" v-for="similarProduct in similarProducts.data" :key="similarProduct.id">-->
<!--                          <div class="item-img">-->
<!--                              <img :src="similarProduct.img.url ? similarProduct.img.url : ''" />-->
<!--                          </div>-->
<!--                          <div class="item-txt-wrap">-->
<!--                              <p class="title">-->
<!--                                  {{ similarProduct.title }}-->
<!--                              </p>-->
<!--                              <div class="price">-->
<!--                                  <p class="label">-->
<!--                                      {{ similarProduct.format_type }}-->
<!--                                  </p>-->
<!--                                  {{ similarProduct.price }}-->
<!--                              </div>-->
<!--                          </div>-->
<!--                      </nuxt-link>-->
<!--                  </div>-->
<!--              </div>-->
              <!-- //본인의 상품 확인 시 보이는 섹션 -->
          </div>

          <div class="detail-footer-wrap">
              <div class="container col-group">
                  <button class="like-btn" :class="{'active':product.like==1}" @click="toggleLike(product, 'Product')"></button>
                  <div class="price">
                      <p class="label buy"> <!-- 삽니다 상태에서 buy 클래스 -->
                          삽니다
                      </p>
                      7,200만원
                  </div>
                  <a href="chat_detail.html" class="chat-btn"><!-- 다른 유저의 상품 확인 시 보이는 버튼 -->
                      <img src="/images/icon_chat_white.png" alt="" class="icon">
                      채팅하기
                  </a>

                  <!-- 본인의 상품 확인 시 보이는 버튼
                  <a href="chatting.html" class="chat-btn">
                      <img src="images/icon_chat_white.png" alt="" class="icon">
                      채팅 3
                  </a>
                   -->
              </div>
          </div>
      </main>

      <!-- 이미지 슬라이드 클릭시 나타나는 팝업 -->
      <div class="modal-container modal_slide">
          <div class="modal-wrap modal-slide-wrap">
              <i class="xi-close close-btn"></i>
              <div class="swiper slide_popup">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide">
                          <img src="/images/index_banner_01.png" />
                      </div>
                      <div class="swiper-slide">
                          <img src="/images/biz_program_01.png" />
                      </div>
                      <div class="swiper-slide">
                          <img src="/images/biz_program_02.png" />
                      </div>
                      <div class="swiper-slide">
                          <img src="/images/main_banner.png" />
                      </div>
                      <div class="swiper-slide">
                          <img src="/images/biz_program_03.png" />
                      </div>
                  </div>
                  <div class="swiper-pagination slide-popup-pagination"></div>
              </div>
          </div>
      </div>

      <!-- 신고하기 버튼 클릭시 나타나는 팝업 -->
      <div class="modal-container modal_report" :class="{'active':isReport}">
          <div class="modal-wrap">
              <i class="xi-close close-btn" @click="isReport=false"></i>
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

      <!-- 헤더 버튼 클릭시 나타나는 팝업 -->
      <div class="modal-container modal_chat" :class="{'active': isMore}">
          <div class="modal-select-wrap modal-wrap">

              <div class="chat-more-option-wrap row-group">
                  <button class="chat-more-option col-group">
                      <i class="icon"></i>
                      나눔중
                  </button>
                  <button class="chat-more-option col-group trans-btn">
                      <i class="icon"></i>
                      거래중
                  </button>
                  <a href="buyer_select.html" class="chat-more-option col-group trans-btn">
                      <i class="icon"></i>
                      나눔완료
                  </a>
                  <button class="chat-more-option col-group">
                      <i class="icon"></i>
                      숨기기
                  </button>
                  <button class="chat-more-option col-group">
                      <i class="icon"></i>
                      게시글 수정
                  </button>
                  <button class="chat-more-option col-group red">
                      <i class="icon red"></i>
                      삭제
                  </button>
              </div>


              <div class="modal-footer col-group">
                  <button class="modal-footer-btn close-btn" @click="isMore=false">
                      취소
                  </button>
              </div>
          </div>

      </div>
      <!-- //헤더 버튼 클릭시 나타나는 팝업 -->

      <!-- 거래중 버튼 클릭 시 팝업 -->
      <div class="modal-container modal_trans">
          <div class="modal-wrap modal-alert">
              <div class="modal-title-wrap">
                  <i class="icon blue"></i>
              </div>
              <p class="modal-alert-txt">
                  거래중으로 변경하면 서로 주고받은 <br>
                  거래후기가 취소됩니다. <br>
                  그래도 변경하시겠습니까?
              </p>

              <div class="modal-footer col-group">
                  <button class="modal-footer-btn close-btn">
                      취소
                  </button>
                  <button class="modal-footer-btn submit-btn">
                      변경하기
                  </button>
              </div>
          </div>
      </div>
      <!-- //거래중 버튼 클릭 시 팝업 -->
  </div>

  </body>
</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default{


  data() {

    return {
      form: new Form(this.$axios, {
          user_id:"",
          product_category_id : "",
          likeable_id:"",
          likeable_type:"",
      }),
        isReport:false,
        isMore:false,
        product: null,
        products:{
            data:[],
            meta: {

            }
        },
        randomProducts:{
          data:[],
        },
        similarProducts:{
          data:[],
        },
        otherProducts:{
          data:[],
        }

    }

  },



  methods: {

      getProduct() {
          this.$axios.get("/api/products/"+ this.$route.params.id, {

          }).then(response => {
              console.log(this.$auth.user.data.id);
              console.log(response.data.data);
              this.product = response.data.data;
              // this.form.product_category_id = response.data.data.product_category_id;
              this.form.user_id = response.data.data.user.id;
              this.form.likeable_id = response.data.data.like;
              // this.getSimilarProducts();
              this.getOtherProducts();
              this.getMap();

              this.$nextTick(() => {
                  this.initSwiper();
              });
          })
      },
      initSwiper(){
          var swiper = new Swiper(".detail-img-slide", {
              loop: true,
              autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
                  delay : 3000,   // 시간 설정
                  disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
              },
              pagination: {
                  el: '.detail-img-pagination',
              },
          });

//swiper 내 이미지 클릭시 팝업 열림
          $('.detail-img-slide .swiper-slide').click(function(){
              $('.modal_slide').addClass('active');
              var slide_popup = new Swiper(".slide_popup", {
                  loop: true,
                  pagination: {
                      el: '.slide-popup-pagination',
                  },
              });
          });
      },

      getRandomProducts() {
          this.$axios.get("/api/products/", {
              params: {
                  random: 1,
              },
          }).then(response => {
              this.randomProducts = response.data;
          })
      },
      getOtherProducts() {
          this.$axios.get("/api/products/", {
              params: this.form.data(),
          }).then(response => {
              this.otherProducts = response.data;
          })
      },
      // getSimilarProducts() {
      //     this.$axios.get("/api/products/", {
      //         params: this.form.data(),
      //     }).then(response => {
      //         console.log(response.data);
      //         this.similarProducts = response.data;
      //     })
      // },
      getProducts(loadMore) {
          this.$store.commit("setLoading", true);

          this.$axios.get("/api/products", {
          }).then(response => {
              if (loadMore)

                  return this.products.data = [...this.products.data, ...response.data.data];

              return this.products = response.data;
          })
      },

      loadMore() {
          var scrollTop = $('.index').scrollTop();

          var innerHeight = $('.index').innerHeight();

          var scrollHeight = $('.index').prop('scrollHeight');

          if (scrollTop + innerHeight >= scrollHeight - 250) {

              this.load = true;
              if(this.form.page < this.products.meta.last_page) {
                  this.form.page += 1;
                  return this.getProducts(this.load);
              };

          }
      },
      async getMap() {
          const getlat = this.product.lat;
          const getlon = this.product.lon;
          // Wait for Google Maps API to be ready
          await new Promise((resolve) => {
              const checkReady = setInterval(() => {
                  if (typeof google === 'object' && typeof google.maps === 'object') {
                      clearInterval(checkReady);
                      resolve();
                  }
              }, 100);

          });

          // Initialize and add the map
          const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 10,
              center: { lat: getlat, lng: getlon }, // Initial position
              mapId: "DEMO_MAP_ID",
          });

          // Add a marker
          new google.maps.Marker({
              position: { lat: getlat, lng: getlon },
              map,
              title: "Marker Title",
          });
      },
      toggleLike(data,type){
          if(type=="Product"){
              if(data.like == 0) {
                  this.form.likeable_type = data.id;
                  this.form.likeable_type = type;

                  this.form.post("/api/likes").then(response => {
                  this.product.like= 1;
                  })
              }
              else{
                  this.form.likeable_type = data.id;
                  this.form.likeable_type = type;

                  this.form.delete("/api/likes").then(response => {
                      this.product.like= 0;
                  })
              }
          }
          if(type=="User"){
              if(data.like == 0) {
                  this.form.likeable_type = data.id;
                  this.form.likeable_type = type;

                  this.form.post("/api/likes").then(response => {
                      this.product.user.like= 1;
                  })
              }
              else{
                  this.form.likeable_type = data.id;
                  this.form.likeable_type = type;

                  this.form.delete("/api/likes").then(response => {
                      this.product.user.like= 0;
                  })
              }
          }

      },
\

      clickMore(){
          this.isMore=true;
          console.log(this.isReport);
      },
  },

  computed: {
        getName(){
            return this.products.data.find(data => data.user.id = this.product.user.id);
        },
      user(){
            return this.$auth.user.data;
      }
  },

  mounted() {
      this.getProduct();
      // this.form.user_id = this.product.data.user_id;
      this.getProducts();
      this.getRandomProducts();
  }
};
</script>
