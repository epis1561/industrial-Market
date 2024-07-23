<template>
    <div id="wrap">
        <main class="app-store row-group">
            <div class="title-wrap row-group">
                <div class="logo-icon"></div>
                <p class="title">
                    기계,공구,용품의 중고 거래 플랫폼
                </p>
                <div class="logo-txt"></div>
                <p class="txt">
                    다양한 산업용 중고제품, <br class="mb"> 산업마켓에서 만나보세요.
                </p>
            </div>
            <div class="btn-wrap col-group">
                <a href="" class="btn">
                    <img src="/images/app_store_google.png" alt="">
                </a>
                <a href="" class="btn">
                    <img src="/images/app_store_apple.png" alt="">
                </a>
            </div>
            <div class="footer">
                <img src="/images/app_qrcode.png" alt="" class="qr-code">

                <div class="footer-txt-wrap row-group">
                    <div class="footer-txt-group col-group">
                        <p class="footer-txt bold">
                            주식회사 산업마켓
                        </p>
                        <p class="footer-txt">
                            대표 : 안선숙
                        </p>
                        <p class="footer-txt">
                            주소 : 경기도 시흥시 서울대학로278번길 61, 448호 (배곧동 서영베니스스퀘어)
                        </p>
                    </div>
                    <div class="footer-txt-group col-group">
                        <p class="footer-txt">
                            사업자등록번호 : 123-45-67890
                        </p>
                        <p class="footer-txt">
                            통신판매업신고번호 : 2015-경기시흥-789
                        </p>
                    </div>
                    <div class="footer-txt-group col-group">
                        <p class="footer-txt">
                            FAX : 080-1544-1544
                        </p>
                        <p class="footer-txt">
                            TEL : 1544-1544
                        </p>
                        <p class="footer-txt">
                            E-mail : helpdesk@hhcompany.com
                        </p>
                    </div>
                    <p class="footer-copy-txt">
                        Copyright 2024 HHCOMPANY Co.,LTD All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {
    layout: "empty",
    head(){
        return {
            link: [
                {rel: 'stylesheet', href: '/css/developer.css'},

            ],
        }
    },
    data(){
        return {
            form : new Form(this.$axios, {
                email:"",
                password:"",
            })
        }
    },
    methods: {




    },

    computed: {

    },

    mounted() {

    }
}
</script>
