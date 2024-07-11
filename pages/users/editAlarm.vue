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
                    알림설정
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="mypage-menu-container row-group">
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        기본알림
                    </p>
                    <div class="mypage-menu-list row-group">
                        <div class="mypage-menu-item col-group">
                            <div class="txt-group row-group">
                                <p class="title">
                                    채팅 알림
                                </p>
                                <p class="txt">
                                    신규 채팅 메세지 도착 알림
                                </p>
                            </div>

                            <label for="switch_1" class="switch-wrap">
                                <input type="checkbox" id="switch_1" :checked="1" v-model="form.alarm_chat" @change="store" true-value="1" false-value="0">
                                <div class="switch">
                                    <div class="switch-core"></div>
                                </div>
                            </label>
                        </div>
                        <div class="mypage-menu-item col-group">
                            <div class="txt-group row-group">
                                <p class="title">
                                    후기 알림
                                </p>
                                <p class="txt">
                                    신규 후기 등록 알림
                                </p>
                            </div>

                            <label for="switch_2" class="switch-wrap">
                                <input type="checkbox" id="switch_2"v-model="form.alarm_review" @change="store" true-value="1" false-value="0">
                                <div class="switch">
                                    <div class="switch-core"></div>
                                </div>
                            </label>
                        </div>
                        <div class="mypage-menu-item col-group">
                            <div class="txt-group row-group">
                                <p class="title">
                                    관심 알림
                                </p>
                                <p class="txt">
                                    관심 상품의 가격 변동, 관심 회원 상품 등록 알림
                                </p>
                            </div>

                            <label for="switch_3" class="switch-wrap">
                                <input type="checkbox" id="switch_3" v-model="form.alarm_like" @change="store" true-value="1" false-value="0">
                                <div class="switch">
                                    <div class="switch-core"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        키워드 알림
                    </p>
                    <div class="mypage-menu-list row-group">
                        <div class="mypage-menu-item col-group">
                            <div class="txt-group row-group">
                                <p class="title">
                                    키워드 알림
                                </p>
                                <p class="txt">
                                    설정한 키워드가 포함된 글이 올라온 경우 알림
                                </p>
                            </div>

                            <label for="switch_4" class="switch-wrap" >
                                <input type="checkbox" id="switch_4" v-model="form.alarm_keyword" @change="store" true-value="1" false-value="0">
                                <div class="switch">
                                    <div class="switch-core"></div>
                                </div>
                            </label>
                        </div>
                        <nuxt-link to="/keywords" class="mypage-menu-item col-group">
                            <p class="title">
                                관심 키워드 설정
                            </p>
                            <div class="more-btn col-group">
                                <i class="icon"></i>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="mypage-menu-wrap">
                    <p class="mypage-menu-title">
                        혜택 · 이벤트
                    </p>
                    <div class="mypage-menu-list row-group">
                        <div class="mypage-menu-item col-group">
                            <div class="txt-group row-group">
                                <p class="title">
                                    산업마켓 소식 알림
                                </p>
                                <p class="txt">
                                    이벤트, 혜택 등 알림
                                </p>
                            </div>

                            <label for="switch_5" class="switch-wrap">
                                <input type="checkbox" id="switch_5" v-model="form.alarm_marketing" @change="store" true-value="1" false-value="0">
                                <div class="switch">
                                    <div class="switch-core"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
        </div>
        <!-- gnb End -->
    </div>
    </body>

</template>
<script>
import Form from "@/utils/Form";
export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                alarm_chat:this.$auth.user.data.alarm_chat,
                alarm_review:this.$auth.user.data.alarm_review,
                alarm_like:this.$auth.user.data.alarm_like,
                alarm_keyword:this.$auth.user.data.alarm_keyword,
                alarm_marketing:this.$auth.user.data.alarm_marketing,
            }),

        };
    },

    methods: {

        store(){
            this.form.patch("/api/users/updateAlarm").then(response => {
                console.log(this.$auth.user.data);
                this.$auth.fetchUser();
            })

        },

    },

    computed: {
        user(){
            return this.$auth.user.data;
        },
    },
    watch: {

    },
    mounted() {
        console.log(this.$auth.user.data);
    }
}
</script>