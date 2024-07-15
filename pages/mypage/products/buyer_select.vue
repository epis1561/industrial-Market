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
                    구매자 선택
                </h2>
                <h2 class="title" v-if="product && $auth.user.data.id == product.user.id && product.type == 1">
                    판매자 선택
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

<!--        &lt;!&ndash; 헤더 버튼 클릭시 나타나는 팝업 &ndash;&gt;-->
<!--        <div class="modal-container modal_chat">-->
<!--            <div class="modal-select-wrap modal-wrap">-->

<!--                <div class="chat-more-option-wrap row-group">-->
<!--                    <button class="chat-more-option col-group modal_block_btn">-->
<!--                        <i class="icon"></i>-->
<!--                        차단하기-->
<!--                    </button>-->
<!--                    <button class="chat-more-option col-group modal_report_btn">-->
<!--                        <i class="icon"></i>-->
<!--                        신고하기-->
<!--                    </button>-->
<!--                    <button class="chat-more-option col-group modal_notice_btn">-->
<!--                        <i class="icon"></i>-->
<!--                        알림끄기-->
<!--                    </button>-->
<!--                    &lt;!&ndash; 알림끄기 상태일 때 나타나는 버튼-->
<!--                    <button class="chat-more-option col-group modal_notice_btn">-->
<!--                        <i class="icon"></i>-->
<!--                        알림켜기-->
<!--                    </button>-->
<!--                    &ndash;&gt;-->
<!--                    <button class="chat-more-option col-group modal_leave_btn">-->
<!--                        <i class="icon"></i>-->
<!--                        채팅방 나가기-->
<!--                    </button>-->
<!--                </div>-->


<!--                <div class="modal-footer col-group">-->
<!--                    <button class="modal-footer-btn close-btn">-->
<!--                        취소-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->

<!--        </div>-->
<!--        &lt;!&ndash; //헤더 버튼 클릭시 나타나는 팝업 &ndash;&gt;-->

<!--        &lt;!&ndash; 차단하기 버튼 클릭 시 팝업 &ndash;&gt;-->
<!--        <div class="modal-container modal_block">-->
<!--            <div class="modal-wrap modal-alert">-->
<!--                <div class="modal-title-wrap">-->
<!--                    <i class="icon red"></i>-->
<!--                    <h3 class="modal-title">-->
<!--                        차단하기-->
<!--                    </h3>-->
<!--                </div>-->
<!--                <p class="modal-alert-txt">-->
<!--                    회원사 가공제품 페이지는 <br>-->
<!--                    <strong>사업자 정보 등록 후</strong> 작성 가능합니다. <br>-->
<!--                    지금 사업자 정보를 등록하시겠습니까?-->
<!--                </p>-->

<!--                <div class="modal-footer col-group">-->
<!--                    <button class="modal-footer-btn close-btn">-->
<!--                        취소-->
<!--                    </button>-->
<!--                    <button class="modal-footer-btn submit-btn">-->
<!--                        차단하기-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; //차단하기 버튼 클릭 시 팝업 &ndash;&gt;-->

<!--        &lt;!&ndash; 채팅방 나가기 버튼 클릭 시 팝업 &ndash;&gt;-->
<!--        <div class="modal-container modal_leave">-->
<!--            <div class="modal-wrap modal-alert">-->
<!--                <div class="modal-title-wrap">-->
<!--                    <i class="icon red"></i>-->
<!--                    <h3 class="modal-title">-->
<!--                        채팅방 나가기-->
<!--                    </h3>-->
<!--                </div>-->
<!--                <p class="modal-alert-txt">-->
<!--                    채팅방을 나가면 채팅 목록 및 대화 <br>-->
<!--                    내용이 삭제되고 복구할 수 없습니다. <br>-->
<!--                    채팅방을 나가시겠습니까?-->
<!--                </p>-->

<!--                <div class="modal-footer col-group">-->
<!--                    <button class="modal-footer-btn close-btn">-->
<!--                        취소-->
<!--                    </button>-->
<!--                    <button class="modal-footer-btn submit-btn">-->
<!--                        나가기-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; //채팅방 나가기 버튼 클릭 시 팝업 &ndash;&gt;-->

<!--        &lt;!&ndash; 신고하기 버튼 클릭시 나타나는 팝업 &ndash;&gt;-->
<!--        <div class="modal-container modal_report">-->
<!--            <div class="modal-wrap">-->
<!--                <i class="xi-close close-btn"></i>-->
<!--                <div class="modal-title-wrap border">-->
<!--                    <p class="modal-title">-->
<!--                        신고하기-->
<!--                    </p>-->
<!--                    <p class="modal-sub-title">-->
<!--                        아래의 목록에서 신고 사유를 선택해 주세요-->
<!--                    </p>-->
<!--                </div>-->

<!--                <div class="form-item row-group">-->
<!--                    <div class="form-label-wrap row-group">-->
<!--                        <label for="type_1">-->
<!--                            <input type="radio" class="form-radio" id="type_1" name="type">-->
<!--                            <div class="checked-item col-group">-->
<!--                                <div class="icon">-->
<!--                                    <i class="xi-check"></i>-->
<!--                                </div>-->
<!--                                <p class="txt">-->
<!--                                    허위 내용-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </label>-->
<!--                        <label for="type_2">-->
<!--                            <input type="radio" class="form-radio" id="type_2" name="type">-->
<!--                            <div class="checked-item col-group">-->
<!--                                <div class="icon">-->
<!--                                    <i class="xi-check"></i>-->
<!--                                </div>-->
<!--                                <p class="txt">-->
<!--                                    동일 내용 반복 게시 (도배)-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </label>-->
<!--                        <label for="type_3">-->
<!--                            <input type="radio" class="form-radio" id="type_3" name="type">-->
<!--                            <div class="checked-item col-group">-->
<!--                                <div class="icon">-->
<!--                                    <i class="xi-check"></i>-->
<!--                                </div>-->
<!--                                <p class="txt">-->
<!--                                    음란 / 선정성 / 비방-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </label>-->
<!--                        <label for="type_4">-->
<!--                            <input type="radio" class="form-radio" id="type_4" name="type">-->
<!--                            <div class="checked-item col-group">-->
<!--                                <div class="icon">-->
<!--                                    <i class="xi-check"></i>-->
<!--                                </div>-->
<!--                                <p class="txt">-->
<!--                                    광고/홍보-->
<!--                                </p>-->
<!--                            </div>-->
<!--                        </label>-->
<!--                        <label for="type_5">-->
<!--                            <input type="radio" class="form-radio" id="type_5" name="type">-->
<!--                            <div class="checked-item col-group">-->
<!--                                <div class="icon">-->
<!--                                    <i class="xi-check"></i>-->
<!--                                </div>-->
<!--                                <div class="txt-wrap row-group">-->
<!--                                    <p class="txt">-->
<!--                                        기타-->
<!--                                    </p>-->
<!--                                    &lt;!&ndash; 기타 선택 시 input 활성화 (disable 클래스 삭제) &ndash;&gt;-->
<!--                                    <input type="text" class="form-input disable" disabled="" placeholder="간단한 사유 입력">-->
<!--                                </div>-->

<!--                            </div>-->
<!--                        </label>-->
<!--                    </div>-->
<!--                </div>-->

<!--                <div class="modal-footer col-group">-->
<!--                    <button class="modal-footer-btn submit-btn">-->
<!--                        신고하기-->
<!--                    </button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; //신고하기 버튼 클릭시 나타나는 팝업 &ndash;&gt;-->

<!--        &lt;!&ndash; 알림끄기/켜기 버튼 클릭 시 팝업 &ndash;&gt;-->
<!--        <div class="modal-notice-txt">-->
<!--            채팅 알람이 꺼졌습니다.-->
<!--            &lt;!&ndash; 채팅 알람이 켜졌습니다. &ndash;&gt;-->
<!--        </div>-->
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
            }
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
               } )
               console.log(this.chats);
            });
        },
        store(){
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
