<template>
    <body style="height:100vh; background-color:#fff;">

    <div class="container">
        <div class="search-top col-group">
            <button class="sub-header-btn prev-btn">
                <img src="/images/icon_prev.png" alt="" @click="isSearch(0)">
            </button>
            <div class="search-input-wrap" v-if="this.$route.params.id==null">
                <input type="text" class="search-input" placeholder="검색어를 입력하세요." v-model="this.form.title" @change="store()">
            </div>
            <div class="search-input-wrap" v-if="this.$route.params.id!=null">
                <div class="search-category">
                    중고기계
<!--현재 카테고리 따라가는부분인듯-->
                    <i class="del-btn" @click="remove()"></i>
                </div>
                <input type="text" class="search-input" placeholder="에서 검색해보세요." v-model="this.form.title">
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
    props: ["item","category"],
    data() {

        return {
            form: new Form(this.$axios, {
                page:1,
                title:null,
                product_category_id:"",
            }),
            searchesItem:
        {
            data:[]
        },
            recentSearchesItem:{
                data:[]},
            SearchCheck:null,
            productsCategories: {
                data: [],
            },
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
                params: this.form.data(),
            }).then(response => {

            })
        },
        remove(item){
            this.form.delete("/api/searches/detach/" + item.id)
                    .then(response => {
                        // this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    //현재아이템에서 새로필터한 아이템으로 가져온다. 받아온id가아닌애들만다시 필터해서....
                    //여기선 카테고리id로해야하나 여기서 할게아니라 여기에서는 이벤트로 해당하는 카테고리id를 인자로담아
                    // $emit후에 저카테고리가 아닌 상품목록이보이도록....만약 없으면 전체가 다보여야함. 디자인상 (중고기계)가빠지면 전체
                    });
        },
        removeAll(item){
            this.form.delete("/api/searches/detach/")
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },
        isSearch(num){
            this.SearchCheck=num;
            this.$emit("changeIsSearch", this.SearchCheck)
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