<template>
    <body>

    <div class="container">
        <div class="search-top col-group">
            <button class="sub-header-btn prev-btn">
                <img src="images/icon_prev.png" alt="">
            </button>
            <div class="search-input-wrap">
                <input type="text" class="search-input" placeholder="검색어를 입력하세요.">
            </div>
            <div class="search-input-wrap">
                <div class="search-category">
                    중고기계
                    <i class="del-btn"></i>
                </div>
                <input type="text" class="search-input" placeholder="에서 검색해보세요.">
            </div>
        </div>
    </div>

    <div class="search-section">
        <div class="search-section-title-wrap col-group">
            <h3 class="search-section-title">
                인기 검색
            </h3>
        </div>

        <div class="popular-search-wrap">
            <div class="popular-search-list col-group">
                <div class="popular-search-item" v-for="popularItem in searchesItem.data" :key="popularItem.id">
                    {{ popularItem.title }}
                </div>
            </div>
        </div>
    </div>

    <div class="search-section">
        <div class="search-section-title-wrap col-group">
            <h3 class="search-section-title">
                최근 검색
            </h3>
            <button class="del-btn">전체 삭제</button>
        </div>

        <div class="recent-search-list row-group">
            <div class="recent-search-item col-group" v-for="recent in recentSearchesItem.data" key="recent.id">
                <p class="txt">
                    {{ recent.title }}
                </p>
                <i class="del-btn"></i>
            </div>
        </div>

        <div class="null-txt" v-if ="recentSearchesItem.length < 1">
            최근 검색어가 없습니다.
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
                page:1,
                title:null,
            }),
            searchesItem:[],
            recentSearchesItem:[],
        }



    },



    methods: {
        searches() {
            this.$axios.get("/api/searches", {

            }).then(response => {
                console.log(response.data);
                this.searchesItem = response.data;
            })
        },
        recentSearches() {
            this.$axios.get("/api/searches/mine", {

            }).then(response => {
                console.log(response.data);
                this.recentSearchesItem = response.data;
            })
        },
        store(){
            this.form.post("/api/searches",{

            }).then(response => {
                this.$router.push("/products");
            })
        },
        remove(item){
                this.form.delete("/api/searches/detach/" + item.id)
                        .then(response => {
                            this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                        });
        },
        removeAll(item){
            this.form.delete("/api/searches/detach/")
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },
    },

    computed: {


    },

    mounted() {
        this.searches();
        this.recentSearches();
    },

};
</script>
<head>
<script src="/js/filter.js" defer></script>
</head>