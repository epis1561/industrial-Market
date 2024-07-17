<template>
    <body>

    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="detail-header" v-if="product" :class="{'active':isScroll}">
            <div class="container col-group">
                <div class="sub-header-btn-wrap col-group">
                    <a href="javascript:window.history.back();" class="sub-header-btn prev-btn"></a>
                    <nuxt-link to="/" class="sub-header-btn home-btn"></nuxt-link>
                    <!--  인덱스로가는게 맞음. 일단 지금 인덱스는 로그인페이지라 놔두자.-->
                </div>
                <div class="sub-header-btn-wrap col-group">
                    <button class="sub-header-btn share-btn" @click.prevent="copy"></button>
                    <button class="sub-header-btn report-btn" @click="goReport" v-if="user.id != product.user.id"></button>
                    <!-- 다른 유저의 상품 확인 시 보이는 버튼 -->
                    <button class="sub-header-btn more-btn" v-if="user.id == product.user.id" @click="isMore=true">
                        <!-- 본인의 상품 확인 시 보이는 버튼 -->
                        <i class="icon"></i>
                    </button>
                </div>
            </div>
        </header>
        <!-- header End -->

        <main class="products_detail  product" v-if="product">
            <div class="detail-img-wrap">
                <div class="swiper detail-img-slide">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="img in product.imgs" :key="img.id" @click="isImg=true">
                            <div class="img-container">
                                <img :src="img.url ? img.url : '/images/notification_icon_bg.png'"/>
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
                                              <div class="detail-status-select col-group" v-if="this.$auth.user.data.id == product.user.id"  @click="isSelect = true">
                                                  <div class="txt">
                                                      {{ product.format_state }}
                                                  </div>
                                                  <i class="icon"></i>
                                              </div>
                        <!-- //본인의 상품 확인 시 보이는 섹션 -->

                        <div class="detail-sub-title-wrap col-group">
                            <div class="detail-sub-title-group col-group">
                                <p class="detail-sub-title">
                                    {{ product.productCategory.title }}
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
                                    <p class="txt">{{ count_like }}</p>
                                </div>
                            </div>
                        </div>
                        <h2 class="detail-title state" @click="console">
                            {{ product.title }}
                            <div :class="'label label' + product.state">
                                {{ product.format_state }}
                            </div>

                        </h2>
                        <p class="detail-txt">
                            <editor-content :description="product.description"/>
                        </p>
                        <div class="detail-prod-list col-group">
                            <div class="detail-prod-item" v-for="(item,index) in this.product.keywords" :key="item.id" v-if="index < 5">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>

                    <h4 class="product-detail-title col-group">
                        희망 거래 장소
                        <a href="" class="more-btn col-group" @click.prevent="showMap=true">
                            {{ product.address_detail }} <i></i>
                        </a>
                        <!--큰지도-->
                        <div class="modal-container modal_addr" :class="{'active':showMap==true}">
                            <div class="modal-wrap">
                                <i class="xi-close close-btn" @click="showMap=false"></i>
                                <div class="map-wrap">
                                    <div id="map1" class="root_daum_roughmap root_daum_roughmap_landing"></div> <!-- 구글지도 변경 필요 -->
                                </div>
                            </div>
                        </div>
                        <!--큰지도-->
                    </h4>
                    <div class="map-wrap">
                        <!-- * 카카오맵 - 지도퍼가기 -->
                        <!-- 1. 지도 노드 -->
                        <div id="map" class="root_daum_roughmap root_daum_roughmap_landing" @click="showMap=true"></div>

                    </div>
                </div>

                <!-- 다른 유저의 상품 확인 시 보이는 섹션 -->
                <div class="product-detail-section container">
                    <div class="detail-profile-wrap col-group">
                        <button class="like-btn" :class="{'active':product.user.like==1}"
                                @click="toggleLike(product,'User')" v-if="product.user.id !=$auth.user.data.id"></button>
                        <div class="profile-img">
                            <img :src="product.user.img ? product.user.img.url : '/images/notification_icon_bg.png'" alt="" v-if="product.user.img">
                        </div>
                        <div class="txt-wrap row-group">
                            <p class="title">
                                {{ product.user.nickname || product.user.name }}
                            </p>
                            <p class="txt">
                                {{  $auth.user.data.activeCounty ? $auth.user.data.activeCounty.city.title  + " " + $auth.user.data.activeCounty.title: ''   }}
                            </p>
                        </div>
                    </div>

                    <div class="prod-list prod-half-list col-group">
                        <nuxt-link :to="`/products/${otherItem.id}`" class="prod-item row-group" v-if="index < 4"
                                   v-for="(otherItem,index) in otherProducts.data" :key="otherItem.id">
                            <div class="item-img">
                                <img :src="otherItem.img.url ? otherItem.img.url : '/images/notification_icon_bg.png'"/>
                            </div>
                            <div class="item-txt-wrap">
                                <p class="title">
                                    {{ otherItem.title }}
                                </p>
                                <div class="price">
                                    <p :class="'label label' + otherItem.type" v-if="otherItem.type !=0 && otherItem.type==1">
                                        {{ otherItem.format_type }}
                                    </p>
                                    <p :class="'label label' + otherItem.type" v-if="otherItem.type ==2">
                                        {{ otherItem.format_short_type }}
                                    </p>
                                    <div v-if="otherItem.offer_price ==0 && otherItem.type!=2">
                                        {{ otherItem.format_price }}
                                    </div>
                                    <div v-if="otherItem.offer_price ==1 && otherItem.type!=2">
                                        가격협의
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>

                <div class="product-detail-section container" v-if="$auth.user.data.id != product.user.id">
                    <h4 class="product-detail-title">
                        이런 상품은 어떠세요?
                    </h4>
                    <div class="prod-list prod-half-list col-group" v-if="randomProducts">
                        <nuxt-link :to="`/products/${randomItem.id}`" class="prod-item row-group" v-if="index < 4" v-for="(randomItem,index) in randomProducts.data.filter(randomProduct => randomProduct.id != product.id)" :key="randomItem.id">
                            <div class="item-img">
                                <img :src="randomItem.img.url ? randomItem.img.url : '/images/notification_icon_bg.png'"/>
                            </div>
                            <div class="item-txt-wrap">
                                <p class="title">
                                    {{ randomItem.title }}
                                </p>
                                <div class="price">
                                    <p :class="'label label' + randomItem.type" v-if="randomItem.type !=0 && randomItem.type==1">
                                        {{ randomItem.format_type }}
                                    </p>
                                    <p :class="'label label' + randomItem.type" v-if="randomItem.type ==2">
                                        {{ randomItem.format_short_type }}
                                    </p>
                                    <div v-if="randomItem.offer_price ==0 && randomItem.type!=2">
                                        {{ randomItem.format_price }}
                                    </div>
                                    <div v-if="randomItem.offer_price ==1 && randomItem.type!=2">
                                        가격협의
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <!-- //다른 유저의 상품 확인 시 보이는 섹션 -->

                <!-- 본인의 상품 확인 시 보이는 섹션 -->
                              <div class="product-detail-section container" v-if="$auth.user.data.id == product.user.id">
                                  <h4 class="product-detail-title">
                                      내가 등록한 상품과 비슷한 상품이에요
                                  </h4>
                                  <div class="prod-list prod-half-list col-group" v-if="similarProducts">
                                      <nuxt-link :to="`/products/${similarProduct.id}`" class="prod-item row-group" v-for="(similarProduct,index) in similarProducts.data" :key="similarProduct.id" v-if="index < 4">
                                          <div class="item-img">
                                              <img :src="similarProduct.img.url ? similarProduct.img.url : '/images/notification_icon_bg.png'" />
                                          </div>
                                          <div class="item-txt-wrap">
                                              <p class="title">
                                                  {{ similarProduct.title }}
                                              </p>
                                              <div class="price">
                                                  <p :class="'label label' + similarProduct.type" v-if="similarProduct.type !=0 && similarProduct.type==1">
                                                      {{ similarProduct.format_type }}
                                                  </p>
                                                  <p :class="'label label' + similarProduct.type" v-if="similarProduct.type ==2">
                                                      {{ similarProduct.format_short_type }}
                                                  </p>
                                                  <div v-if="similarProduct.offer_price ==0 && similarProduct.type!=2">
                                                      {{ similarProduct.format_price }}
                                                  </div>
                                                  <div v-if="similarProduct.offer_price ==1 && similarProduct.type!=2">
                                                      가격협의
                                                  </div>
                                              </div>
                                          </div>
                                      </nuxt-link>
                                  </div>
                              </div>
                <!-- //본인의 상품 확인 시 보이는 섹션 -->
            </div>

            <div class="detail-footer-wrap">
                <div class="container col-group">
                    <button class="like-btn" :class="{'active':product.like==1}"
                            @click="toggleLike(product, 'Product')"></button>
                    <div class="price" v-if="product.type!=2">
                        <p :class="'label label' + product.type"> <!-- 삽니다 상태에서 buy 클래스 -->
                            {{ product.format_short_type }}
                        </p>
                        <div v-if="product.offer_price ==0 && product.type!=2">
                            {{ product.format_price }}
                        </div>
                        <div v-if="product.offer_price ==1 && product.type!=2">
                            가격협의
                        </div>

                    </div>
                    <div class="price" v-if="product.type==2">
                        <p :class="'label label' + product.type"> <!-- 삽니다 상태에서 buy 클래스 -->
                            {{ product.format_short_type }}
                        </p>
                        나눔합니다
                    </div>
                    <button type="button" class="chat-btn" @click.prevent="storeChat" v-if="user.id != product.user.id"><!-- 다른 유저의 상품 확인 시 보이는 버튼 -->
                        <img src="/images/icon_chat_white.png" alt="" class="icon">
                        채팅하기
                    </button>
                    <!-- 본인의 상품 확인 시 보이는 버튼-->
                  <nuxt-link :to="`/chats?product_id=${product.id}`" class="chat-btn" v-if="user.id == product.user.id && product.count_chat == 1">
                    <img src="/images/icon_chat_white.png" alt="" class="icon">
                    채팅 {{product.count_chat}}
                  </nuxt-link>
                  <nuxt-link :to="/chats/" class="chat-btn" v-if="user.id == product.user.id && (product.count_chat == 0 || product.count_chat > 1)">
                    <img src="/images/icon_chat_white.png" alt="" class="icon">
                    채팅 {{product.count_chat}}
                  </nuxt-link>
                </div>
            </div>
        </main>
      <report :is-report="isReport" :type="reportable_type" :id="product_id" @created="leave" @close="close"/>
        <!-- 이미지 슬라이드 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_slide" :class="{active:isImg}" v-if="product">
            <div class="modal-wrap modal-slide-wrap">
                <i class="xi-close close-btn" @click="isImg=false"></i>
                <div class="swiper slide_popup">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="img in product.imgs" :key="img.id">
                            <img :src="img.url ? img.url : ''"/>
                        </div>
                    </div>
                    <div class="swiper-pagination slide-popup-pagination"></div>
                </div>
            </div>
        </div>

        <!-- 신고하기 버튼 클릭시 나타나는 팝업 -->



        <!-- 헤더 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_chat" :class="{'active': isMore}" v-if="product" @click="isMore=false">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
<!--                    <button class="chat-more-option col-group" v-if="product.state_transaction!=0"-->
<!--                            @click.prevent="changeTransaction(0)">-->
<!--                        <i class="icon"></i>-->
<!--                        {{ product.format_short_type }}대기-->
<!--                    </button>-->
<!--                    <button class="chat-more-option col-group trans-btn" v-if="product.state_transaction!=1"-->
<!--                            @click="isTrade=true">-->

<!--                        <i class="icon"></i>-->
<!--                        거래중-->
<!--                    </button>-->
<!--                    <a href="#" class="chat-more-option col-group trans-btn"-->
<!--                       v-if="product.state_transaction!=2" @click.prevent="changeTransaction(2)">-->
<!--                        <i class="icon"></i>-->
<!--                        {{ product.format_short_type }}완료-->
<!--                    </a>-->
                    <button class="chat-more-option col-group" @click="hideTransaction(product.hide)"
                            v-if="product.hide==0">
                        <i class="icon"></i>
                        숨기기
                    </button>
                    <button class="chat-more-option col-group" @click="hideTransaction(product.hide)"
                            v-if="product.hide==1">
                        <i class="icon">
                            <i class="xi-eye"></i>
                        </i>
                        숨기지않기
                    </button>
                    <button class="chat-more-option col-group" @click="store(product.id)">
                        <i class="icon"></i>
                        게시글 수정
                    </button>
                    <button class="chat-more-option col-group red" @click="remove()">
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
        <!--        셀렉트버튼 클릭시 나오는 팝업     -->
        <div class="modal-container modal_chat modal_status" :class="{'active': isSelect }" v-if="product">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
                    <button class="chat-more-option col-group" v-if="product.state_transaction!=0" @click.prevent="changeTransaction(0),isSelect = false">
                        <i class="icon"></i>
                        {{ product.format_short_type }}중
                    </button>
                    <button class="chat-more-option col-group trans-btn" v-if="product.state_transaction!=1" @click="trading(1)">
                        <i class="icon"></i>
                        거래중
                    </button>
                    <a href="#" class="chat-more-option col-group trans-btn" v-if="product.state_transaction!=2" @click.prevent="changeTransaction(2),isSelect = false">
                        <i class="icon"></i>
                        {{ product.format_short_type }}완료
                    </a>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isSelect = false">
                        취소
                    </button>
                </div>
            </div>

        </div>
        <!--        셀렉트버튼 클릭시 나오는 팝업     -->
        <!-- 거래중 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_trans" :class="{'active':isTrade && this.form.state_transaction==2}">
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
                    <button class="modal-footer-btn close-btn" @click="isTrade=false">
                        취소
                    </button>
                    <button class="modal-footer-btn submit-btn" @click.prevent="changeTransaction(1), isSelect = false">
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
    .product .modal-wrap{
        padding: 0;
    }
    .modal_addr .map-wrap{
        height: 100%;
    }
    .detail-txt .ql-editor > *{
        line-height: 1.5;
        padding: 0;
    }
</style>
<script>

import Form from "@/utils/Form";

export default {
    middleware: ["user"],

    data() {

        return {
            form: new Form(this.$axios, {
                user_id: "",
                product_category_id: "",
                likeable_id: "",
                likeable_type: "",
                page: 1,
                state_transaction: "",
                hide: "",
                product_id: "",
            }),
            similarForm: new Form(this.$axios, {
                user_id: "",
                product_category_id: "",
                except_user_id: "",
                likeable_id: "",
                likeable_type: "",
                page: 1,
                state_transaction: "",
                hide: "",
                product_id: "",
            }),
            reportForm: new Form(this.$axios, {
                reportable_id: "",
                reportable_type: "",
                report_category_id: "",
                description: "",
            }),
            randomForm: new Form(this.$axios,{
                product_category_id:"",
                random:1,
            }),
            isDisabled: true,
            count_like: "",
            isLikeProduct: "",
            isLikeUser: "",
            isReport: false,
            isMore: false,
            isImg: false,
            product: null,
            isTrade: false,
            showMap: false,
            isSelect: false,
            isScroll:false,
            isReportEmpty:false,
            product_id: "",
          reportable_type : "Product",
            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            randomProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            similarProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            otherProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            ReportCategories: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            }
        }

    },


    methods: {
      console(){
        console.log(this.product_id);
      },
        copy(){

          if(/WEBVIEW/.test(navigator.userAgent)) {

            window.postMessage(JSON.stringify({
              key: "SHARE",
              value: {
                title: this.product.title,
                message: this.product.description,
                url: `https://industrialmarket.biz/products/${this.product.id}`,
              }
            }))
          }
          else
          {
            // 기존 url복사부분
            var url = '';
            var textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            url = window.document.location.href;
            textarea.value = url;
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);

            this.$store.commit("setPop", {
              description: "URL이 복사되었습니다."
            })
          }
        },

        getProduct() {
            this.$axios.get("/api/products/" + this.$route.params.id, {}).then(response => {


                this.product = response.data.data;
                console.log(this.product);
                // this.form.product_category_id = response.data.data.product_category_id;
                this.form.user_id = response.data.data.user.id;
                this.form.likeable_id = response.data.data.like;
                this.count_like = response.data.data.count_like;
                this.similarForm.product_category_id = response.data.data.product_category_id;
                this.randomForm.product_category_id = response.data.data.product_category_id;
                this.similarForm.except_user_id = response.data.data.user.id;
                this.form.state_transaction = response.data.data.state_transaction;
                console.log(response.data.data.user.id);
                console.log(this.similarForm.except_user_id);
                this.getSimilarProducts();
                this.getOtherProducts();
                this.getRandomProducts();
                this.getMap();
                this.getMap2();
                this.$nextTick(() => {
                    this.initSwiper();
                    this.detailSwiper();
                });
            })
        },
        initSwiper() {
            var swiper = new Swiper(".detail-img-slide", {
                        loop: true,
                        autoplay: {  // 자동 슬라이드 설정 , 비 활성화 시 false
                            delay: 3000,   // 시간 설정
                            disableOnInteraction: false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
                        },
                        pagination: {
                            el: '.detail-img-pagination',
                        },
                    }
            )
        },
        detailSwiper() {
            var slide_popup = new Swiper(".slide_popup", {
                loop: true,
                pagination: {
                    el: '.slide-popup-pagination',
                },
            });
        },
        getRandomProducts() {
            this.$axios.get("/api/products/", {
                params:this.randomForm.data(),
            }).then(response => {

                this.randomProducts = response.data;
            })
        },
        getOtherProducts() {
            this.form.user_id = this.product.user.id;
            this.product_id = this.product.id;

            this.$axios.get("/api/products/", {
                params: this.form.data(),

            }).then(response => {
                this.otherProducts = response.data
                console.log(this.otherProducts.data);
                this.otherProducts.data =this.otherProducts.data.filter(products =>{
                    return products.id != this.product_id;
                })
            })
        },
        getSimilarProducts() {

            this.$axios.get("/api/products/", {
                params: this.similarForm.data(),
            }).then(response => {
                this.similarProducts = response.data;
            })
        },
        getProducts(loadMore) {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/products", {}).then(response => {
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
                if (this.form.page < this.products.meta.last_page) {
                    this.form.page += 1;
                    return this.getProducts(this.load);
                }
                ;

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
                zoom: 13,
                center: {lat: getlat, lng: getlon}, // Initial position
                mapId: "DEMO_MAP_ID",
                disableDefaultUI: true,
            });

            // Add a marker
            new google.maps.Marker({
                position: {lat: getlat, lng: getlon},
                map,
                title: "Marker Title",
            });
        },
        async getMap2() {
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
            const map1 = new google.maps.Map(document.getElementById("map1"), {
                zoom: 17,
                center: {lat: getlat, lng: getlon}, // Initial position
                mapId: "DEMO_MAP_ID",
                disableDefaultUI: true,
            });

            // Add a marker
            new google.maps.Marker({
                position: {lat: getlat, lng: getlon},
                map: map1,
                title: "Marker Title",
            });
        },
        toggleLike(data, type) {

            if (type == "Product") {

                if (data.like == 0) {
                    this.product.like = 1;
                    this.isLikeProduct = 1;
                    this.form.likeable_id = data.id;
                    this.form.likeable_type = type;

                    this.form.post("/api/likes", {
                        params: this.form.data()
                    }).then(response => {

                    });
                } else {
                    this.product.like = 0;
                    this.isLikeProduct = 0;
                    this.form.likeable_id = data.id;
                    this.form.likeable_type = type;

                    this.form.delete("/api/likes", {
                        params: this.form.data()
                    }).then(response => {

                    });
                }

            } else if (type == "User") {
                if (data.user.like == 0) {
                    this.product.user.like = 1;
                    this.isLikeUser = 1;
                    this.form.likeable_id = this.product.user.id;

                    this.form.likeable_type = type;

                    this.form.post("/api/likes", {
                        params: this.form.data()
                    }).then(response => {

                    });
                } else {
                    this.product.user.like = 0;
                    this.isLikeUser = 0;
                    this.form.likeable_id = this.product.user.id;

                    this.form.likeable_type = type;

                    this.form.delete("/api/likes", {
                        params: this.form.data()
                    }).then(response => {

                    });
                }
            }
        },
        clickMore() {
            this.isMore = true;

        },
        getReportCategories() {
            this.$axios.get("/api/reportCategories", {
                params: this.form.data(),
            }).then(response => {

                this.ReportCategories = response.data;
            })
        },
        enable(num) {
            if (num === 5) {
                this.isDisabled = false;  // 5번째 카테고리일 때만 입력 상자를 활성화
            } else {
                this.isDisabled = true;   // 그 외의 경우에는 입력 상자를 비활성화
            }
        },
        submitReport(id, type) {
            this.reportForm.reportable_id = id;
            this.reportForm.reportable_type = type;
            if(!this.reportForm.reportable_type){
                this.isReportEmpty=true;
            }
            else{
                this.reportForm.post("/api/reports").then(response => {
                    this.$store.commit("setPop", {
                        description: "신고가 접수되었습니다."
                    });
                    this.isReport=false;
                    this.isReportEmpty=false;
                })
            }

        },
        changeTransaction(stateTransaction) {

            this.isTrade = false;
            this.form.state_transaction = stateTransaction;
            if (stateTransaction == 2) {
                return this.$router.push(`/mypage/products/buyer_select/?id=${this.product.id}`);
            }
            this.form.patch("/api/products/updateStateTransaction/" + this.$route.params.id).then(response => {

                this.product = response.data;

            })
        },
        hideTransaction(num) {
            this.isMore = false;
            if (num == 1) {
                this.form.hide = 0;
            } else {
                this.form.hide = 1;
            }
            this.form.patch("/api/products/updateHide/" + this.$route.params.id, {}).then(response => {

                this.product = response.data;
            })
        },

        remove() {
            this.form.delete("/api/products/" + this.$route.params.id, {}).then(response => {
                return this.$router.push("/products");
            })
        },
        store(id) {
            this.$router.push(`/products/create?id=${id}`)
        },
        storeChat() {
            this.$store.commit("setLoading", true);

            this.form.product_id = this.product.id;

            this.form.post("/api/chats")
                    .then(response => {
                        {
                            this.$router.push(`/chats/${response.data.id}`);
                            //     남에꺼
                        }

                    })
        },
        handleScroll(){
            // 스크롤 위치가 일정 값 이상이면 isScroll을 true로 설정
            if (window.scrollY > 100) { // 예시로 100px 이상 스크롤 시 true로 설정
                this.isScroll = true;
            } else {
                this.isScroll = false;
            }
        },
        trading(num) {
            if (this.form.state_transaction == 2) {
                this.isTrade = true;
            }
            else{
                this.isSelect=false;
                this.form.state_transaction = 1;
                this.form.patch("/api/products/updateStateTransaction/" + this.$route.params.id).then(response => {

                    this.product = response.data;

                })
            }

        },
      leave(){
        this.$router.back();
      },
      close(){
        this.isReport=false;
      },
      goReport(){
        this.product_id = this.product.id;
        console.log(this.product_id);
        this.isReport=true;
      }
    },


    computed: {

        user() {
            return this.$auth.user.data;
        },
        locate(){
            let locations= [this.product.city,this.product.county,this.product.town,this.product.town2];

            let items=[];

            for(let i = 0; i<locations.length; i++){
                if(items.length==2)
                    return items.join(' ');

                if(locations[i])
                    items.push(locations[i]);
            }

            return items.join(' ');
        },




    },
watch:{
    'isLikeProduct': function(newValue, oldValue) {
        if (newValue === 1) {
            this.count_like+=1;
        } else {
            if(this.count_like ===0){
                return;
            }
            this.count_like-=1;
        }
    },


},
    mounted() {
        this.getProduct();
        this.getProducts();
        this.getReportCategories();
        window.addEventListener('scroll', this.handleScroll);
        console.log(this.$auth.user.data);
    }
};
</script>
