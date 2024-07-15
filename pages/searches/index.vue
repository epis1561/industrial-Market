<template>
<div>
    <form @submit.prevent="store" class="container">
        <div class="search-top col-group">
            <button type="button" class="sub-header-btn prev-btn" @click="back">
                <img src="/images/icon_prev.png" alt="">
            </button>


            <div class="search-input-wrap">
                <div class="search-category" v-if="productCategory">
                    {{ productCategory.title }}
                    <i class="del-btn" @click="delCategory()"></i>
                </div>

                <input type="text" class="search-input" placeholder="검색어를 입력하세요." v-model="form.title">

                <button class="btn-search">
                    <i class="xi-search"></i>
                </button>
            </div>
        </div>
    </form>

    <div class="search-section">
        <div class="search-section-title-wrap col-group">
            <h3 class="search-section-title">
                인기 검색
            </h3>
        </div>

        <div class="popular-search-wrap">
            <div class="popular-search-list col-group">
                <div class="popular-search-item" v-for="search in searches.data" :key="search.id" @click="latestStore(search.title)">
                    {{ search.title }}
                </div>
            </div>
        </div>
    </div>

    <div class="search-section">
        <div class="search-section-title-wrap col-group">
            <h3 class="search-section-title">
                최근 검색
            </h3>
            <button class="del-btn" @click="removeAll">전체 삭제</button>
        </div>

        <div class="recent-search-list row-group">
            <div class="recent-search-item col-group" v-for="latestSearch in latestSearches.data" :key="latestSearch.id" @click="latestStore(latestSearch.title)">
                <p class="txt">
                    {{ latestSearch.title }}
                </p>
                <button class="del-btn" @click="remove(latestSearch)"><i class="del-btn"></i></button>
            </div>
        </div>

        <div class="null-txt" v-if ="latestSearches.data.length < 1">
            최근 검색어가 없습니다.
        </div>


    </div>
</div>
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
                title: "",
                product_category_id: this.$route.query.product_category_id || "", // this.$route.query.product_category_id가 항상 값이 있는게 아니므로 없을 경우에 대한 처리 필요
            }),

            searches:{
                data: [],
                meta: {
                    current_page:1,
                    last_page:1,
                }
            },

            latestSearches:{
                data: [],
                meta: {
                    current_page:1,
                    last_page:1,
                }
            },
            productCategory:"",
            keywords:{
                  data:[],
                  meta:{
                    current_page:1,
                    last_page:1,
                  }
            },
          isEnough:false,
          isAdd:false,
        }
    },



    methods: {
        getSearches() {
            this.$axios.get("/api/searches", {

            }).then(response => {

                this.searches = response.data;
                this.productCategory = this.selectedCategory;

            })
        },
        getLatestSearches() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/searches/mine", {

            }).then(response => {
                this.latestSearches = response.data;
            })
        },
        store() {
            console.log(this.form.title);
            this.$store.commit("setLoading", true);

            this.form.post("/api/searches/", {

            }).then(response => {
                if(this.form.product_category_id)
                    return this.$router.push('/productCategories/' + this.form.product_category_id + '?word=' + this.form.title);

                return this.$router.push('/products?word=' + this.form.title);
            })
        },
      storeKeywords(text){
        this.form.title = text;
        console.log('키워드등록',text);
        const existKeyword = this.keywords.data.find(keyword => keyword.title === this.form.title);

        if(this.form.title && this.keywords.meta.total < 50){
          if(existKeyword){
            this.isAdd=false;
            console.log('실행');
            this.form.post("/api/keywords")
                .then(response => {
                  this.keywords.data.push(response.data);
                  this.keywords.meta.total+=1;
                  this.isAdd=false;
                  this.isEnough=false;
                  if(this.form.product_category_id)
                    return this.$router.push('/productCategories/' + this.form.product_category_id + '?word=' + this.form.title);

                  return this.$router.push('/products?word=' + this.form.title);
                })
          }

          else{
            this.isAdd=true;
            this.form.post("/api/keywords")
                .then(response => {


                  console.log(this.isAdd);
                  console.log(this.keywords.meta.total);
                  this.keywords.data.push(response.data);
                  this.keywords.meta.total+=1;
                  this.isAdd=false;
                  this.isEnough=false;
                  if(this.form.product_category_id)
                    return this.$router.push('/productCategories/' + this.form.product_category_id + '?word=' + this.form.title);

                  return this.$router.push('/products?word=' + this.form.title);
                })
          }

        }
        else if(this.keywords.meta.total >= 50) {
          this.isEnough=true;
          if(this.form.product_category_id)
          return this.$router.push('/productCategories/' + this.form.product_category_id + '?word=' + this.form.title);

          return this.$router.push('/products?word=' + this.form.title);
        }

      },
      latestStore(text) {
        this.form.title = text;
        this.$store.commit("setLoading", true);

        this.form.post("/api/searches/", {

        }).then(response => {

          this.storeKeywords(text);

        })
      },

        remove(latestSearch){
            this.$store.commit("setLoading", true);

                this.form.delete("/api/searches/detach/" + latestSearch.id)
                        .then(response => {
                            this.latestSearches.data = this.latestSearches.data.filter(itemData => itemData.id != latestSearch.id);

                        });
        },
        removeAll(){
            this.$store.commit("setLoading", true);

            this.form.delete("/api/searches/detachAll")
                    .then(response => {

                            this.latestSearches.data = [];



                    });
        },
        back() {
            this.$router.back();
        },
        delCategory(){
            this.productCategory = "";
            this.form.product_category_id= "";
            console.log(this.form.product_category_id);
        },
        selectCategory(popularItem){
            this.productCategory = popularItem;
            this.form.product_category_id  =  popularItem.id;
        },
      getKeywords(loadMore=false) {
        this.loading = true;
        this.$store.commit("setLoading", true);
        this.$axios.get("/api/keywords", {
          params: this.form.data(),
        }).then(response => {
          this.loading = false;
          if (loadMore) {

            this.keywords.data = [...this.keywords.data, ...response.data.data];
            console.log(this.keywords.meta);
            return this.keywords.meta = response.data.meta;

          }

          this.keywords = response.data;
        })
      },
    },

    computed: {

        productCategories(){
            return this.$store.state.productCategories;
        },

        selectedCategory(){
            return this.productCategories.data.find(category => category.id == this.$route.query.product_category_id);
        },
    },

    mounted() {
        this.getSearches();
        this.getLatestSearches();
        this.getKeywords();
    },

};
</script>
