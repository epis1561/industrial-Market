<template>
    <div :class="`prod-item ${product.soldout == 1 ? 'soldout' : ''}`">

        <div class="prod-item-num" v-if="rank">{{rank}}</div>
        <button :class="`prod-item-like ${like ? 'active' : ''}`" @click.prevent="toggleLike" v-else></button>

        <div :class="`prod-item-img-box ${best ? '' : 'square'}`">
            <nuxt-link :to="`/products/${product.id}`" class="img-container">
                <img :src="product.img_best ? product.img_best.url : product.img.url" alt="" v-if="best">
                <img :src="product.img ? product.img.url : ''" alt="" v-else>
            </nuxt-link>

            <div class="prod-item-cart-group col-group">
                <button class="prod-item-cart-btn col-group" @click.prevent="() => addToCart()">
                    <i class="xi-basket icon"></i>
                    Add Cart
                </button>
                <button class="prod-item-cart-btn col-group" @click="() => addToCart(true)">
                    <i class="xi-credit-card icon"></i>
                    Buy Now
                </button>
            </div>
        </div>

        <nuxt-link :to="`/products/${product.id}`" class="prod-item-box row-group">
            <div class="prod-item-top-group col-group">
                <p class="prod-item-label">
                    {{ product.brand.title }}
                </p>
                <div class="prod-item-detail-list col-group">
                    <div class="prod-item-detail">
                        Review · {{ product.count_review.toLocaleString() }}
                    </div>
                    <div class="prod-item-detail">
                        Like · {{ product.count_like.toLocaleString() }}
                    </div>
                </div>
            </div>
            <p class="prod-item-title">
                {{ product.title }}
            </p>
            <div class="prod-item-price-group col-group">
                <p class="prod-item-price">
                    {{ product.price.toLocaleString() }}원
                </p>
                <p class="prod-item-price-before">
                    {{ product.price_origin.toLocaleString() }}원
                </p>
            </div>
        </nuxt-link>
    </div>
</template>
<script>
import Form from "../utils/Form";

export default {
    props: ["product", "rank", "best"],

    data(){
        return {
            form: new Form(this.$axios, {
                product_id: this.product.id,
                options: [],
                additionals: [],
            }),

            like: this.product.like == 1 ? true : false,
        }
    },

    computed: {

    },

    methods: {
        toggleLike(){
            if(!this.$auth.user)
                return this.$store.commit("setPop", {
                    description:"로그인 후 이용해주세요"
                });

            this.like = !this.like;

            this.form.post("/api/likes");
        },
        addToCart(move = false){
            this.$store.commit("setLoading", true);

            let option = this.product.options[0];

            this.form.options = [
                {
                    id: option.id,
                    count: 1,
                }
            ];

            this.form.product_id = this.product.id;

            if(!move)
                this.$store.commit("setModals", [
                    "cart-success"
                ]);

            this.$store.commit("setCountCart", this.$store.state.countCart + 1);

            this.form.post("/api/preProducts")
                    .then(response => {
                        if(move)
                            this.$router.push({
                                path: "/orders/create",
                                query: {
                                    pre_product_ids: [response.data.id]
                                }
                            });
                    });
        }
    },

}
</script>
