<template>
    <body>
    <div id="wrap">

        <!-- header Start -->

        <header id="header" class="sub-header">
            <div id="search"></div>
            <div class="container col-group">
                <button type="button" class="sub-header-btn prev-btn" @click="back()">
                    <img src="/images/icon_prev.png" alt="">
                </button>


                <h2 class="title" v-if="selectedCategory">
                    {{ selectedCategory.title }}
                </h2>

                <nuxt-link :to="`/searches?product_category_id=${this.$route.params.id}`" class="sub-header-btn search-btn"> <img src="/images/icon_search.png" alt=""></nuxt-link>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="top-filter-wrap col-group">
                    <button class="filter-item local_select_btn" @click="activeLikeLocate=true">
                        {{ county_title ? county_title : '전국' }} <i></i>
                    </button>
                    <button class="filter-item align_select_btn" v-if="form.order_by=='created_at'" @click="activeOrder=true">
                        최신순 <i></i>
                    </button>
                    <button class="filter-item align_select_btn" v-if="form.order_by=='count_like'" @click="activeOrder=true">
                        인기순 <i></i>
                    </button>
                </div>
                <div class="prod-list">
                    <product :item="item" v-for="item in products.data" :key="item.id"/>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
            <gnb />ㄴ
        <!-- gnb End -->
        </div>
    <pop-location :active="activeCities"  @change="showDetail"  @close="activeCities = false"/>
    <pop-like-location :active="activeLikeLocate" @close="activeLikeLocate=false" @showAll="showAll"  @showReal="showReal" @showPrefer="showPrefer" @detail="activeCities=true, activeLikeLocate=false"/>
    <pop-order :active="activeOrder" @change="(data)=> {form.order_by=data; getProducts(), activeOrder=false}" @close="activeOrder = false"/>
    </body>
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
                page:1,
                product_category_id: this.$route.query.product_category_id || "",
                county_id: "",
                order_by: "created_at",
                word: "",
                user_id:"",
                state_transaction: "",
                random:"",
                price:"",
            }),

            number:1,

            products:{
                data: [],
            },
            locations:{
                data: [],
            },
            productsCategories: {
                data: [],
            },
            activeCities:false,
            active_country : "",
            active_city : "",
            active_county : "",
            county_title:"",
            activeOrder:false,
            activeLikeLocate:false,
        }

    },


    methods: {
        changeLocation(county){
            this.active_country = county.country;
            this.active_city = county.city.title;
            this.active_county = county.title;
        },

        getProducts(loadMore) {
            if(this.$route.query.word){
                this.form.word =  this.$route.query.word;
            }
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                if (loadMore)

                    return this.products.data = [...this.products.data, ...response.data.data];

                return this.products = response.data;
            })
        },
        getProductCategories() {
            this.$axios.get("/api/productCategories", {
                params: this.form.data(),
            }).then(response => {
                this.productsCategories = response.data;
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
        scroll(){
            $('.index').scroll(this.loadMore);
        },
        showAll(){
            console.log('전국발동')
            this.form.county_id= "";
            this.form.price = this.min_price;
            this.county_title = "";

            this.getProducts();
        },
        showReal(){
            console.log('현재위치발동')
            this.form.county_id = this.$auth.user.data.county.id;
            this.form.price = "";
            this.county_title = this.$auth.user.data.county.title;


            this.getProducts();
        },
        showPrefer(){
            console.log('선호발동')
            this.form.county_id = this.$auth.user.data.activeCounty.id;
            this.form.price = "";
            this.county_title = this.$auth.user.data.activeCounty.title;

            this.getProducts();
        },
        back() {
            this.$router.back();
        },
        showDetail(selectedCounty){
            this.form.county_id = selectedCounty.id;
            this.form.price = "";
            this.county_title = selectedCounty.title;
            this.getProducts();

            this.activeCities = false;
        }

    },


    computed: {
        selectedLocation(){
            return this.locations.data.find(location => location.id == this.form.location_id);
        },
        selectedCategory(){
            return this.productsCategories.data.find(category => category.id == this.form.product_category_id);
        },
        min_price(){
            return this.$store.state.price;
        },
        location(){
            return this.$store.state.location;
        }

    },

    mounted() {
        this.form.word = this.$route.query.word;

        this.form.product_category_id = this.$route.params.id;
        this.getProducts();
        this.getProductCategories();
        setTimeout(() => {
            $('.index').scroll(this.loadMore);
        }, 350);
    }

};
</script>