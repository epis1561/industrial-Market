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
                    판매 내역
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-tab-wrap col-group">
                <a href="#" class="tab-item" :class="{'active': isTransaction==0 && isHide==false}" @click.prevent="all">
                    판매중
                </a>
                <a href="#" class="tab-item" :class="{'active': isTransaction==1}" @click.prevent="complete">
                    거래완료
                </a>
                <a href="#" class="tab-item" :class="{'active': isHide==true}" @click.prevent="hide">
                    숨김
                </a>
            </div>
            <div class="container Sell">
                <div class="prod-list">
                    <div class="prod-item col-group complete relatived"  v-for="(product,index) in products.data" :key="product.id">
                        <nuxt-link :to="`/products/${product.id}`" class="prod-item col-group" >
                            <div class="item-img">
                                <div class="complete-box" v-if="product.state_transaction==2">
                                    {{ product.format_short_type }}완료
                                </div>
                                <img :src="product.img ? product.img.url:'/images/notification_icon_bg.png'" alt="">
                                <div class="ongoing" v-if="product.state_transaction ==1">
                                    거래중
                                </div>
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
                                    <p :class="`label label${product.type}`" v-if="product.hide==0">
                                        {{ product.format_state }}
                                    </p>
                                  <p class="label label1" v-if="product.hide==1">
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
                                        <p class="txt">{{ product.count_like }}</p>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                        <button class="block-btn" @click="hideOff(product.id); stopPropagation($event)" v-if="hiding==true">
                            숨김해제
                        </button>
                        <div class="item-btn-wrap col-group" v-if="product.state_transaction == 2">
                            <div class="item-btn-group col-group">
                                <nuxt-link :to="`/reviews/create/?id=${product.id}`" class="item-btn active"
                                           v-if="!product.reviewSend && product.state_transaction == 2">후기 보내기
                                </nuxt-link>
                                <nuxt-link :to="`/reviews/${product.reviewReceive.id}`" class="item-btn" v-if="product.reviewReceive && product.state_transaction == 2 && product.reviewReceive.emotion==1">받은 후기</nuxt-link>
                                <nuxt-link :to="`/reviews/${product.reviewSend.id}`" class="item-btn" v-if="product.reviewSend && product.state_transaction == 2 && product.reviewSend.emotion==1">보낸 후기</nuxt-link>
                            </div>
                            <button class="item-btn more-btn" @click="more(product.id,product.format_short_type)">
                                <i></i>
                            </button>
                        </div>
                      <div class="modal-container modal_chat modal_status" :class="{'active': isMore }" v-if="product">
                        <div class="modal-select-wrap modal-wrap">

                          <div class="chat-more-option-wrap row-group">
                            <button class="chat-more-option col-group" @click.prevent="isTrade=true">
                              <i class="icon"></i>
                              {{ short_type }}중
                            </button>
                            <button class="chat-more-option col-group" @click.prevent="hideTransaction()">
                              <i class="icon"></i>
                              숨기기
                            </button>
                            <button class="chat-more-option col-group" @click.prevent="store()">
                              <i class="icon"></i>
                              수정
                            </button>
                            <button class="chat-more-option col-group" @click.prevent="isDelete=true">
                              <i class="icon red"></i>
                              삭제
                            </button>
                          </div>
                          <div class="modal-footer col-group">
                            <button class="modal-footer-btn close-btn" @click="isMore = false">
                              취소
                            </button>
                          </div>
                        </div>

                      </div>
                      <div class="modal-container modal_trans" :class="{'active':isTrade}">
                        <div class="modal-wrap modal-alert">
                          <div class="modal-title-wrap">
                            <i class="icon blue"></i>
                          </div>
                          <p class="modal-alert-txt">
                            {{ product.format_short_type }}중으로 변경하면 서로 주고받은 <br>
                            거래후기가 취소됩니다. <br>
                            그래도 변경하시겠습니까?
                          </p>

                          <div class="modal-footer col-group">
                            <button class="modal-footer-btn close-btn" @click="isTrade=false">
                              취소
                            </button>
                            <button class="modal-footer-btn submit-btn" @click.prevent="changeTransaction(0), isTrade = false">
                              변경하기
                            </button>
                          </div>
                        </div>
                      </div>
                        <div class="modal-container modal_trans" :class="{'active':isDelete}">
                          <div class="modal-wrap modal-alert">
                            <div class="modal-title-wrap">
                              <i class="icon blue"></i>
                            </div>
                            <p class="modal-alert-txt">
                              정말 삭제하시겠습니까?
                            </p>

                            <div class="modal-footer col-group">
                              <button class="modal-footer-btn submit-btn" @click="isDelete=false">
                                삭제하기
                              </button>
                              <button class="modal-footer-btn close-btn" @click.prevent="remove, isDelete = false">
                                취소
                              </button>
                            </div>
                          </div>
                      </div>
                    </div>


            </div>
            </div>

        </main>
      <infinite-scroll v-if="products.meta" :loading="loading" :form="form" :meta="products.meta" :target-contents="'.prod-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getProducts(true);}"/>
    </div>
</template>

<style>
.prod-item{
    width: 100%;
}
</style>
<script>
import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                state_transactions: [],
                state_transaction:"",
                user_id: "",
                page: 1,
                hide:"",
            }),
            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            isTransaction:"",
            reportable_type : "Product",
            product_id: "",
            loading:false,
            isHide:false,
            hiding:false,
            isMore:false,
            isTrade:false,
            short_type:"",
            isDelete:false,
        };
    },

    methods: {
      remove() {
        this.form.delete("/api/products/" + this.product_id, {}).then(response => {
          this.form.page= 1;
          this.loading = false;
          this.isHide=false;
          this.form.hide="";
          this.hiding=false;
          return this.getProducts(false);
        })
      },
      store() {
        this.$router.push(`/products/create?id=${this.product_id}`)
      },
      changeTransaction() {
        this.isTrade = false;
        this.form.state_transaction = 0;
        this.form.patch("/api/products/updateStateTransaction/" + this.product_id).then(() => {
          this.isMore=false;
          this.form.state_transactions = [2];
          this.form.state_transaction = "";
         this.complete();
        })
      },
        getProducts(loadMore = false) {

            this.form.user_id = this.user.id;
            this.loading = true;
          console.log('트랜잭션',this.form.state_transactions);
          console.log('페이지',this.form.page);
          console.log('하이드여부',this.form.hide);
          console.log('유저아이디',this.form.user_id);
          console.log('트랜잭션',this.form.state_transaction);
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
              console.log('결과',response.data);
                this.loading = false;
                if(this.isHide==true)
                  this.hiding=true;
                if (loadMore){
                    this.products.data = [...this.products.data, ...response.data.data];
                    return this.products.meta = response.data.meta;
                }

                this.products = response.data;
                console.log(this.products.meta);
            })
        },
        all() {
          $('.subpage').scrollTop(0);
            this.form.state_transactions = [0,1];
            this.isTransaction =0;
            this.form.page= 1;
            this.loading = false;
            this.isHide=false;
            this.form.hide="";
            this.hiding=false;
            return this.getProducts(false);
        },
        complete() {
          console.log('컴플리트발동');
          $('.subpage').scrollTop(0);
            this.form.state_transactions = [2];

            this.isTransaction =1;
            this.form.page= 1;
            this.loading = false;
            this.isHide=false;
            this.form.hide="";
            this.hiding=false;
            return this.getProducts(false);

        },
        hide() {
          $('.subpage').scrollTop(0);
            this.form.state_transactions = [];
            this.isTransaction ="";
            this.form.page= 1;
            this.form.hide=1;
            this.loading = false;
            this.isHide=true;
            return this.getProducts(false);
        },
        leave(){
            this.$router.back();
        },
        close(){
            this.isReport=false;
        },

        hideTransaction(){
          this.form.hide = 1;
          this.isMore=false;
          console.log(this.product_id);
          this.form.patch("/api/products/updateHide/" + this.product_id, {

          }).then(response => {
            this.form.state_transactions = [2];
            this.isTransaction =1;
            this.form.page= 1;
            this.loading = false;
            this.isHide=false;
            this.form.hide="";
            this.hiding=false;
            return this.getProducts(false);

          })
        },
      hideOff(id){
        this.form.hide = 0;
        console.log(id)
        this.form.patch("/api/products/updateHide/" + id, {}).then(response => {
          this.form.state_transactions = [];
          this.isTransaction ="";
          this.form.page= 1;
          this.form.hide=1;
          this.loading = false;
          this.isHide=true;
          return this.getProducts(false);
        })
      },
      more(id,type){
        this.isMore=true;
        this.product_id=id;
        this.short_type = type;
        console.log(id);
        console.log(type);
      },
        stopPropagation(event) {
            event.stopPropagation(); // 이벤트 전파 중지
        }
    },

    computed: {
        user(){
            return this.$auth.user.data;
        }
    },
    watch: {},
    mounted() {
        if(this.$route.query.id == 1){
            this.form.state_transactions = [0,1];
            this.isTransaction=0;
        }
        else if(this.$route.query.id == 2){
            this.form.state_transactions = [2];
            this.isTransaction=1
        }
        this.getProducts();
    }
}
</script>