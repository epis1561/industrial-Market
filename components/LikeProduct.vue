<template>
   <nuxt-link :to="`/products/${product.id}`" class="prod-item col-group" :class="{'complete':product.state_transaction==2}"> <!-- 구매/나눔/판매 완료 시 complete 클래스 추가 -->
        <div class="item-img">
            <div class="complete-box">
                {{ product.format_state }}
            </div>
            <img :src="product.img ? product.img.url : '/images/notification_icon_bg.png'" alt="">
        </div>
        <div class="item-txt-wrap">
            <p class="title">
                {{ product.title }}
            </p>
            <div class="sub-txt-group col-group">
                <p class="sub-txt" v-if = "product.city.title === product.county.title">
                    {{ product.city.title }}
                </p>
                <p class="sub-txt" v-else>
                  {{ product.city.title }} {{ product.county.title }}
                </p>
                <p class="sub-txt">
                    {{ product.format_created_at }}
                </p>
            </div>
            <div class="price">
                <p :class="'label label' + product.type" v-if="product.type !=0 && product.type==1">
                    {{ product.format_type }}
                </p>
                <p :class="'label label' + product.type" v-if="product.type ==2">
                    {{ product.format_short_type }}
                </p>
                <div v-if="product.offer_price ==0 && product.type!=2">
                    {{ product.format_price }}
                </div>
                <div v-if="product.offer_price ==1 && product.type!=2">
                    가격협의
                </div>
            </div>
            <button class="like-btn" @click.prevent.stop="remove" :class="{'active':isLike}"></button>
            <div class="prod-btn-wrap col-group">
                <div class="prod-btn col-group">
                    <img src="/images/icon_chat_gray.png" alt="" class="icon">
                    <p class="txt">{{ product.count_chat }}</p>
                </div>
                <div class="prod-btn col-group">
                    <img src="/images/icon_like_gray.png" alt="" class="icon">
                    <p class="txt">{{ product.count_like }}</p>
                </div>
            </div>
        </div>
   </nuxt-link>

</template>
<style>

</style>
<script>
import Form from "@/utils/Form";

export default {
    props:["product"],
    data(){
        return {
            form: new Form(this.$axios, {
                likeable_type: "Product",
                likeable_id :"",
            }),
            isLike:true,
        }
    },

    methods: {
        remove(){
            this.isLike=false;
            this.$emit('removeProduct',);
            console.log('에밋발동')
        }

    },

    computed: {
      


    },

    mounted() {

    }
}
</script>