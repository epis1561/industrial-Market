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
                    1:1 문의
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage board_detail" v-if="qna">
            <div class="container">
                <div class="title-wrap row-group">
                    <p class="title">
                       {{ qna.title }}
                    </p>
                    <div class="txt-group col-group">
                        <p class="txt date">
                            {{ qna.format_created_at }}
                        </p>
                        <p class="txt state" v-if="qna.answer==null">
                            답변대기
                        </p>
                        <p class="txt state complete" v-if="qna.answer!=null"> <!-- 답변 완료 시 complete 클래스 추가 -->
                            답변완료
                        </p>
                    </div>
                </div>

                <div class="con-wrap">
                   {{ qna.description }}
                </div>

                <div class="file-preview-scroll-wrap readonly">
                    <div class="file-preview-wrap col-group">
                        <div class="file-preview" v-for="img in qna.imgs" :key="img.id" >
                            <img :src="img.url ? img.url : ''" class="file-preview-img" @click="isImg=true"/>
                        </div>
                    </div>
                </div>

                <div class="inquiry-detail-ans" v-if="qna.answer">
                    <i class="icon xi-subdirectory-arrow"></i>
                    <div class="inquiry-detail-title-wrap col-group">
                        <p class="inquiry-detail-title">
                            산업마켓 고객센터
                        </p>
                        <p class="inquiry-detail-date">
                            {{ qna.format_answered_at }}
                        </p>
                    </div>
                    <div class="inquiry-detail-txt">
                        {{ qna.answer }}
                    </div>
                </div>

                <div class="form-footer col-group">
                    <button class="form-footer-btn del-btn" @click="remove">
                        삭제
                    </button>
                    <nuxt-link :to="`/qnas/create?id=${qna.id}`" class="form-footer-btn submit-btn">
                        수정
                    </nuxt-link>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
        </div>
        <!-- gnb End -->

        <!-- 이미지 슬라이드 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_slide" :class="{'active':isImg}">
            <div class="modal-wrap modal-slide-wrap">
                <i class="xi-close close-btn" @click="isImg=false"></i>
                <div class="swiper slide_popup">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="img in qna.imgs" :key="img.id">
                            <img :src="img.url ? img.url : ''"/>
                        </div>
                    </div>
                    <div class="swiper-pagination slide-popup-pagination"></div>
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
    data() {
        return {
            form: new Form(this.$axios, {
                page: 1,

            }),
            qna: "",
            isImg:false,
        }

    },

    methods: {
        getQna() {
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/qnas/" + this.$route.params.id, {}).then(response => {

                this.qna = response.data.data;
                this.$nextTick(() => {
                    this.initSwiper();
                });
                console.log(this.qna);
            })
        },
        remove(){
            this.form.delete("/api/qnas/" + this.qna.id).then(response => {
                this.$router.push("/qnas");
            })
        },
        initSwiper() {
            var swiper = new Swiper(".swiper", {
                        loop: true,
                        autoplay: {  // 자동 슬라이드 설정 , 비 활성화 시 false
                            delay: 3000,   // 시간 설정
                            disableOnInteraction: false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
                        },
                        pagination: {
                            el: '.detail-img-pagination',
                        },
                    }
            )
        },
    },

    computed: {},

    watch: {},


    mounted() {
        this.getQna();

    },

};
</script>
