<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    자주 묻는 질문
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage board">
            <form class="container" @submit.prevent="() => {form.page = 1; getFaqs()}">
                <div class="search-input-wrap">
                    <button><img src="/images/icon_search.png" alt="" class="icon"></button>
                    <input type="text" class="search-input" placeholder="무엇을 찾고 계신가요?" v-model="form.word">
                </div>
            </form>
            <div class="cate-wrap">
                <div class="cate-list col-group">
                    <div class="cate-item" :class="{'active': !form.faq_category_id}"
                         @click="() => {form.page = 1; form.faq_category = ''; showCategoriesFaq()}">
                        전체보기
                    </div>
                    <div class="cate-item" :class="{'active':form.faq_category_id == faqCategory.id}"
                         v-for="faqCategory in faqCategories.data" :key="faqCategory.id"
                         @click="() => {form.page =1; showCategoriesFaq(faqCategory.id)}">
                        {{ faqCategory.title }}
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="faq-list">
                    <nuxt-link :to="`/faqs/${faq.id}`" class="faq-item" v-for="faq in faqs.data" :key="faq.id">
                        <div class="content-wrap">
                            <p class="faq-text" v-if="faqs">Q</p>
                            <p class="faq-title">
                                {{ faq.title }}
                            </p>
                            <i class="icon" v-if="faqs"></i>
                        </div>
                    </nuxt-link>
                    <empty v-if="faqs.data.length === 0"/>
                </div>
            </div>
            <infinite-scroll v-if="faqs.meta" :loading="loading" :form="form" :meta="faqs.meta" :target-contents="'.faq-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getFaqs(true);}"/>
        </main>

        <!-- gnb Start -->
        <div id="gnb"></div>
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
                faq_category_id: "",
                word: "",
                page: 1,
            }),
            faqs: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            load: false,
            loading: false,

        }

    },

    methods: {
        getFaqs(loadMore = false) {
            this.loading = true;
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/faqs", {
                params: this.form.data(),
            }).then(response => {
                this.loading = false;
                if (loadMore) {

                    this.faqs.data = [...this.faqs.data, ...response.data.data]
                    return this.faqs.meta = response.data.meta;
                }

                this.faqs = response.data;

            })
        },


        showCategoriesFaq(id) {
            if (id) {
                this.form.faq_category_id = id;
            } else {
                this.form.faq_category_id = null;
            }
            this.loading = false;
            return this.getFaqs(false);

        }
    },

    computed: {
        faqCategories() {
            return this.$store.state.faqCategories;
        }
    },

    watch: {},


    mounted() {
        this.getFaqs();

    },

};
</script>
