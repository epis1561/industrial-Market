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
            <div class="container">
                <div class="prod-list">
                    <div class="prod-item col-group complete"  v-for="product in products.data" :key="product.id">
                        <nuxt-link :to="`/products/${product.id}`" class="prod-item col-group">
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
                                    <p :class="`label label${product.type}`">
                                        {{ product.format_state }}
                                    </p>
                                    <div v-if="product.offer_price ==0 && product.type!=2">
                                        {{ product.format_price }}
                                    </div>
                                    <div v-if="product.offer_price ==1 && product.type!=2">
                                        협의
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
                        <div class="item-btn-wrap col-group" v-if="product.state_transaction == 2">
                            <div class="item-btn-group col-group">
                                <nuxt-link :to="`/reviews/create/?id=${product.id}`" class="item-btn active"
                                           v-if="!product.reviewSend && product.state_transaction == 2">후기 보내기
                                </nuxt-link>
                                <nuxt-link :to="`/reviews/${product.reviewReceive.id}`" class="item-btn" v-if="product.reviewReceive && product.state_transaction == 2 && product.reviewReceive.emotion==1">받은 후기</nuxt-link>
                                <nuxt-link :to="`/reviews/${product.reviewSend.id}`" class="item-btn" v-if="product.reviewSend && product.state_transaction == 2 && product.reviewSend.emotion==1">보낸 후기</nuxt-link>
                            </div>
                            <button class="item-btn more-btn" @click="isReport=true,product_id = product.id">
                                <i></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <infinite-scroll v-if="products.meta" :loading="loading" :form="form" :meta="products.meta" :target-contents="'.prod-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getProducts(true);}"/>
            <report :is-report="isReport" :type="reportable_type" :id="product_id" @created="leave" @close="close"/>
        </main>
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
            isReport:false,
            reportable_type : "Product",
            product_id: "",
            loading:false,
            isHide:false,
        };
    },

    methods: {
        getProducts(loadMore = false) {
            this.form.user_id = this.user.id;
            this.loading = true;

            this.$store.commit("setLoading", true);
            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                this.loading = false;
                if (loadMore){
                    this.products.data = [...this.products.data, ...response.data.data];
                    console.log(this.form.page);
                    console.log(response.data);
                    return this.products.meta = response.data.meta;
                }

                this.products = response.data;
            })
        },
        all() {
            this.form.state_transactions = [0,1];
            this.isTransaction =0;
            this.form.page= 1;
            this.loading = false;
            this.isHide=false;
            this.form.hide="";
            return this.getProducts(false);
        },
        complete() {
            this.form.state_transactions = [2];
            this.isTransaction =1;
            this.form.page= 1;
            this.loading = false;
            this.isHide=false;
            this.form.hide="";
            return this.getProducts(false);
        },
        hide() {
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