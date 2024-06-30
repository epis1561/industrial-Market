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
                    판매 내역
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="index">
            <div class="top-tab-wrap col-group">
                <a href="#" class="tab-item" @click="isTransaction=1; isHide=0" :class="{'active' : isTransaction==1 && isHide==0}">
                    판매중
                </a>
                <a href="#" class="tab-item" @click="isTransaction=2; isHide=0" :class="{'active' : isTransaction==2 && isHide==0}">
                    거래완료
                </a>
                <a href="#" class="tab-item" @click="isHide=1; isTransaction=0;" :class="{'active' : isTransaction==0 && isHide==1}">
                    숨김
                </a>
            </div>
            <div class="container" v-if="isTransaction===1">
                <div class="prod-list">
                    <product :item="item" v-for="item in ongoingProducts.data" :key="item.id"/>
                </div>
            </div>
            <div class="container" v-if="isTransaction===2">
                <div class="prod-list">
                    <product :item="item" v-for="item in completeProducts.data" :key="item.id"/>
                </div>
            </div>
            <div class="container" v-if="isHide===1">
                <div class="prod-list">
                    <product :item="item" v-for="item in hideProducts.data" :key="item.id"/>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb />
        </div>
        <!-- gnb End -->

        <!--        <infinite-scroll :target-class="'.index'" @scroll="(page) => {form.page = page; getProducts(true)}" />-->

    </div>

    </body>
</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {

    load: false,
    data() {
        return {
            ongoingSellForm: new Form(this.$axios, {
                page: 1,
                product_category_id: "",
                user_id: this.$auth.user.data.id,
                state_transaction: "1",
                hide:"",
                types:[1,2],
            }),
            completeSellForm: new Form(this.$axios, {
                page: 1,
                product_category_id: "",
                user_id: this.$auth.user.data.id,
                state_transaction: "2",
                hide:"",
                types:[],
            }),
            hideForm: new Form(this.$axios, {
                page: 1,
                product_category_id: "",
                user_id: this.$auth.user.data.id,
                state_transaction: "",
                hide:"1",
                types:[],
            }),
            ongoingProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                }
            },
            completeProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                }
            },
            hideProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                }
            },
            isTransaction:1,
            isHide:0,
            load:false,
        }

    },

    methods: {
        getOngoingProducts(loadMore1) {
            this.$axios.get("/api/products", {
                params: this.ongoingSellForm.data(),
            }).then(response => {
                console.log(response.data);
                if (loadMore1)
                    return this.ongoingProducts.data = [...this.ongoingProducts.data, ...response.data.data];

                return this.ongoingProducts = response.data;
            })
        },
        getCompleteProducts(loadMore2) {
            this.$axios.get("/api/products", {
                params: this.completeSellForm.data(),
            }).then(response => {
                console.log(response.data);
                if (loadMore2)
                    return this.completeProducts.data = [...this.completeProducts.data, ...response.data.data];

                return this.completeProducts = response.data;
            })
        },
        getHideProducts(loadMore3) {
            this.$axios.get("/api/products", {
                params: this.hideForm.data(),
            }).then(response => {
                console.log(response.data);
                if (loadMore3)
                    return this.hideProducts.data = [...this.hideProducts.data, ...response.data.data];

                return this.hideProducts = response.data;
            })
        },
        loadMore1() {
            var scrollTop = $('.index').scrollTop();

            var innerHeight = $('.index').innerHeight();

            var scrollHeight = $('.index').prop('scrollHeight');
            if (this.load || this.form.page >= this.products.meta.last_page) {
                return;
            }
            console.log(this.form.page)
            if (scrollTop + innerHeight >= scrollHeight - 200) {

                if(this.form.page < this.products.meta.last_page) {
                    this.load = true;
                    this.form.page += 1;
                    this.$store.commit("setLoading",true);
                    return this.getOngoingProducts(this.load);
                };

            }
        },
        loadMore2() {
            var scrollTop = $('.index').scrollTop();

            var innerHeight = $('.index').innerHeight();

            var scrollHeight = $('.index').prop('scrollHeight');
            if (this.load || this.form.page >= this.products.meta.last_page) {
                return;
            }
            console.log(this.form.page)
            if (scrollTop + innerHeight >= scrollHeight - 200) {

                if(this.form.page < this.products.meta.last_page) {
                    this.load = true;
                    this.form.page += 1;
                    this.$store.commit("setLoading",true);
                    return this.getCompleteProducts(this.load);
                };

            }
        },
        loadMore3() {
            var scrollTop = $('.index').scrollTop();

            var innerHeight = $('.index').innerHeight();

            var scrollHeight = $('.index').prop('scrollHeight');
            if (this.load || this.form.page >= this.products.meta.last_page) {
                return;
            }
            console.log(this.form.page)
            if (scrollTop + innerHeight >= scrollHeight - 200) {

                if(this.form.page < this.products.meta.last_page) {
                    this.load = true;
                    this.form.page += 1;
                    this.$store.commit("setLoading",true);
                    return this.getHideProducts(this.load);
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
        }
    },

    mounted() {
        this.getOngoingProducts();
        this.getCompleteProducts();
        this.getHideProducts();
        this.scroll();
    },

};
</script>
