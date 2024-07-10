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
                    공지사항
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage board_detail" v-if="notice">
            <div class="container">
                <div class="title-wrap row-group">
                    <p class="title">
                        {{ notice.title }}
                    </p>
                    <p class="date">
                        {{ notice.format_created_at }}
                    </p>
                </div>

                <div class="con-wrap">
                    <editor-content :description="notice.description"/>
                </div>

                <!--
                <div class="btm-wrap col-group">
                    <a href="/notice_detail.html" class="btn prev-btn">
                        <i class="xi-long-arrow-left"></i>
                        이전글
                    </a>
                    <a href="/notice.html" class="list-btn">
                        <i class="xi-bars"></i>
                    </a>
                    <a href="/notice_detail.html" class="btn next-btn">
                        다음글
                        <i class="xi-long-arrow-right"></i>
                    </a>
                </div>
                -->
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
            notice:null,
        }
    },

    methods: {
        getNotice() {
            this.$axios.get("/api/notices/"+this.$route.params.id, {
                params: this.form.data(),
            }).then(response => {
                this.notice = response.data.data;
            })
        },

    },

    computed: {

    },

    watch: {

    },


    mounted() {
        this.getNotice();
    },

};
</script>
