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

        <main class="subpage">
            <div class="top-tab-wrap col-group">
                <nuxt-link to="/qnas" class="tab-item active">
                    문의 목록
                </nuxt-link>
                <nuxt to="/qnas/create" class="tab-item">
                    문의하기
                </nuxt>
            </div>
            <div class="container">

                <!-- 문의목록 없음 -->
                <div class="null-txt row-group" v-if="qnas.data.length === 0">
                    <i class="icon"></i>
                    문의 내용이 없습니다.
                </div>
                <!-- //문의목록 없음 -->

                <div class="notice-list">
                    <nuxt-link :to="`/qnas/${qna.id}`" class="notice-item" v-for="qna in qnas.data" :key="qna.id">
                        <div class="content-wrap row-group">
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
                                <p class="txt state" v-if="qna.answer" :class="{'complete':!qna.format_answered_at}">
                                    답변완료
                                </p>
                            </div>
                        </div>
                        <i class="icon"></i>
                    </nuxt-link>
                </div>

                <div class="inquiry-guide-group row-group">
                    <p class="inquiry-guide-txt">
                        상담에 필요한 정보 외 개인정보를 포함하지 않도록 주의해주세요.
                    </p>
                    <p class="inquiry-guide-txt">
                        비방/욕설/명예훼손성 게시글 및 관련 없는 광고글 등 부적절한 게시글 등록 시 게시글이 삭제 조치 될 수 있습니다.
                    </p>
                    <p class="inquiry-guide-txt">
                        자주 묻는 질문을 확인하면 답변을 빨리 받을 수 있어요.
                    </p>
                </div>

                <div class="form-footer">
                    <nuxt-link to="/qnas/create" class="form-footer-btn submit-btn">
                        문의등록
                    </nuxt-link>
                </div>

            </div>
        </main>

        <infinite-scroll v-if="qnas.meta" :loading="loading" :form="form" :meta="qnas.meta" :target-contents="'.notice-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getQnas(true);}"  />

        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
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

    data() {
        return {
            form: new Form(this.$axios, {
                page: 1,
            }),
            qnas: {
                data: []
            },

            loading: false,

            loadFirst: true,

        }
    },

    methods: {
        getQnas(loadMore = false) {
            this.loading = true;

            this.$store.commit("setLoading", true);

            this.$axios.get("/api/qnas", {
                params: this.form.data(),
            }).then(response => {
                        this.loading = false;

                        if (loadMore) {
                            this.qnas.data = [...this.qnas.data, ...response.data.data];

                            return this.qnas.meta = response.data.meta;
                        }

                        return this.qnas = response.data;
                    }
            )

        },
    },

    computed: {},

    watch: {},


    mounted() {
        this.getQnas();
    },

};
</script>
