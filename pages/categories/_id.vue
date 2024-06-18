<template>
    <body>
    <div id="wrap">

        <!-- header Start -->

        <header id="header" class="sub-header">
            <div id="search"></div><search :category="this.form.product_category_id" @changeIsSearch="(searchCheck)=>{ this.isSearch=searchCheck;}" :item="isSearch" v-show="isSearch==1"></search>
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title" v-show="isSearch==0">
                   중고기계
                </h2>

                <button class="sub-header-btn search-btn" @click="changeIsSearch()">
                    <img src="/images/icon_search.png" alt="">
                </button>

            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="top-filter-wrap col-group">
                    <button class="filter-item local_select_btn" @sendLocateTitle="(seletedLocationTitle)=>{this.locationsTitle = selectedLocationTitle;}">
                        {{ this.locationsTitle }} <i></i>
                    </button>
                    <button class="filter-item align_select_btn" v-if="this.form.data.order_by==null">
                        최신순 <i></i>
                    </button>
                    <button class="filter-item align_select_btn" v-if="this.form.data.order_by=='created_at'">
                        최신순 <i></i>
                    </button>

                    <button class="filter-item align_select_btn" v-if="this.form.data.order_by=='count_like'">
                        인기순 <i></i>
                    </button>
                </div>
                <div class="prod-list">
                    <product :item="item" v-for="item in products.data" :key="item.id"/>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb />
        </div>
        <!-- gnb End -->
        </div>
    <pop-location :location="locations.data" @sendLocate="(selectedLocation)=> {form.location_id=selectedLocation; getProducts()}" />
    <pop-like-location @sendLocate="(location)=> {form.location_id=location; getProducts()}"  />
    <pop-order @sendOrder="(order_by)=> {form.order_by=order_by; getProducts(),getConsole()}"/>
    </body>
</template>
<style>

</style>
<script>


import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    head(){
        return {
            script: [
                {
                    src: '/js/filter.js',
                    defer: true
                },
            ],

        }
    },

    data() {

        return {
            form: new Form(this.$axios, {
                page:1,
                product_category_id:"",
                location_id: "",
                order_by: "",
                word: "",
                user_id:"",
                state_transaction: "",
                random:"",
            }),

            products:{
                data: [],
            },
            locations:{
                data: [],
            },
            productsCategories: {
                data: [],
            },
            locationsTitle: "",
            isSearch:"0",
        }

    },



    methods: {
        getProducts(loadMore) {
            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                console.log(response.data);
                if (loadMore)

                    return this.products.data = [...this.products.data, ...response.data.data];

                return this.products = response.data;
            })
        },
        getProductCategories() {
            this.$axios.get("/api/productCategories", {
                params: this.form.data(),
            }).then(response => {
                console.log(response.data);
                this.productsCategories = response.data;
            })
        },
        loadMore() {
            var scrollTop = $('.index').scrollTop();

            var innerHeight = $('.index').innerHeight();

            var scrollHeight = $('.index').prop('scrollHeight');
            console.log(this.form.page)
            if (scrollTop + innerHeight >= scrollHeight - 250) {

                this.load = true;
                if(this.form.page < this.products.meta.last_page) {
                    this.form.page += 1;
                    return this.getProducts(this.load);
                };

            }
        },
        getLocations() {
            this.$axios.get("/api/locations", {
            }).then(response => {
                return this.locations = response.data;
            })
        },
        getConsole(){
          console.log(this.form.order_by);
        },
        changeIsSearch(){
            this.isSearch = 1;
            console.log(this.isSearch);
        },
console(){
    console.log(this.form.data.order_by);
}
    },

    computed: {


    },

    mounted() {
        this.form.product_category_id = this.$route.params.id;
        this.getProducts();
        this.getLocations();
        this.getProductCategories();
        this.console();
        setTimeout(() => {
            $('.index').scroll(this.loadMore);
        }, 350);
    }

};
</script>
<head>
<script src="/js/filter.js" defer></script>
</head>