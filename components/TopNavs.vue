<template>
    <form action="" @submit.prevent="search">
        <div id="FactoryNav">
            <div class="product-nav">
                <div class="container w1440 col-group">
                    <div class="cate-select-wrap">
                        <div :class="`select-default col-group nav ${activeCategory ? 'active' : ''}`" @click="activeCategory = !activeCategory">
                            <i class="xi-bars"></i>
                            <p class="default-txt">
                                전체 카테고리
                            </p>
                            <i class='xi-angle-up-min'></i>
                        </div>

                        <div class="cate-wrap col-group" v-if="activeCategory">
                            <div class="main-cate-list row-group">
                                <div class="main-cate-item" @click="path = '/drawingRequests'">
                                    도면 가공 서비스
                                </div>
                                <div class="main-cate-item" @click="path = '/bigNotices'">
                                    주문 생산 서비스
                                </div>
                                <div class="main-cate-item" @click="path = '/factoryApplications'">
                                    공장 공유 서비스
                                </div>
                                <div class="main-cate-item" @click="path = '/freelancers'">
                                    프리랜서 매칭
                                </div>
                            </div>

                            <div class="sub-cate-list row-group" v-if="path">
                                <div class="sub-cate-item" v-for="category in categories.data" :key="category.id" @click="selectCategory(category)">
                                    {{ category.title }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="search-wrap col-group">
                        <input type="text" placeholder="검색어를 입력하세요." class="search-input" v-model="word"/>
                        <div class="search-btn nav" @click="search">
                            <i class="xi-search"></i>
                        </div>
                    </div>

                    <a href="/factories/create" class="register-btn nav col-group" v-if="group === 'factories'">
                        <i class="xi-pen"></i>
                        공장 공유하기
                    </a>
                    <div class="btn-wrap col-group" v-if="group === 'factories'">
                        <a href="/mypage/users/edit" class="prod-btn nav row-group">
                            <img src="/images/icon_mypage.svg" alt="" />
                            마이페이지
                        </a>
                        <a href="/mypage/freelancer/factoryApplications" class="prod-btn nav row-group">
                            <img src="/images/icon_factories.svg" alt="" />
                            공장예약내역
                        </a>
                        <a href="/mypage/likes/factories" class="prod-btn nav row-group">
                            <img src="/images/icon_heart.svg" alt="" />
                            관심공장
                        </a>
                    </div>

                    <a href="/drawingRequests/create" class="register-btn nav col-group" v-if="group === 'drawingRequests'">
                        <i class="xi-pen"></i>
                        의뢰하기
                    </a>
                    <div class="btn-wrap col-group" v-if="group === 'drawingRequests'">
                        <a href="/mypage/users/edit" class="prod-btn nav row-group">
                            <img src="/images/icon_mypage.svg" alt="" />
                            마이페이지
                        </a>
                        <a href="/mypage/company/drawingRequests" class="prod-btn nav row-group">
                            <img src="/images/icon_contract.svg" alt="" />
                            나의 의뢰
                        </a>
                        <a href="/mypage/freelancer/drawingRequestApplications" class="prod-btn nav row-group">
                            <img src="/images/icon_estimate.svg" alt="" />
                            견적내역
                        </a>
                    </div>


                    <a href="/bigNotices/create" class="register-btn nav col-group" v-if="group === 'bigNotices'">
                        <i class="xi-pen"></i>
                        의뢰하기
                    </a>
                    <div class="btn-wrap col-group" v-if="group === 'bigNotices'">
                        <a href="/mypage/users/edit" class="prod-btn nav row-group">
                            <img src="/images/icon_mypage.svg" alt="" />
                            마이페이지
                        </a>
                        <a href="/mypage/company/bigNotices" class="prod-btn nav row-group">
                            <img src="/images/icon_contract.svg" alt="" />
                            주문생산 등록내역
                        </a>
                        <a href="/mypage/company/bigNoticeApplications" class="prod-btn nav row-group">
                            <img src="/images/icon_estimate.svg" alt="" />
                            견적내역
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
export default  {
    middleware: ["user"],

    props: {
        default_category_id: {
            required: false,
            default() {
                return "";
            }
        },

        default_word: {
            required: false,
            default() {
                return "";
            }
        }
    },

    data(){
        return {
            path: "",
            activeCategory: false,
            word: this.default_word,
            category_id: this.default_category_id,

            categories: {
                data: [],
                meta: {
                    current_page:1,
                    last_page:1
                }
            },
        }
    },

    methods: {
        getCategories(){
            this.$axios.get("/api/categories", {
                params: {

                }
            }).then(response => {
                this.categories = response.data;
            });
        },

        search(){
            location.href = `${this.path || this.defaultPath}?word=${this.word}&category_id=${this.category_id}`;

            this.path = "";
        },

        selectCategory(category){
            this.category_id = category.id;
            this.activeCategory = false;
            this.search();
        }
    },

    computed: {
        selectedCategory(){
            if(!this.category_id)
                return null;

            return this.categories.data.find(category => category.id == this.category_id);
        },

        group(){
            if(this.$route.path.includes('/factories') || this.$route.path.includes('/factories/create') || this.$route.path.includes('/factoryApplications') || this.$route.path.includes('/factoryApplications/create'))
                return "factories";

            if(this.$route.path.includes('/drawingRequests') || this.$route.path.includes('/drawingRequestApplications/create'))
                return "drawingRequests";

            if(this.$route.path.includes('/bigNotices') || this.$route.path.includes('/bigNoticeApplications/create'))
                return "bigNotices";
        },

        defaultPath(){
            if(this.group === 'factories')
                return "/factoryApplications";

            if(this.group === 'drawingRequests')
                return "/drawingRequests";

            if(this.group === 'bigNotices')
                return "/bigNotices";
        }
    },

    watch: {
        default_category_id(to, from) {
            this.category_id = this.default_category_id;
        },
        default_word(to, from) {
            this.word = this.default_word;
        }
    },

    mounted() {
        this.getCategories();
    }
}
</script>
