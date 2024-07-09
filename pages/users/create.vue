<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div class="container col-group">
                <a href="#" class="sub-header-btn prev-btn" @click.prevent="$router.back">
                    <img src="/images/icon_prev.png" alt="">
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
                            <input type="text" class="form-input" v-model="form.name">
                            <error :form="form" name="name" />
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            연락처
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" v-model="form.contact">
                            <error :form="form" name="contact" />
                        </div>
                    </div>

                    <div class="form-item row-group">
                        <div class="item-default">
                            닉네임(필수)
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="닉네임 입력(필수)" v-model="form.nickname">
                            <error :form="form" name="nickname" />
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            이메일(필수)
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="이메일 입력(필수)" v-model="form.email">
                            <error :form="form" name="email" />
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
                                <div name="" id="" class="select form-input form-input-half"
                                     @click.prevent.stop="activeCities = true, isLocationCurrent = false">
                                    {{ active_city || '광역시/도' }}
                                </div>
                                <div name="" id="" class="select form-input form-input-half"
                                     @click.prevent.stop="activeCities = true, isLocationCurrent = false">
                                    {{ active_county || '시/군/구' }}
                                </div>
                            </div>
                            <p class="guide-txt">
                                활동 지역의 물품이 우선 노출됩니다.
                            </p>
                        </div>
                    </div>
                    <div class="area-setting-label col-group">
                        <label for="type_0" >
                            <input type="checkbox" class="form-checkbox" id="type_0" name="type" v-model="isLocationCurrent"  @change="defaultLocation">
                            <error :form="form" name="location" />
                            <div class="checked-item col-group" :class="{ 'checked': isLocationCurrent && location.city }">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    현재 위치로 설정
                                </p>
                            </div>
                        </label>
                        <p class="area-txt">
                        {{ location.county }}
                        </p>
                    </div>
                </div>
                <pop-location :active="activeCities" @change="changeLocation" @close="activeCities = false" v-if="activeCities"/>
                <div class="form-footer">
                    <a href="#" class="form-footer-btn submit-btn" @click.prevent="store">로그인</a>
                </div>

            </div>
        </main>
    </div>
</template>
<style>
.checked-item{
    justify-content: unset !important;
}
</style>

<script>
import Form from "../../utils/Form";

export default {
    layout: "empty",
    data() {
        return {
            form: new Form(this.$axios, {
                social_id: "",
                social_platform: "",


                country: "",

                name: "",
                contact: "",
                email: "",
                nickname: "",

                city: "",
                county: "",
                town: "",
                village: "",
                lat: "",
                lon: "",

                active_country: "",
                active_city: "",
                active_county: "",
            }),

            active_country: "",
            active_city: "",
            active_county: "",
            isLocationCurrent: false,
            activeCities:false,

        };
    },

    methods: {
        changeLocation(county){
            this.active_country = county.country;
            this.active_city = county.city.title;
            this.active_county = county.title;
            console.log(this.active_country)
            console.log(this.active_city)
            console.log(this.active_county)
        },

        clearLetter(name) {
            this.form[name] = this.form[name].replace(/[^a-zA-Z0-9]/g, '');

            if (this.form[name].length > 20) {
                this.form[name] = this.form[name].substring(0, 20);
            }
        },

        defaultLocation() {
            if (this.isLocationCurrent) {
                 if(this.location.city) {
                     this.active_country = this.location.country;
                     this.active_city = this.location.city;
                     this.active_county = this.location.county;
                 }
                 else{
                     alert('위치정보제공 동의를 하지않아 현재위치를 불러 올 수 없습니다.\n위치제공정보에 동의해주세요.')
                     this.isLocationCurrent=false;
                     $('.form-checkbox').prop('checked', false); // 체크 해제
                 }
            } else {
                this.active_country = "";  // 혹은 다른 초기화 값으로 설정
                this.active_city = "";
                this.active_county = "";
            }
        },

        store() {
            this.$store.commit("setLoading", true);

            this.form.set({
                ...this.form.data(),
                ...this.location
            });

            this.form.active_country = this.active_country;
            this.form.active_county = this.active_county;
            this.form.active_city = this.active_city;
            console.log(this.form.active_country);
            console.log(this.form.active_county);
            console.log(this.form.active_city);
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

        location(){
            return this.$store.state.location;
        }
    },
    watch: {

    },
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