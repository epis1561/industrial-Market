<template>
   <nuxt-link :to="`/products/${product.id}`" class="prod-item col-group" :class="{'complete':product.state_transaction==2}"> <!-- 구매/나눔/판매 완료 시 complete 클래스 추가 -->
        <div class="item-img">
            <div class="complete-box">
                {{ product.format_state }}
            </div>
            <img :src="product.img ? product.img.url : ''" alt="">
        </div>
        <div class="item-txt-wrap">
            <p class="title">
                {{ product.title }}
            </p>
            <div class="sub-txt-group col-group">
                <p class="sub-txt">
                    {{ locate }}
                </p>
                <p class="sub-txt">
                    {{ product.format_created_at }}
                </p>
            </div>
            <div class="price">
                <p class="label">
                    {{ product.format_type }}
                </p>
                {{ product.format_price }}
            </div>
            <button class="like-btn active" @click.prevent.stop="deleteList"></button>
            <div class="prod-btn-wrap col-group">
                <div class="prod-btn col-group">
                    <img src="images/icon_chat_gray.png" alt="" class="icon">
                    <p class="txt">{{ product.count_chat }}</p>
                </div>
                <div class="prod-btn col-group">
                    <img src="images/icon_like_gray.png" alt="" class="icon">
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

        }
    },

    methods: {
        remove(){
            this.$emit('remove');
        }

    },

    computed: {
      

        locate(){
            let locations= [this.product.city,this.product.county,this.product.town,this.product.town2];

            let items=[];

            for(let i = 0; i<locations.length; i++){
                if(items.length==2)
                    return items.join(' ');

                if(locations[i])
                    items.push(locations[i]);
            }

            return items.join(' ');
        }
    },

    mounted() {

    }
}
</script>