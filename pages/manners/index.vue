<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    받은 후기
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage mypage_sub">
            <div class="container">
                <div class="review-section-wrap row-group">
                    <div class="review-section">
                        <h3 class="review-section-title col-group">
                            <img src="/images/icon_face_good.png" alt="" class="img">
                            받은 매너 칭찬
                        </h3>
                        <div class="user-review-report row-group">
                            <div class="user-review-report-item col-group" v-for="manner in manners.data" :key="manner.id" v-if="manner.type==1">
                                <div class="item-box col-group">
                                    <p class="title">
                                        {{ manner.title }}
                                    </p>
                                </div>
                                <div class="item-box col-group">
                                    <img src="/images/icon_user.png" alt="" class="icon">
                                    <p class="num">
                                        {{ manner.count }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-section">
                        <h3 class="review-section-title col-group">
                            <img src="/images/icon_face_bad.png" alt="" class="img">
                            받은 비매너
                        </h3>
                        <div class="user-review-report row-group">
                            <div class="user-review-report-item col-group" v-for="manner in manners.data" :key="manner.id" v-if="manner.type==0">
                                <div class="item-box col-group">
                                    <p class="title">
                                        {{ manner.title }}
                                    </p>
                                </div>
                                <div class="item-box col-group">
                                    <img src="/images/icon_user.png" alt="" class="icon">
                                    <p class="num">
                                        {{ manner.count }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="guide-txt">
                        · 받은 비매너 내역은 나에게만 보입니다.
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                user_id:"",
            }),
            manners:{
                data:[],
                mata:{
                    current_page:1,
                    last_page:1,
                }
            }
        };
    },

    methods: {
        getManners(){
            this.form.user_id = this.$auth.user.data.id;

            console.log(this.form.user_id);
            this.$axios.get("/api/manners",{
                params: this.form.data(),
            })
                    .then(response => {
                        console.log(response.data);
                        this.manners = response.data;
                        console.log(this.manners);
                    })
        },

    },

    computed: {

    },
    watch: {

    },
    mounted() {
        this.getManners();
    }
}
</script>