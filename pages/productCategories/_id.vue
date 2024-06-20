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
                    <button class="filter-item local_select_btn" @sendLocateTitle="(seletedLocationTitle)=>{this.locationsTitle = selectedLocationTitle;}">
                        {{ selectedLocation ? selectedLocation.title : '전국' }} <i></i>
                    </button>
                    <button class="filter-item align_select_btn" v-if="form.order_by=='created_at'">
                        최신순 <i></i>
                    </button>
                    <button class="filter-item align_select_btn" v-if="form.order_by=='count_like'">
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
    <pop-location :location="locations.data" @change="(data) => {form.location_id=data; getProducts()}" />
    <pop-like-location  @change="(data)=> {form.location_id=data; getProducts(), console()}"  />
    <pop-order @change="(data)=> {form.order_by=data; getProducts()}"/>
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
                product_category_id: this.$route.query.product_category_id || "",
                location_id: "",
                order_by: "created_at",
                word: "",
                user_id:"",
                state_transaction: "",
                random:"",
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

        }

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
console(){
            console.log(this.form.location_id);
},
        back() {
            this.$router.back();
        },
    },


    computed: {
        selectedLocation(){
            return this.locations.data.find(location => location.id == this.form.location_id);
        },
        selectedCategory(){
            return this.productsCategories.data.find(category => category.id == this.form.product_category_id);
        },

    },

    mounted() {
        this.form.word = this.$route.query.word;
        this.form.product_category_id = this.$route.params.id;
        this.getProducts();
        this.getLocations();
        this.getProductCategories();

        setTimeout(() => {
            $('.index').scroll(this.loadMore);
        }, 350);
    }

};
</script>
<head>
<script src="/js/filter.js" defer></script>
</head>