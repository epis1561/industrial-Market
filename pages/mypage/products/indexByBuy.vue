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
                    구매 내역
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="prod-list">
                    <div class="prod-item col-group complete" v-for="product in products.data" :key="product.id">
                        <nuxt-link :to="`/products/${product.id}`" class="prod-item-group col-group">
                            <div class="item-img">
                                <div class="complete-box">
                                    {{ product.format_state }}
                                </div>
                                <img :src="product.img ? product.img.url : '/images/notification_icon_bg.png'" alt="">
                            </div>
                            <div class="item-txt-wrap">
                                <p class="title">
                                    {{ product.title }}
                                </p>
                                <div class="sub-txt-group col-group">
                                    <p class="sub-txt">
                                        {{ product.city.title + " " + product.county.title }}
                                    </p>
                                    <p class="sub-txt">
                                        {{ product.format_created_at }}
                                    </p>
                                </div>
                                <div class="price">
                                    <p :class="`label label${product.type}`">
                                        {{ product.format_state }}
                                    </p>
                                    <div v-if="product.offer_price ==0 && product.type!=2">
                                        {{ product.format_price }}
                                    </div>
                                    <div v-if="product.offer_price ==1 && product.type!=2">
                                        가격협의
                                    </div>
                                </div>
                                <div class="prod-btn-wrap col-group">
                                    <div class="prod-btn col-group">
                                        <img src="/images/icon_chat_gray.png" alt="" class="icon">
                                        <p class="txt">{{ product.count_chat }}</p>
                                    </div>
                                    <div class="prod-btn col-group">
                                        <img src="/images/icon_like_gray.png" alt="" class="icon">
                                        <p class="txt">{{product.count_like}}</p>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>

                        <div class="item-btn-wrap col-group">
                            <div class="item-btn-group col-group">
                                <nuxt-link :to="`/reviews/create/?id=${product.id}`" class="item-btn active" v-if="!product.reviewSend && product.state_transaction == 2">후기 보내기</nuxt-link>
                                <nuxt-link :to="`/reviews/${product.reviewReceive.id}`" class="item-btn" v-if="product.reviewReceive && product.state_transaction == 2 && product.reviewReceive.emotion==1" >받은 후기</nuxt-link>
                                <nuxt-link :to="`/reviews/${product.reviewSend.id}`" class="item-btn" v-if="product.reviewSend && product.state_transaction == 2 && product.reviewSend.emotion==1">보낸 후기</nuxt-link>
                            </div>
                            <button class="item-btn more-btn" @click="isDelete=true">
                                <i></i>
                            </button>
                        </div>
                      <div class="modal-container modal_trans" :class="{'active':deleteProd}">
                        <div class="modal-wrap modal-alert">
                          <div class="modal-title-wrap">
                            <i class="icon blue"></i>
                          </div>
                          <p class="modal-alert-txt">
                            구매내역에서 이 상품을 삭제하시겠습니까?
                          </p>

                          <div class="modal-footer col-group">
                            <button class="modal-footer-btn submit-btn" @click="remove(product.id)">
                              삭제
                            </button>
                            <button class="modal-footer-btn close-btn" @click.prevent="deleteProd=false">
                              취소
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>

        </main>
        <infinite-scroll v-if="products.meta" :loading="loading" :form="form" :meta="products.meta" :target-contents="'.prod-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getProducts(true);}"  />
        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
        </div>
        <!-- gnb End -->

        <!-- 더보기 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_chat" :class="{'active':isDelete}">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
<!--                    <a href="review_create.html" class="chat-more-option col-group">-->
<!--                        <i class="icon"></i>-->
<!--                        후기 보내기-->
<!--                    </a>-->
                    <button class="chat-more-option col-group red" @click="deleteProd=true, isDelete=false">
                        <i class="icon red"></i>
                        목록에서 삭제
                    </button>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isDelete=false">
                        취소
                    </button>
                </div>
            </div>

        </div>
        <!-- //더보기 버튼 클릭시 나타나는 팝업 -->
    </div>
</template>

<style>

</style>
<script>

import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                page: 1,
                archive:0,
                buyer_id:"",
                state_transaction:"",
                hide:"",
            }),
            products:{
                data:[],
                meta:{
                    current_page:1,
                    last_page:1,
                }
            },
            loading:false,
            isDelete:false,
            id:"",
           deleteProd:false,
        }
    },

    methods: {
            getProducts(loadMore = false){
                this.loading = true;
                this.$store.commit("setLoading", true);
                this.form.buyer_id=this.$auth.user.data.id;
                console.log(this.form.buyer_id);
                this.form.state_transaction = 2;
                this.$axios.get("/api/products/",{
                    params: this.form.data(),
                }).then(response => {
                    console.log(response.data);

                    this.loading = false;

                    if(loadMore){
                        this.products.data = [...this.products.data, ...response.data.data];

                        return this.products.meta = response.data.meta;
                    }


                    this.products = response.data;

                })
            },

        remove(num){
               this.form.archive =1;
          this.id=num;
               console.log(this.form.archive);
               console.log(this.id);
               this.form.patch("/api/products/updateArchive/"+ this.id)
                       .then(response => {
                           this.isDelete=false;
                           this.products.data = this.products.data.filter(itemData => itemData.id != this.id);

                console.log("성공했습니다");
                       })
        }
    },

    computed: {},

    watch: {},


    mounted() {
    this.getProducts();
    },

};
</script>
