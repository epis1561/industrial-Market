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
                <a href="#" class="tab-item" :class="{'active': isTransaction==0}" @click.prevent="all">
                    전체
                </a>
                <a href="#" class="tab-item" :class="{'active': isTransaction==1}" @click.prevent="ongoing">
                    판매중
                </a>
                <a href="#" class="tab-item" :class="{'active': isTransaction==2}" @click.prevent="complete">
                    판매완료
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
                                <img :src="product.img ? product.img.url:''" alt="">
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
                                        {{ product.address_detail }}
                                    </p>
                                    <p class="sub-txt">
                                        {{ product.format_created_at }}
                                    </p>
                                </div>
                                <div class="price">
                                    <p :class="`label label${product.type}`">
                                        {{ product.format_state }}
                                    </p>
                                    {{ product.format_price }}
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
            <report :is-report="isReport" :type="reportable_type" :id="product_id" @created="leave"/>
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
                user_id: 11,
                page: 1,
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
        };
    },

    methods: {
        getProducts(loadMore) {
            this.form.user_id = this.user.id;
            console.log(this.form.user_id);
            console.log(this.form.state_transactions);
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                console.log(response.data);
                if (loadMore)
                    return this.products.data = [...this.products.data, ...response.data.data];

                this.products = response.data;
            })
        },
        all() {
            this.form.state_transactions = [];
            this.isTransaction =0;
            return this.getProducts();
        },
        ongoing() {
            this.form.state_transactions = [0, 1];
            this.isTransaction =1;
            return this.getProducts();
        },
        complete() {
            this.form.state_transactions = [2];
            this.isTransaction =2;
            return this.getProducts();
        },
        leave(){
            this.$router.back();
        },
        loadMore() {
            var scrollTop = $('.index').scrollTop();

            var innerHeight = $('.index').innerHeight();

            var scrollHeight = $('.index').prop('scrollHeight');
            if (this.load || this.form.page >= this.products.meta.last_page) {
                return;
            }
            console.log(this.form.page)
            if (scrollTop + innerHeight >= scrollHeight - 200) {

                if (this.form.page < this.products.meta.last_page) {
                    this.load = true;
                    this.form.page += 1;
                    this.$store.commit("setLoading", true);
                    return this.getOngoingProducts(this.load);
                }
                ;

            }
        },
        deleteProduct(id) {


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
            this.isTransaction=1
        }
        else if(this.$route.query.id == 2){
            this.form.state_transactions = [2];
            this.isTransaction=2
        }
        this.getProducts();
    }
}
</script>