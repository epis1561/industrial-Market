<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    관심목록
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-tab-wrap col-group">
                <a href="#" class="tab-item" @click.prevent="type='product'" :class="{'active':type=='product'}">
                    관심 상품
                </a>
                <a href="#" class="tab-item" @click.prevent="type='user'" :class="{'active':type=='user'}">
                    관심 회원
                </a>
            </div>

            <div class="container" v-if="type=='product'">
                <div class="prod-list">
                    <like-product @removeProduct="removeProduct(likeProduct.likeable.id)" :product="likeProduct.likeable" v-for="likeProduct in likeProducts.data" :key="likeProduct.id"/>
                </div>
            </div>

            <div class="container" v-if="type=='user'">
                <div class="user-list">
                    <like-user :like-user="likeUser" v-for="likeUser in likeUsers.data" :key="likeUser.id"/>
                </div>
            </div>

        </main>

        <!-- gnb Start -->

            <gnb :like="isLike"/>

        <!-- gnb End -->
    </div>
    </body>
</template>

<style>

</style>
<script>

import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {
                likeable_type: "",
                likeable_id: "",
            }),

            likeUsers: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },

            likeProducts: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },

            type: 'product',
            isLike:true,
        }

    },

    methods: {
        getLikeUser() {
            this.$store.commit("setLoading", true);
            this.form.likeable_type = 'User';

            this.$axios.get("/api/likes", {
                params: this.form.data(),
            }).then(response => {
                this.likeUsers = response.data;
                console.log('유저데이터', this.likeUsers.data);
            })
        },

        getLikeProducts() {
            this.$store.commit("setLoading", true);
            this.form.likeable_type = 'Product';

            this.$axios.get("/api/likes", {
                params: this.form.data(),
            }).then(response => {
                this.likeProducts = response.data;
                console.log('상품데이터', response.data.data);

            })
        },

        removeProduct(id) {
            console.log('삭제발동했습니다.');
            this.form.likeable_id = id;

            this.form.likeable_type = "Product";
            console.log(this.form.likeable_id);
            console.log(this.form.likeable_type);
            this.form.delete("/api/likes")
                    .then(response => {
                        console.log('삭제성공')
                        this.likeProducts.data = this.likeProducts.data.filter(likeProduct => {
                            return likeProduct.likeable.id !== id; // id가 다른 항목만 필터링
                        });
                    })

        },

    },

    computed: {},

    watch: {},


    mounted() {
        this.getLikeUser();
        this.getLikeProducts();
    },

};
</script>
