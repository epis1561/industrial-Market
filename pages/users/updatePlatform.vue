<template>
    <div class="subpage">
        <div class="container w1200">
            <div class="recommend">
                <div class="recommend-wrap">
                    <div class="recommend-title-wrap">
                        <h2 class="title">
                            인플루언서님은 <br>
                            어떤 미디어의 캠페인이 편하신가요?
                        </h2>
                        <p class="txt">
                            · 블로그, 인스타그램, 유튜브 어떤 미디어가 편하신가요?!
                        </p>
                    </div>

                    <div class="recommend-content">
                        <div class="media-list col-group">
                            <div class="media-item">
                                <label for="media_1">
                                    <input type="radio" name="media" id="media_1" value="BLOG" v-model="form.platform">
                                    <div class="img blog"></div>
                                </label>
                            </div>
                            <div class="media-item">
                                <label for="media_2">
                                    <input type="radio" name="media" id="media_2" value="YOUTUBE" v-model="form.platform">
                                    <div class="img ytb"></div>
                                </label>
                            </div>
                            <div class="media-item">
                                <label for="media_3">
                                    <input type="radio" name="media" id="media_3" value="INSTAGRAM" v-model="form.platform">
                                    <div class="img insta"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="recommend-footer col-group">
                        <a href="#" class="recommend-footer-btn prev-btn" @click.prevent="() => $router.back()">
                            <i class="xi-angle-left"></i>
                            이전
                        </a>
                        <a href="#" class="recommend-footer-btn next-btn" @click.prevent="update">
                            시작하기
                        </a>
                    </div>
                </div>
                <div class="recommend-side-wrap">
                    <div class="recommend-side-title-wrap">
                        <img src="/images/icon_recommned.png" alt="" class="icon">
                        <p class="txt">
                            추천 캠페인
                        </p>
                        <h3 class="title">
                            선호도에 맞춰 <br>
                            캠페인을 추천드립니다.
                        </h3>
                    </div>
                    <div class="recommend-step-wrap col-group">
                        <div class="recommend-step step-3">
                            <div class="core"></div>
                        </div>
                        <div class="recommend-step-list row-group">
                            <div class="recommend-step-item">
                                <p class="title">
                                    01. 캠페인 분야
                                </p>
                                <p class="txt">
                                    자주 찾는 캠페인 분야가 있으신가요?
                                </p>
                            </div>
                            <div class="recommend-step-item">
                                <p class="title">
                                    02. 활동 지역
                                </p>
                                <p class="txt">
                                    지역 캠페인 진행에 어려움이 없는 <br>
                                    지역을 알려주세요!
                                </p>
                            </div>
                            <div class="recommend-step-item active">
                                <p class="title">
                                    03. 미디어
                                </p>
                                <p class="txt">
                                    선호하시는 미디어를 알려주세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "../../utils/Form";
export default {

    data() {
        return {
            form: new Form(this.$axios, {
                platform: "",
            }),
        };
    },

    methods: {
        update(){
            this.$store.commit("setLoading", true);
            
            this.form.patch("/api/users/updatePlatform")
                    .then(response => {
                        this.$router.push("/");
                    });
        },
    },

    computed: {

    },
    watch: {

    },
    mounted() {


    }
}
</script>