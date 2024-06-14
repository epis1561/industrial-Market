<template>
    <div class="subpage">
        <div class="login join">
            <div class="login-wrap">
                <div class="container">
                    <div class="join-tab-list col-group">
                        <a href="#" :class="`join-tab ${form.type === 'INFLUENCER' ? 'active' : ''}`" @click.prevent="form.type = 'INFLUENCER'">
                            체험단 회원가입
                        </a>
                        <a href="#" :class="`join-tab ${form.type === 'COMPANY' ? 'active' : ''}`" @click.prevent="form.type = 'COMPANY'">
                            광고주 회원가입
                        </a>
                    </div>

                    <div class="login-form-list row-group">
                        <template v-if="form.type === 'INFLUENCER'">
                            <div class="form-input-wrap">
                                <input-images @change="data => form.img = data" />
                                <error :form="form" name="img" />
                                <p class="guide-txt">
                                    프로필 이미지를 등록해주세요.
                                </p>
                            </div>

                            <div class="form-input-wrap">
                                <input type="text" class="form-input" placeholder="이메일" v-model="form.email">
                                <error :form="form" name="email" />
                            </div>

                            <div class="form-input-wrap">
                                <input type="password" class="form-input" placeholder="비밀번호" v-model="form.password">
                                <p class="guide-txt">
                                    비밀번호는 8자리 이상, 영문과 숫자 조합으로 입력해주세요.
                                </p>
                            </div>

                            <div class="form-input-wrap">
                                <input type="password" class="form-input" placeholder="비밀번호 확인" v-model="form.password_confirmation">
                                <error :form="form" name="password" />
                                <error :form="form" name="password_confirmation" />
                            </div>

                            <div class="form-input-wrap">
                                <input-verify-number @verified="data => form.contact = data" />

                                <error :form="form" name="contact" />
                                <!--                            <input type="number" class="form-input" placeholder="연락처">

                                                            &lt;!&ndash; input 입력시 활성화 - active 클래스 추가 &ndash;&gt;
                                                            <button class="form-input-btn">
                                                                인증번호
                                                            </button>-->
                            </div>

                            <div class="form-input-wrap">
                                <input type="text" class="form-input" placeholder="닉네임" v-model="form.nickname" @input="clearLetter('nickname')">
                                <error :form="form" name="nickname" />
                            </div>
                        </template>

                        <template v-else>


                            <div class="login-form-item row-group">
                                <p class="login-form-title">
                                    기본정보
                                </p>
                                <div class="form-input-wrap">
                                    <input type="text" class="form-input" placeholder="이메일" v-model="form.email">
                                    <error :form="form" name="email" />
                                </div>

                                <div class="form-input-wrap">
                                    <input type="password" class="form-input" placeholder="비밀번호" v-model="form.password">
                                    <p class="guide-txt">
                                        비밀번호는 8자리 이상, 영문과 숫자 조합으로 입력해주세요.
                                    </p>
                                </div>

                                <div class="form-input-wrap">
                                    <input type="password" class="form-input" placeholder="비밀번호 확인" v-model="form.password_confirmation">
                                    <error :form="form" name="password" />
                                    <error :form="form" name="password_confirmation" />
                                </div>
                            </div>
                            <div class="login-form-item row-group">
                                <p class="login-form-title">
                                    기업정보
                                </p>
                                <div class="form-input-wrap">
                                    <input type="text" class="form-input" placeholder="기업형태" v-model="form.company_type">
                                    <error :form="form" name="company_type" />
                                </div>

                                <div class="form-input-wrap">
                                    <input type="number" class="form-input" placeholder="사업자 등록번호 ( - 하이픈 제외 )" v-model="form.company_business_number">
                                    <error :form="form" name="company_business_number" />
                                </div>

                                <input type="text" class="form-input " placeholder="회사명" v-model="form.company_title" @input="clearLetter('company_title')">
                                <error :form="form" name="company_title" />

                                <input type="text" class="form-input " placeholder="대표자 명" v-model="form.company_president" @input="clearLetter('company_president')">
                                <error :form="form" name="company_president" />
                            </div>
                            <div class="login-form-item row-group">
                                <p class="login-form-title">
                                    담당자 정보
                                </p>
                                <input type="text" class="form-input" placeholder="담당자 명" v-model="form.name" @input="clearLetter('name')">
                                <error :form="form" name="name" />

                                <div class="form-input-wrap">
                                    <input-verify-number @verified="data => form.contact = data" />

                                    <error :form="form" name="contact" />
                                </div>
                            </div>
                        </template>

                        <div class="join-agree-wrap row-group">
                            <label for="" @click.prevent="agreeAll">
                                <input type="checkbox" class="form-checkbox" id="" disabled checked v-if="isAgreeAll">
                                <input type="checkbox" class="form-checkbox" id="" disabled v-else>
                                <div class="checked-item checked-item-all col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        전체동의
                                    </p>
                                </div>
                            </label>
                            <div class="join-agree-item col-group">
                                <label for="agree_1">
                                    <input type="checkbox" class="form-checkbox" id="agree_1" v-model="agree1">
                                    <div class="checked-item col-group">
                                        <div class="icon">
                                            <i class="xi-check"></i>
                                        </div>
                                        <p class="txt">
                                            [필수] 서비스 이용약관에 동의합니다.
                                        </p>
                                    </div>
                                </label>
                                <nuxt-link to="/contents/servicePolicy" class="more-btn">
                                    자세히 보기
                                </nuxt-link>
                            </div>
                            <label for="agree_2">
                                <input type="checkbox" class="form-checkbox" id="agree_2" v-model="agree2">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        [필수] 만 14세 이상입니다.
                                    </p>
                                </div>
                            </label>
                            <div class="join-agree-item col-group">
                                <label for="agree_3">
                                    <input type="checkbox" class="form-checkbox" id="agree_3" v-model="agree3">
                                    <div class="checked-item col-group">
                                        <div class="icon">
                                            <i class="xi-check"></i>
                                        </div>
                                        <p class="txt">
                                            [필수] 개인정보 수집 및 이용에 동의합니다.
                                        </p>
                                    </div>
                                </label>
                                <nuxt-link to="/contents/privacyPolicy" class="more-btn">
                                    자세히 보기
                                </nuxt-link>
                            </div>
                            <div class="join-agree-item col-group">
                                <label for="agree_5">
                                    <input type="checkbox" class="form-checkbox" id="agree_5" v-model="form.agree_promotion_email">
                                    <div class="checked-item checked-item-sub col-group">
                                        <div class="icon">
                                            <i class="xi-check"></i>
                                        </div>
                                        <p class="txt">
                                            [선택] 이메일 수신 동의
                                        </p>
                                    </div>
                                </label>
                                <nuxt-link to="/contents/privacyPolicy" class="more-btn">
                                    자세히 보기
                                </nuxt-link>
                            </div>
                            <div class="join-agree-item col-group">
                                <label for="agree_6">
                                    <input type="checkbox" class="form-checkbox" id="agree_6" v-model="form.agree_promotion_sms">
                                    <div class="checked-item checked-item-sub col-group">
                                        <div class="icon">
                                            <i class="xi-check"></i>
                                        </div>
                                        <p class="txt">
                                            [선택] SNS 수신 동의
                                        </p>
                                    </div>
                                </label>
                                <nuxt-link to="/contents/privacyPolicy" class="more-btn">
                                    자세히 보기
                                </nuxt-link>
                            </div>
                        </div>

                        <!-- <button type="button" class="login-btn">
                            회원가입
                        </button> -->
                        <a href="#" class="login-btn" @click.prevent="store">
                            회원가입
                        </a>
                    </div>

                    <!--
                    <div class="sns-login">
                        <div class="login-title-wrap">
                            <p class="sub-title">
                                간편 로그인이 필요하신가요?
                            </p>
                            <p class="title">
                                <strong>SNS 계정 회원가입</strong>
                            </p>
                        </div>
                        <div class="sns-login-list col-group">
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_kakao.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_naver.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_facebook.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_apple.png" alt="">
                            </button>
                            <button type="button" class="sns-login-btn" @click.prevent="ready">
                                <img src="/images/sns_login_google.png" alt="">
                            </button>
                        </div>
                    </div>
                    -->

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
                type: this.$route.query.type || 'INFLUENCER',
                email: "",
                nickname: "",
                password: "",
                password_confirmation: "",
                contact: "",
                img: [],

                company_type:"",
                company_business_number:"",
                company_title:"",
                company_president:"",

                agree_promotion_email: "",
                agree_promotion_sms: "",
            }),

            agree1: "",
            agree2: "",
            agree3: "",
        };
    },

    methods: {
        clearLetter(name){
          this.form[name] = this.form[name].replace(/[^a-zA-Z0-9]/g, '');

          if (this.form[name].length > 20) {
            this.form[name] = this.form[name].substring(0, 20);
          }
        },

        agreeAll(){
            this.form.agree_promotion_email = 1;
            this.form.agree_promotion_sms = 1;
            this.agree1 = 1;
            this.agree2 = 1;
            this.agree3 = 1;
        },

        store(){
            this.$store.commit("setLoading", true);
            this.form.post("/api/users")
                    .then(response => {
                        this.$store.commit("setLoading", true);

                        this.$auth.loginWith('laravelSanctum', {
                            data: {
                                email: this.form.email,
                                password: this.form.password,
                            }
                        }).then(response => {
                            if(this.form.type === "INFLUENCER")
                                return this.$router.push("/users/updateCategories");

                            return this.$router.push("/");
                        }).catch(error => {
                            this.form.onFail(error.response.data);
                        });
                    })
        },

        ready(message = '심사준비중입니다.'){
            return alert(message);
        },
    },

    computed: {
        isAgreeAll(){
            return this.agree1 && this.agree2 && this.agree3 && this.form.agree_promotion_email && this.form.agree_promotion_sms;
        },
    },
    watch: {

    },
    mounted() {


    }
}
</script>