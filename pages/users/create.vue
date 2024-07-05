<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div class="container col-group">
                <a href="#" class="sub-header-btn prev-btn" @click.prevent="$router.back">
                    <img src="images/icon_prev.png" alt="">
                </a>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage login">

            <div class="container row-group">

                <div class="login-header">
                    <h2 class="title">
                        회원가입
                    </h2>
                </div>

                <div class="form-wrap row-group">
                    <!-- 추후 본인인증 시 이름과 연락처는 readonly여야함 -->
                    <div class="form-item row-group">
                        <div class="item-default">
                            이름
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input">
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            연락처
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input">
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            닉네임(필수)
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="닉네임 입력(필수)">
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            이메일(필수)
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="이메일 입력(필수)">
                            <p class="guide-txt">
                                사용하시는 이메일 주소로 입력해 주세요. <br>
                                거래정보, 혜택 및 이벤트 정보를 보내드립니다.
                            </p>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            활동지역(필수)
                        </div>
                        <div class="item-user">
                            <div class="form-input-wrap col-group">
                                <select name="" id="" class="form-input form-select">
                                    <option value="광역시/도"></option>
                                </select>
                                <select name="" id="" class="form-input form-select">
                                    <option value="시/군/구"></option>
                                </select>
                            </div>
                            <p class="guide-txt">
                                활동 지역의 물품이 우선 노출됩니다.
                            </p>
                        </div>
                    </div>
                    <div class="area-setting-label col-group">
                        <label for="type_1">
                            <input type="checkbox" class="form-checkbox" id="type_1" name="type">
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    현재 위치로 설정
                                </p>
                            </div>
                        </label>
                        <p class="area-txt">
                            불광제1동
                        </p>
                    </div>
                </div>

                <div class="form-footer">
                    <a href="#" class="form-footer-btn submit-btn" @click.prevent="store">로그인</a>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import Form from "../../utils/Form";

export default {
    layout: "empty",
    data() {
        return {
            form: new Form(this.$axios, {
                social_id: "",
                social_platform: "",


                country: "테스트",

                name: "테스트",
                contact: "테스트",
                email: "테스트@naver.com",
                nickname: "테스트",

                city: "테스트",
                county: "테스트",
                town: "테스트",
                village: "테스트",
                lat: "테스트",
                lon: "테스트",

                active_county_id: 1,
            }),
        };
    },

    methods: {
        clearLetter(name) {
            this.form[name] = this.form[name].replace(/[^a-zA-Z0-9]/g, '');

            if (this.form[name].length > 20) {
                this.form[name] = this.form[name].substring(0, 20);
            }
        },

        store() {
            this.$store.commit("setLoading", true);
            this.form.post("/api/users")
                    .then(response => {
                        this.$store.commit("setLoading", true);

                        this.$auth.loginWith('laravelSanctum', {
                            data: {
                                token: response.data,
                            }
                        }).then(response => {
                            return this.$router.push("/");
                        }).catch(error => {
                            this.form.onFail(error.response.data);
                        });
                    })
        },

        ready(message = '심사준비중입니다.') {
            return alert(message);
        },
    },

    computed: {

    },
    watch: {},
    mounted() {
        if(this.$route.query.socialUser)
            this.socialUser = JSON.parse(this.$route.query.socialUser);

        if(this.socialUser) {
            if (this.socialUser.id)
                this.form.social_id = this.socialUser.id;

            if (this.socialUser.platform)
                this.form.social_platform = this.socialUser.platform;

            if (this.socialUser.nickname)
                this.form.nickname = this.socialUser.nickname;

            if (this.socialUser.email)
                this.form.email = this.socialUser.email;
        }
    }
}
</script>