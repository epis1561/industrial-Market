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
                    공지사항
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <form class="container" @submit.prevent="() => {form.page = 1; getNotices()}">
                <div class="search-input-wrap">
                    <button><img src="images/icon_search.png" alt="" class="icon"></button>
                    <input type="text" class="search-input" placeholder="무엇을 찾고 계신가요?" v-model="form.word" >
                </div>
            </form>
            <div class="cate-wrap">
                <div class="cate-list col-group">
                    <div class="cate-item" :class="{'active':!form.notice_category_id}" @click="() => {form.page = 1; showCategoriesNotice()}">
                        전체보기
                    </div>
                    <div class="cate-item" :class="{'active':form.notice_category_id==category.id}" v-for="category in noticeCategories.data" :key="category.id" @click="() =>{form.page = 1; showCategoriesNotice(category.id)}">
                        {{ category.title }}
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="notice-list">
                    <nuxt-link :to="`/notices/${notice.id}`" class="notice-item" v-for="(notice, index) in notices.data" :key="notice.id">
                        <div class="content-wrap row-group">
                            <p class="title">
                                {{index}} {{ notice.title }}
                            </p>
                            <p class="date">
                                {{ notice.format_created_at }}
                            </p>
                        </div>
                        <i class="icon"></i>
                    </nuxt-link>
                    <empty v-if="notices.data.length === 0"/>
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
                notice_category_id:"",
                word:"",
                page:1,
            }),
            notices:{
                data:[],
                meta: {
                    current_page: 1,
                    last_page: "",
                }
            },
            load:false,
        }
    },

    methods: {
        getNotices(load) {
            this.$store.commit("setLoading",true);

            this.$axios.get("/api/notices", {
                params: this.form.data(),
            }).then(response => {

                if (load) {
                    this.load = false;
                    return this.notices.data = [...this.notices.data, ...response.data.data];
                }
                this.notices = response.data;
            })
        },
        loadMore() {
            var scrollTop = $('.subpage').scrollTop();

            var innerHeight = $('.subpage').innerHeight();

            var scrollHeight = $('.subpage').prop('scrollHeight');
            if (this.load || this.form.page == this.notices.meta.last_page) {

                return;
            }

            if ( scrollTop + innerHeight >= scrollHeight - 50) {

                if(this.form.page < this.notices.meta.last_page) {
                    this.load=true;
                    this.form.page += 1;
                    return this.getNotices(this.load);
                };
            }
        },
        scroll(){
            $('.subpage').scroll(this.loadMore);
        },
        showCategoriesNotice(id){
            if(id){
            this.form.notice_category_id = id;
            }
            else{
                this.form.notice_category_id = null;
            }

            return this.getNotices();

        }

    },

    computed: {
        noticeCategories(){
            return this.$store.state.noticeCategories;
        }
    },

    watch: {},


    mounted() {
        this.getNotices();
        this.getNotices();
        setTimeout(() => {
            this.scroll();
        }, 500);

    },

};
</script>
