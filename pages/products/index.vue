<template>

    <div id="wrap" class="product">

        <!-- header Start -->
        <header id="header" class="index-header" v-if="!$route.query.word">
            <div class="container col-group">
                <h1 class="logo" @click="$router.push('/')">
                    <img src="/images/LOGO.png" alt="">
                </h1>

                <div class="header-menu-wrap col-group">
                    <nuxt-link to="/searches" class="sub-header-btn search-btn">
                        <img src="/images/icon_search.png" alt="">
                    </nuxt-link>
                    <nuxt-link to="/alarms" class="header-menu" :class="{'active':user.has_unread_alarm}">
                        <!-- 알림 갯수 1개 이상일 때 active 클래스 추가 -->
                        <img src="/images/icon_bell.png" alt="">
                    </nuxt-link>
                </div>
            </div>
        </header>

        <header id="header" class="sub-header product" v-if="$route.query.word">
            <form class="container">
                <div class="search-top col-group">
                    <button type="button" class="sub-header-btn prev-btn" @click="$router.push('/')">
                        <img src="/images/icon_prev.png" alt="">
                    </button>

                    <div class="search-input-wrap">
                        <div class="search-category" v-if="productCategory">
                            {{ productCategory.title }}
                            <i class="del-btn" @click="delCategory()"></i>
                        </div>
                        <input type="text" class="search-input" v-model="$route.query.word ||''" disabled>
                    </div>
                </div>
            </form>
        </header>
        <!-- header End -->

        <main class="index">
            <div class="cate-wrap" v-if="!$route.query.word">
                <div class="cate-list col-group">
                    <a href="" class="cate-item active" @click.prevent="">전체보기</a>
                    <nuxt-link :to="`/productCategories/${item.id}`" class="cate-item" v-for="item in this.productCategories.data" :key="item.id">
                        {{ item.title }}
                    </nuxt-link>
                </div>
            </div>
            <div class="container">
                <div class="prod-list">
                    <product :item="item" v-for="item in products.data" :key="item.id"/>
                </div>
            </div>

        </main>

        <!-- gnb Start -->

        <gnb :home="isHome"/>


        <infinite-scroll v-if="products.meta" :loading="loading" :form="form" :meta="products.meta"
                         :target-contents="'.prod-list'" :target-scroll="'.index'"
                         @paginate="(data) => {form.page = data; getProducts(true);}"/>

    </div>

</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {

    middleware: ["user"],

    load: false,
    data() {
        return {
            form: new Form(this.$axios, {
                page: 1,
                product_category_id: "",
                location_id: "",
                order_by: "",
                word: "",
                user_id: "",
                state_transaction: "",
                random: "",
            }),
            categoryForm: new Form(this.$axios, {
                page: 1,
                product_category_id: this.$route.query.product_category_id || "",
                county_id: "",
                order_by: "created_at",
                word: "",
                user_id: "",
                state_transaction: "",
                random: "",
                price: "",
            }),
            productCategory: "",
            product_category_id: "",
            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                },

            },
            productsCategories: {
                data: [],
            },
            isHome: true,
            loading: false,
        }

    },

    methods: {
        getProductCategories() {
            this.$axios.get("/api/productCategories", {
                params: this.categoryForm.data(),
            }).then(response => {
                this.productsCategories = response.data;
                this.productCategory = this.selectedCategory;
            })
        },
        getProducts(loadMore = false) {
            if (this.$route.query.word) {
                this.form.word = this.$route.query.word;
            }
            this.loading = true;
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                this.loading = false;
                if (loadMore) {
                    this.products.data = [...this.products.data, ...response.data.data];
                    return this.products.meta = response.data.meta;
                }
                this.products = response.data;

            })
        },


    },

    computed: {
        productCategories() {
            return this.$store.state.productCategories;
        },

        user() {
            return this.$auth.user.data;
        },
        selectedCategory() {
            return this.productsCategories.data.find(category => category.id == this.product_category_id);
        },
    },

    mounted() {
        this.getProducts();
        this.getProductCategories();
    },

};
</script>
