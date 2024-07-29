<template>
    <body>
    <div id="wrap" class="navi">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    자주 묻는 질문
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage board_detail" v-if="faq">
            <div class="container">
                <div class="title-wrap row-group">
                    <p class="title">
                        {{ faq.title }}
                    </p>
                    <p class="date">
                        {{ faq.format_created_at }}
                    </p>
                </div>

                <div class="con-wrap">
                  <editor-content :description = "faq.description"/>
                </div>

                <div class="btm-wrap col-group">
                  <nuxt-link :to="faq.prev ? `/faqs/${faq.prev.id}` : ''" class="btn prev-btn" :class="{disabled : !faq.prev}">
                    <i class="xi-long-arrow-left"></i>
                    이전글
                  </nuxt-link>
                  <nuxt-link to="/faqs/" class="list-btn">
                    <i class="xi-bars"></i>
                  </nuxt-link>
                  <nuxt-link :to="faq.next ? `/faqs/${faq.next.id}` : ''" class="btn next-btn" :class="{disabled : !faq.next}">
                    다음글
                    <i class="xi-long-arrow-right"></i>
                  </nuxt-link>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb />
        </div>
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

            }),
            faq:null,

        }
    },

    methods: {
        getFaq() {
            this.$axios.get("/api/faqs/"+this.$route.params.id, {
                params: this.form.data(),
            }).then(response => {
                this.faq = response.data.data;
            })
        },

    },

    computed: {},

    watch: {},


    mounted() {
    this.getFaq();
    },

};
</script>
