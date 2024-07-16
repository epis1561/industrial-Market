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
                    <nuxt-link :to="`/products/${product.id}`" class="prod-item col-group complete"
                               v-for="product in products.data" :key="product.id">
                        <div class="item-img">
                            <div class="complete-box" v-if="product.state_transaction==2">
                                {{ product.format_short_type }}완료
                            </div>
                            <img :src="product.img ? product.img.url:'/images/notification_icon_bg.png'" alt="">
                        </div>
                        <div class="item-txt-wrap">
                            <p class="title">
                                {{ product.title }}
                            </p>
                            <div class="sub-txt-group col-group">

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
                                    <p class="txt">20</p>
                                </div>
                                <div class="prod-btn col-group">
                                    <img src="/images/icon_like_gray.png" alt="" class="icon">
                                    <p class="txt">20</p>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
          <infinite-scroll v-if="products.meta" :loading="loading" :form="form" :meta="products.meta" :target-contents="'.prod-list'" :target-scroll="'.index'" @paginate="(data) => {form.page = data; getProducts(true);}"/>
        </main>
    </div>
</template>
<script>
import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                state_transactions: [0,1],
                user_id: this.$route.query.id,
                page: 1,
            }),
            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            isTransaction:1,
            loading:false,
        };
    },

    methods: {
        getProducts(loadMore = false) {
            this.loading = true;
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                console.log(response.data)
                this.loading = false;
                if (loadMore) {
                    this.products.data = [...this.products.data, ...response.data.data];
                    return this.products.meta = response.data.meta;
                }
            console.log(response.data);
                this.products = response.data;
            })
        },
        all() {
            this.form.state_transactions = [];
            this.isTransaction =0;
            this.form.page= 1;
            return this.getProducts();
        },
        ongoing() {
            this.form.state_transactions = [0, 1];
            this.isTransaction =1;
            this.form.page= 1;
            return this.getProducts();
        },
        complete() {
            this.form.state_transactions = [2];
            this.isTransaction =2;
            this.form.page= 1;
            return this.getProducts();
        },


    },

    computed: {},
    watch: {},
    mounted() {
        this.getProducts();
    }
}
</script>