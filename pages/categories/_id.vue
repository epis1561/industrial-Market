<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    중고기계
                </h2>
                <button class="sub-header-btn search-btn">
                    <img src="/images/icon_search.png" alt="">
                </button>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="top-filter-wrap col-group">
                    <button class="filter-item local_select_btn">
                        전국 <i></i>
                    </button>
                    <button class="filter-item align_select_btn">
                        최신순 <i></i>
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
    <pop-location @change="(location)=> {form.location.id=location; getProducts()}" />
    <pop-like-location />
    <pop-order />
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


        }

    },



    methods: {
        getProducts(loadMore) {
            this.$axios.get("/api/products", {
                params: this.form.data(),
            }).then(response => {
                if (loadMore)
                    return this.products.data = [...this.products.data, ...response.data.data];

                return this.products = response.data;
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

    },

    computed: {


    },

    mounted() {
        this.form.product_category_id = this.$route.params.id;
        this.getProducts();
        setTimeout(() => {
            $('.index').scroll(this.loadMore);
        }, 350);
    }
};
</script>
<head>
<script src="/js/filter.js" defer></script>
</head>