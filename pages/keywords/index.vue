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
                        <input type="text" class="search-input" placeholder="알림 받을 키워드를 입력해주세요." v-model="title">
                        <button class="submit-btn">등록</button>
                    </div>
                        <error :form="form" name="title"/>
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
                            <i class="del-btn" @click="closeKeyword(keyword.id,keyword.title)"></i>
                        </div>
                    </div>

                </div>
            </div>
        </main>
        <infinite-scroll v-if="keywords.meta" :loading="loading" :form="form" :meta="keywords.meta" :target-contents="'.recent-search-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getKeywords(true);}"/>


        <!-- gnb Start -->

            <gnb :mypage="isMy" />

        <!-- gnb End -->

        <!-- 등록 버튼 클릭 시 팝업 -->
        <flash :isAdd="isAdd" :isEnough="isEnough" :isEmpty="isEmpty"/>

        <!-- x삭제 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_alert" :class="{'active':isClose}">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon"></i>
                </div>
                <p class="modal-alert-txt">
                    {{ keywordTitle }} 키워드 알림을 삭제할까요?
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
    middleware: ["user"],
    load: false,
    data() {
        return {
            form: new Form(this.$axios, {
                page: 1,
                title:"",
            }),

            keywords: {
                data: [],
                meta:{
                    current_page:1,
                    last_page:1,
                }
                },
            isAdd:false,
            isClose:false,
            isEnough:false,
            loading:false,
            id: null,
            keywordTitle:"",
            isMy:true,
            title:"",
            isEmpty:false,
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

                  this.keywords.data = [...this.keywords.data, ...response.data.data];
                  console.log(this.keywords.meta);
                  return this.keywords.meta = response.data.meta;

                }

                this.keywords = response.data;
            })
        },
        store(){
            this.form.title=this.title;
            this.title="";
            const existKeyword = this.keywords.data.find(keyword => keyword.title === this.form.title);

          if(this.form.title && this.keywords.meta.total < 50){
                if(existKeyword){
                    this.isAdd=false;
                    console.log('실행');
                    this.form.post("/api/keywords")
                            .then(response => {


                                console.log(this.isAdd);
                                this.keywords.data.push(response.data);
                                this.keywords.meta.total+=1;
                                this.isAdd=false;
                                this.isEnough=false;
                                this.isEmpty=false;
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
                                this.isEmpty=false;
                            })
                }

            }
            else if(this.keywords.meta.total >= 50) {
                    this.isEnough=true;
                    console.log('else if');
                    return;
            }
            else{

                return  this.isEmpty=true;
            }


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
        closeKeyword(num,title){
            this.isClose=true;
            this.id=num;
            this.keywordTitle=title;
            console.log(this.keywordTitle)
            console.log(this.id);
        }

    },

    computed: {

    },
watch:{
    isEmpty(newVal) {
        if (newVal === true) {
            // 예를 들어, 3초 뒤에 isEmpty를 false로 변경
            setTimeout(() => {
                this.isEmpty = false;
            }, 1000); // 3초 후에 실행
        }
    },
    isEnough(newVal) {
        if (newVal === true) {
            // 예를 들어, 3초 뒤에 isEmpty를 false로 변경
            setTimeout(() => {
                this.isEnough = false;
            }, 1000); // 3초 후에 실행
        }
    }
},
    mounted() {
        this.getKeywords();
    },

};
</script>