<template>
    <main class="wrap index" v-if="banners.data.length > 0">
        <section id="main_banner">
            <h2 class="hide">Main Banner</h2>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style="cursor:pointer;" @click="$router.push(banner.url)" v-for="banner in banners.data" :key="banner.id">
                        <img :src="banner.img ? banner.img.url : ''" alt="" />
                    </div>
                </div>
                <div class="swiper_btn_wrap">
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </section>

        <section id="category">
            <h2>
                체리뷰에 찾으시는<br>
                캠페인이 있으신가요?
            </h2>
            <div>
                <div class="category_nav">
                    <button>
                        <strong>{{type}}</strong>
                        <img src="/images/common/arrow_bottom.svg" alt="">
                    </button>
                    <ul>
                        <li>
                            <button @click.prevent="() => {form.type = ''; form.page=1; form.category_id=''; getCampaigns();}">전체</button>
                        </li>
                        <li>
                            <button @click.prevent="() => {form.type = 'PRODUCT'; form.page=1; form.category_id=''; getCampaigns();}">제품 캠페인</button>
                        </li>
                        <li>
                            <button @click.prevent="() => {form.type = 'LOCAL'; form.page=1; form.category_id=''; getCampaigns();}">지역 캠페인</button>
                        </li>
                        <li>
                            <button @click.prevent="() => {form.type = 'REPORTER'; form.page=1; form.category_id=''; getCampaigns();}">기자단 캠페인</button>
                        </li>
<!--                        <li>
                            <button>프리미어</button>
                        </li>-->
                    </ul>
                </div>
                <ul class="category_ul">
                    <button :class="`category_item`" @click.prevent="() => {form.premium = ''; form.category_id = ''; form.page=1; move();}">
                        <img src="/images/all.png">
                        <p>전체</p>
                    </button>

                    <button :class="`category_item`" @click.prevent="() => {form.category_id = category.id; form.page=1; move();}" v-for="category in categories.data" :key="category.id" v-if="form.type === 'REPORTER' || !form.type || category.type === form.type">
                        <img :src="category.img ? category.img.url : ''" alt="">
                        <p>{{ category.title }}</p>
                    </button>

                    <button :class="`category_item`" @click.prevent="() => {form.premium = 1; form.page=1; move();}">
                        <img src="/images/main/category/premiere_icon.svg" alt="">
                        <p>프리미어</p>
                    </button>
                </ul>
            </div>
        </section>

        <section id="common_pg1_moreview" class="campaign_common">
            <div class="campaign_common_list five_per_line">
                <campaign v-for="campaign in campaigns.data" :key="campaign.id" :campaign="campaign" />
            </div>
        </section>

        <section id="popularity_campaign" class="campaign_common" v-for="group in groups.data" :key="group.id">
            <div class="campaign_common_side">
                <h2 v-text="group.title" style="white-space: pre-line;"></h2>
                <h3 v-text="group.description" style="white-space: pre-line;"></h3>
                <nuxt-link to="/campaigns" class="more_btn">
                    <p>더 많은 캠페인 보기</p>
                    <img src="/images/main/popularity_campaign/arrow_right.svg" alt="">
                </nuxt-link>
                <ul>
                    <li v-for="(tag,index) in group.tags" :key="tag.id"># {{ tag.title }}</li>

                </ul>
            </div>
            <div class="campaign_common_list">
                <campaign v-for="campaign in group.campaigns" :key="campaign.id" :campaign="campaign" />
            </div>
        </section>

        <section id="common_pg1_line_banner" @click.prevent="() => $router.push('/campaigns')">
            <div>
                <h2>더 많은 캠페인을 확인해보세요</h2>
                <h3>새로운 제품, 지역 캠페인의 주인공이 되어보세요!</h3>
            </div>
            <img src="/images/main/line_banner.png" alt="휴대폰 보는 사람 일러스트">
        </section>
    </main>
</template>
<style>

</style>
<script>
import Pusher from "pusher-js";
import Form from "@/utils/Form";

export default {
    data() {
        return {
            form: new Form(this.$axios, {
                page:1,
                type: "",
                category_id: "",
                premium: "",
            }),

            groups: {
                data: [],
                meta: {
                    current_page:1,
                    last_page:1
                }
            },

            campaigns: {
                data: [],
                meta: {
                    current_page:1,
                    last_page:1
                }
            },
        };
    },

    methods: {
        getBanners(){
            if(this.banners.data.length > 0){
                return  this.$nextTick(() => {
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 1,
                        navigation: {
                            nextEl: '.main-banner-next',
                            prevEl: '.main-banner-prev',
                        },
                        paginationClickable: true,
                        spaceBetween: 30,
                        loop: true,
                        breakpoints: {
                            1280: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                        }
                    });
                });
            }

            this.$axios.get("/api/banners")
                    .then(response => {
                        this.$store.commit("setBanners", response.data);

                        this.$nextTick(() => {
                            var swiper = new Swiper('.swiper-container', {
                                pagination: '.swiper-pagination',
                                slidesPerView: 1,
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                paginationClickable: true,
                                spaceBetween: 30,
                                loop: true,
                                breakpoints: {
                                    1280: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                }
                            });
                        })
                    });
        },

        getCategories(){
            this.$axios.get("/api/categories")
                    .then(response => {
                        this.$store.commit("setCategories", response.data);
                    });
        },

        getGroups(){
            this.$axios.get("/api/groups")
                    .then(response => {
                        console.log(response.data);
                        this.groups = response.data;
                    });
        },

        getCampaigns(){
            this.$axios.get("/api/campaigns", {
                params: this.form.data()
            })
                    .then(response => {
                        this.campaigns = response.data;
                    });
        },

        move(){
            this.$router.push({
                path: "/campaigns",
                query: {
                    type: this.form.type,
                    category_id: this.form.category_id,
                    premium: this.form.premium,
                }
            })
        },

        addEvents(){
            setTimeout(function (){
                $(".category_nav>button").unbind("click").bind("click", () => {
                    $(".category_nav>button, .category_nav>ul").toggleClass("on")
                    $(".category_nav>ul").slideToggle();
                });

                $(".category_nav li").unbind("click").bind("click", () => {
                    $(".category_nav>button, .category_nav>ul").toggleClass("on")
                    $(".category_nav>ul").slideToggle();
                });
            }, 500);
        }
    },

    computed: {
        banners(){
            return this.$store.state.banners;
        },

        categories(){
            return this.$store.state.categories;
        },
        type(){
            if(this.form.type === "PRODUCT")
                return "제품 캠페인";

            if(this.form.type === "LOCAL")
                return "지역 캠페인";

            if(this.form.type === "REPORTER")
                return "기자단 캠페인";

            return "전체";
        },

    },

    mounted() {
        this.addEvents();

        this.getBanners();

        this.getCategories();

        this.getGroups();

        this.getCampaigns();

    }
};
</script>
