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
                    관심목록
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">

            <div class="top-tab-wrap col-group">
                <a href="#" class="tab-item" @click.prevent="form.likeable_type='Product'" :class="{'active':form.likeable_type=='Product'}">
                    관심 상품
                </a>
                <a href="#" class="tab-item" @click.prevent="form.likeable_type='User'" :class="{'active':form.likeable_type=='User'}">
                    관심 회원
                </a>
            </div>

            <div class="container" v-if="form.likeable_type=='Product'">
                <div class="prod-list">
                    <like-product @removeProduct="removeProduct(likeProduct.likeable.id)" :product="likeProduct.likeable" v-for="likeProduct in likeProducts.data" :key="likeProduct.id"/>
                </div>
                <infinite-scroll v-if="likeProducts.meta" :loading="loading" :form="form" :meta="likeProducts.meta" :target-contents="'.prod-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getLikeProducts(true);}"/>

            </div>

            <div class="container" v-if="form.likeable_type=='User'">
                <div class="user-list">
                    <like-user @removeProduct="removeUser(likeUser.likeable.id)" :like-user="likeUser" v-for="likeUser in likeUsers.data" :key="likeUser.id"/>
                </div>
                <infinite-scroll v-if="likeUsers.meta" :loading="loading" :form="form" :meta="likeUsers.meta" :target-contents="'.user-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getLikeUsers(true);}"/>
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
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                page:1,
                likeable_type: "Product",
                likeable_id: "",
                user_id:"",
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
            product_id:"",
            loading:false,
        }

    },

    methods: {
        getLikeUsers(loadMore = false) {
            this.form.likeable_type = "User"
            this.loading = true;
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/likes", {
                params: {
                    ...this.form.data(),
                    likeable_type: "User",
                },
            }).then(response => {
                this.loading = false;
                console.log(response.data);
                if (loadMore) {
                    this.likeUsers.data = [...this.likeUsers.data, ...response.data.data];

                    return this.likeUsers.meta = response.data.meta;
                }

                this.likeUsers = response.data;

            })
        },

        getLikeProducts(loadMore = false) {
            this.loading = true;
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/likes", {
                params: {
                    ...this.form.data(),
                    likeable_type: "Product",
                },
            }).then(response => {
                console.log(response.data);
                this.loading = false;

                if (loadMore) {
                    this.likeProducts.data = [...this.likeProducts.data, ...response.data.data];

                    return this.likeProducts.meta = response.data.meta;
                }
                this.likeProducts = response.data;

            })
        },

        removeProduct(id) {
            this.form.likeable_id = id;
            this.form.likeable_type = "Product";
            console.log(this.form.likeable_id);
            console.log(this.form.likeable_type);
            this.form.delete("/api/likes")
                    .then(response => {
                        this.likeProducts.data = this.likeProducts.data.filter(likeProduct => {
                            return likeProduct.likeable.id !== id; // id가 다른 항목만 필터링
                        });
                    })

        },
        removeUser(id) {
            this.form.likeable_id = id;
            this.form.likeable_type = "User";
            console.log(this.form.likeable_id);
            console.log(this.form.likeable_type);
            this.form.delete("/api/likes")
                    .then(response => {
                        this.likeUsers.data = this.likeUser.data.filter(likeUser => {
                            return likeUser.likeable.id !== id; // id가 다른 항목만 필터링
                        });
                    })

        },
    },

    computed: {},

    watch: {
        "form.likeable_type": {
            deep: true,
            handler() {
                this.likeProducts.data = [];
                this.likeProducts.meta.current_page = 1;

                this.likeUsers.data = [];
                this.likeUsers.meta.current_page = 1;

                this.form.page = 1;

                if(this.form.likeable_type === "User")
                    return this.getLikeUsers();

                return this.getLikeProducts();

            }
        }
    },


    mounted() {
        if(this.$route.query.type == 'User'){
            this.likeable_type='User';
            this.getLikeUsers();
        }
       else{
            this.likeable_type='Product';
            this.getLikeProducts();
        }


    },

};
</script>
