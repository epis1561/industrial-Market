<template>

    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="index-header">
            <div class="container col-group">
                <h1 class="logo">
                    <img src="/images/LOGO.png" alt="">
                </h1>
                <div class="header-menu-wrap col-group">
                    <nuxt-link to="/searches" class="sub-header-btn search-btn"> <img src="/images/icon_search.png" alt=""></nuxt-link>
                    <nuxt-link to="/alarms" class="header-menu" :class="{'active':user.has_unread_alarm}"> <!-- 알림 갯수 1개 이상일 때 active 클래스 추가 -->
                        <img src="/images/icon_bell.png" alt="">
                    </nuxt-link>
                </div>
            </div>
        </header>
        <!-- header End -->

        <main class="index">
            <div class="cate-wrap">
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

            <gnb :home="isHome" />



        <infinite-scroll v-if="products.meta" :loading="loading" :form="form" :meta="products.meta" :target-contents="'.prod-list'" :target-scroll="'.index'" @paginate="(data) => {form.page = data; getProducts(true);}"/>

    </div>

</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {

    middleware:["user"],

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

            products: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                },

            },
            isHome:true,
            loading:false,
        }

    },

    methods: {
        getProducts(loadMore=false) {
            if(this.$route.query.word){
                this.form.word =  this.$route.query.word;
            }
            console.log(this.$auth.user.data);
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                if (loadMore) {
                    this.load = false;
                    return this.products.data = [...this.products.data, ...response.data.data];
                }
                this.products = response.data;
                console.log(this.products.data);

            })
        },
        loadMore() {
            var scrollTop = $('.index').scrollTop();

            var innerHeight = $('.index').innerHeight();

            var scrollHeight = $('.index').prop('scrollHeight');
            if (this.load || this.form.page >= this.products.meta.last_page) {
                return;
            }

            if (scrollTop + innerHeight >= scrollHeight - 200) {

                if(this.form.page < this.products.meta.last_page) {
                    this.load = true;
                    this.form.page += 1;
                    this.$store.commit("setLoading",true);
                    return this.getProducts(this.load);
                };

            }
        },
        scroll(){
            $('.index').scroll(this.loadMore);
        },

    },

    computed: {
        productCategories(){
            return this.$store.state.productCategories;
        },

        user(){
            return this.$auth.user.data;
        }
    },

    mounted() {
        this.getProducts();
        this.scroll();
    },

};
</script>
