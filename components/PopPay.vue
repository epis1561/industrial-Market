<template>
    <div class="popup-wrap">
        <div class="popup miles_charge">
            <button type="button" class="close" @click="() => {$emit('close')}">
                <i class="xi-close"></i>
            </button>
            <form action="" @keyup="() => {form.errors.clear()}">
                <h2 class="title">
                    마일리지 충전
                </h2>

                <div class="banner-box">
                    <img src="/images/mile_charge_banner.png" alt="">
                </div>

                <div class="charge-wrap">
                    <form action="">
                        <div class="payMethods">
                            <div class="payMethod-wrap" v-for="payMethod in payMethods.data" :key="payMethod.id">
                                <div class="payMethod">
                                    <input type="radio" :value="payMethod.id" :id="payMethod.id" v-model="form.pay_method_id">
                                    <label :for="payMethod.id">{{ payMethod.name }}</label>
                                </div>
                            </div>
                        </div>

                        <div class="charge-box col-group">
                            <div class="input-box">
                                <input type="number" placeholder="충전하실 금액을 작성해주세요." min="1000" max="1000000" v-model="form.point">
                                <p class="sticker scd5">원</p>
                            </div>

                            <button type="button" class="submit-btn scd5" @click="order">충전</button>
                        </div>

                        <p class="m-input-error" v-if="form.errors.has('point')">{{form.errors.get('point')}}</p>

                        <ul class="charge-list">
                            <li>
                                <a href="" class="col-group" @click.prevent="() => {form.point = 5000; order()}">
                                    <p class="left scd5">5,000 POINT</p>
                                    <p class="right scd5">5,000원 결제 <i class="xi-angle-right"></i></p>
                                </a>
                            </li>
                            <li>
                                <a href="" class="col-group" @click.prevent="() => {form.point = 10000; order()}">
                                    <p class="left scd5">10,000 POINT</p>
                                    <p class="right scd5">10,000원 결제 <i class="xi-angle-right"></i></p>
                                </a>
                            </li>
                            <li>
                                <a href="" class="col-group" @click.prevent="() => {form.point = 50000; order()}">
                                    <p class="left scd5">50,000 POINT</p>
                                    <p class="right scd5">50,000원 결제 <i class="xi-angle-right"></i></p>
                                </a>
                            </li>
                            <li>
                                <a href="" class="col-group" @click.prevent="() => {form.point = 100000; order()}">
                                    <p class="left scd5">100,000 POINT</p>
                                    <p class="right scd5">100,000원 결제 <i class="xi-angle-right"></i></p>
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Form from "@/utils/Form";
export default {
    data(){
        return {
            form: new Form(this.$axios, {
                point: "",
                pay_method_id: "",
                imp_uid: "",
                merchant_uid: ""
            }),

            payMethods: {
                data: [],
                meta: {}
            },
        }
    },

    methods: {
        getPayMethods(){
            this.form.get("/api/payMethods")
                .then(response => {
                    this.payMethods = response;

                    if(response.data.length > 0)
                        this.form.pay_method_id = response.data[0].id;
                });
        },

        order(){
            this.form.post("/api/orders")
                .then(response => {
                    this.pay(response.data.imp_code, response.data.m_redirect_url, response.data.order);
                });
        },

        pay(impCode, redirectUrl, order){
            if(!order)
                return alert("주문에 실패하였습니다. 잠시 후 재시도해주세요");

            let self = this;
            let IMP = window.IMP; // 생략가능

            IMP.init(impCode); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

            IMP.request_pay({
                pg : order.pay_method_pg, // version 1.1.0부터 지원.
                pay_method : order.pay_method_method,
                merchant_uid : order.merchant_uid,
                name : order.price + "포인트",
                amount : order.price,
                buyer_name : this.$auth.user.data.name,
                buyer_tel : this.$auth.user.data.contact,
                buyer_email : this.$auth.user.data.email,
                buyer_addr : '',
                buyer_postcode : '',
                m_redirect_url: redirectUrl
            }, function(rsp) {
                if ( rsp.success ) {
                    self.form.imp_uid = rsp.imp_uid;
                    self.form.merchant_uid = rsp.merchant_uid;

                    self.form.post("/api/orders/complete")
                        .then(response => {
                            self.$auth.fetchUser();
                            self.$router.push("/orders/complete?order_id=" + response.data.id);
                        }).catch(error => {
                            alert("결제에 실패하였습니다. 잠시 후 재시도해주세요.");
                    });
                } else {
                    let msg = '에러내용 : ' + rsp.error_msg;

                    alert(msg);
                }
            });
        }
    },

    mounted() {
        this.getPayMethods();
    }

}
</script>
