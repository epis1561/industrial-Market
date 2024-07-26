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
                <h2 class="title"  v-if="product && $auth.user.data.id == product.user.id && (product.type == 0 || product.type == 2)">
                    판매자 선택
                </h2>
                <h2 class="title" v-if="product && $auth.user.data.id == product.user.id && product.type == 1">
                    구매자 선택
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage buyer_select chats" v-if="product" >
            <div class="chat-prod prod-item ">
                <div class="container col-group">
                    <div class="item-img">
                        <img :src="product.img ? product.img.url: '/images/notification_icon_bg.png'" alt="">
                    </div>
                    <div class="item-txt-wrap">
                        <p class="title">
                            {{ product.title }}
                        </p>
                        <div class="price">
                            <p class="label">
                                {{ product.format_state }}
                            </p>
                            {{ product.format_price }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-list" v-if="chats">
                <label class="chat-item col-group" :id="'buyer_' + buyer.id" v-for="buyer in chats.data" :key="buyer.id" v-if="chats">
                    <input type="radio" class="form-radio" :id="'buyer_' + buyer.id" name="buyer" v-if="buyer.asker && buyer.asker.id != user.id" :value="buyer.asker.id" v-model="form.buyer_id">
                    <input type="radio" class="form-radio" :id="'buyer_' + buyer.id" name="buyer" v-if="buyer.owner && buyer.owner.id != user.id" :value="buyer.owner.id" v-model="form.buyer_id">
                    <div class="checked-item col-group">
                        <div class="icon">
                            <i class="xi-check"></i>
                        </div>
                    </div>
                    <div class="profile-img" v-if="buyer.asker.id != user.id">
                        <img :src="buyer.asker.img ? buyer.asker.img.url:'/images/profile_null.png'" alt="">
                    </div>
                    <div class="profile-img" v-if="buyer.owner.id != user.id">
                        <img :src="buyer.owner.img ? buyer.owner.img.url:'/images/profile_null.png'" alt="">
                    </div>
                    <div class="item-txt-wrap row-group">
                        <div class="title-group col-group">
                            <p class="name" v-if="buyer.asker.id != user.id">
                                {{ buyer.asker.nickname || buyer.asker.name }}
                            </p>
                            <p class="name" v-if="buyer.owner.id != user.id">
                                {{ buyer.owner.nickname || buyer.owner.name }}
                            </p>
                            <p class="date">
                                {{ buyer.updated_at }}
                            </p>
                        </div>
                        <p class="txt">
                           {{ buyer.latestMessage.description }}
                        </p>
                    </div>
                </label>

            </div>
<!--            {{ buyer.asker.nickname || buyer.asker.name }}-->

            <div class="buyer-select-footer">
                <div class="container row-group">
                        <p class="txt" @click="otherStore">
                            다른 곳에서 판매했어요
                        </p>

                    <button class="modal-footer-btn submit-btn" @click="store">
                        거래완료
                    </button>
                </div>
            </div>

        </main>

        <div class="modal-container modal_block" :class="{'active':isNull==true}">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon red"></i>
                </div>
                <p class="modal-alert-txt">
                    판매/구매자를 선택해주세요.
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isNull=false">
                        확인
                    </button>
                </div>
            </div>
        </div>
    </div>

    </body>
</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    load: false,
    data() {
        return {
            form: new Form(this.$axios, {
                product_id : this.$route.query.id,
                buyer_id:"",
                state_transaction:2,
            }),
            product:"",
            chats:{
                data:[],
                meta:{
                    current_page:1,
                    last_page:1,
                }
            },
            isNull:false,
        }

    },

    methods: {
            getProduct() {
                this.$store.commit("setLoading", true);
                this.$axios.get("/api/products/" + this.$route.query.id, {
                }).then(response => {
                this.product = response.data.data;

                });
            },
        getChats(){
            this.$store.commit("setLoading", true);
            console.log(this.form.product_id);
            this.$axios.get("/api/chats",{
                params: this.form.data(),
            }).then(response => {
               this.chats = response.data;
               this.chats.data = this.chats.data.filter(data =>{
                   return data.latestMessage.length!=0;
               });

               if(this.chats.data.length==1){
                   console.log('채팅데이터',this.chats.data[0]);
                   console.log(this.user);
                   console.log(this.chats.data[0].asker);
                   if(this.chats.data[0].asker && this.chats.data[0].asker.id != this.user.id){
                       this.form.buyer_id = this.chats.data[0].asker.id;
                       console.log('발동')
                       return this.store();
                   }
                   else if(this.chats.data[0].owner && this.chats.data[0].owner.id != this.user.id){
                       this.form.buyer_id = this.chats.data[0].owner.id;
                       console.log('발동2')
                       return this.store();
                   }
               }
               console.log('채팅',this.chats);
            });
        },
        store(){
                if(!this.form.buyer_id){
                    return this.isNull=true;
                }

            this.$store.commit("setLoading", true);
            this.form.patch("/api/products/updateStateTransaction/" + this.$route.query.id,{

            }).then(response =>{
                console.log('성공했습니다');
                this.$router.push(`/mypage/products/indexBySell?id=${2}`)
            })
        },
        otherStore(){
            this.form.buyer_id="";
            this.$store.commit("setLoading", true);
            this.form.patch("/api/products/updateStateTransaction/" + this.$route.query.id,{

            }).then(response =>{
                console.log('성공했습니다');
                this.$router.push(`/products/${this.$route.query.id}`)
            })
        },

    },

    computed: {
                user(){
                   return this.$auth.user.data;
                },

    },

    mounted() {
    this.getProduct();
    this.getChats();
    },

};
</script>
