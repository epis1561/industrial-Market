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
                <a href="#" class="tab-item" :class="{'active': !form.state_transaction}" @click.prevent="all">
                    전체
                </a>
                <a href="#" class="tab-item" :class="{'active': form.state_transaction==1}" @click.prevent="ongoing">
                    판매중
                </a>
                <a href="#" class="tab-item" :class="{'active': form.state_transaction==2}" @click.prevent="complete">
                    판매완료
                </a>
            </div>
            <div class="container">
                <div class="prod-list">
                    <nuxt-link :to="`/products/${product.id}`" class="prod-item col-group"
                               v-for="product in products.data" :key="product.id">
                        <div class="item-img">
                            <img :src="product.img ? product.img.url:''" alt="">
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
        </main>
    </div>
</template>
<script>
import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {
                state_transactions: [],
                user_id: this.$route.query.id,
                page: 1,
            }),
            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            }
        };
    },

    methods: {
        getProducts(loadMore) {
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
            return this.getProducts();
        },
        ongoing() {
            this.form.state_transactions = [0, 1];
            return this.getProducts();
        },
        complete() {
            this.form.state_transactions = [2];
            return this.getProducts();
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

    },

    computed: {},
    watch: {},
    mounted() {
        this.getProducts();
    }
}
</script>