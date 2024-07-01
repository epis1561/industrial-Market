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
                    관심 키워드 설정
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="keyword-wrap">
                    <form @submit.prevent="store">
                    <div class="search-input-wrap keyword-input-wrap">
                        <input type="text" class="search-input" placeholder="알림 받을 키워드를 입력해주세요." v-model="form.title">
                        <button class="submit-btn">등록</button>
                    </div>
                    </form>
                    <div class="search-section-title-wrap col-group">
                        <h3 class="search-section-title">
                            등록된 키워드
                        </h3>
                        <div class="search-section-title amount" v-if="keywords.meta">
                            <span class="blue" v-if="keywords">{{ keywords.meta.total }}</span>
                            / 50
                        </div>
                    </div>
                    <div class="recent-search-list row-group">
                        <div class="recent-search-item col-group" v-for="keyword in keywords.data" :key="keyword.id">
                            <p class="txt">
                                {{ keyword.title }}
                            </p>
                            <i class="del-btn" @click="closeKeyword(keyword.id)"></i>
                        </div>
                    </div>

                </div>
            </div>
        </main>
        <infinite-scroll v-if="keywords.meta" :loading="loading" :form="form" :meta="keywords.meta" :target-contents="'.keyword-wrap'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getKeywords(true);}"  />
        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
        </div>
        <!-- gnb End -->

        <!-- 등록 버튼 클릭 시 팝업 -->
        <flash :isAdd="isAdd" :isEnough="isEnough" />

        <!-- x삭제 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_alert" :class="{'active':isClose}">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon"></i>
                </div>
                <p class="modal-alert-txt">
                    'cnc' 키워드 알림을 삭제할까요?
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isClose=false">
                        취소
                    </button>
                    <button class="modal-footer-btn submit-btn" @click="remove">
                        삭제
                    </button>
                </div>
            </div>
        </div>
        <!-- //x삭제 버튼 클릭 시 팝업 -->

    </div>
    </body>

</template>
<script>
import Form from "@/utils/Form";
export default {

    load: false,
    data() {
        return {
            form: new Form(this.$axios, {
                page: 1,
                title:"",
            }),

            keywords: {
                data: [],

                },
            isAdd:false,
            isClose:false,
            isEnough:false,
            loading:false,
            id: null,
        }

    },

    methods: {
        getKeywords(loadMore=false) {
            this.loading = true;
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/keywords", {
                params: this.form.data(),
            }).then(response => {
                this.loading = false;
                if (loadMore) {
                    this.load = false;
                    return this.keywords.data = [...this.keywords.data, ...response.data.data];
                }

                this.keywords = response.data;
                console.log(this.keywords);
            })
        },
        store(){
            this.isAdd=true;
            this.form.post("/api/keywords")
                    .then(response => {
                        if(this.form.title != null && this.form.title != this.keywords.data.title && this.keywords.meta.total < 50){
                        this.form.title="",
                        this.keywords.data.push(response.data);
                       this.keywords.meta.total+=1;
                        this.isAdd=false;
                        this.isEnough=false;
                        }

                        else{
                            this.isEnough=true;
                            return
                        }

                    });
        },
        remove(){

            console.log(this.isClose);
            this.form.delete("/api/keywords/detach/"+ this.id)
                    .then(response => {
                        this.keywords.meta.total -= 1
                        this.isClose=false;
                        return this.keywords.data = this.keywords.data.filter(data => data.id != this.id);
                    });
        },
        closeKeyword(num){
            this.isClose=true;
            this.id=num;
            console.log(this.id);
        }

    },

    computed: {

    },

    mounted() {
        this.getKeywords();
    },

};
</script>