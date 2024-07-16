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
                    회원탈퇴
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="withdrawal-wrap row-group">
                <div class="mypage-menu-container row-group">
                    <div class="mypage-menu-wrap">
                        <p class="mypage-menu-title">
                            아래 내용을 꼭 읽어주세요.
                        </p>
                        <div class="withdrawal-list row-group">
                            <div class="withdrawal-item col-group">
                                <p class="num">1.</p>
                                <p class="txt">
                                    탈퇴 시, 7일간 재가입 할 수 없습니다.
                                </p>
                            </div>
                            <div class="withdrawal-item col-group">
                                <p class="num">2.</p>
                                <p class="txt">
                                   회원 탈퇴 시, 작성하신 모든 내용은 자동 삭제되며, 삭제된 데이터는 복구가 불가능 합니다.
                                </p>
                            </div>
                            <div class="withdrawal-item col-group">
                                <p class="num">3.</p>
                                <p class="txt">
                                        법령에 의하여 보관해야 하는 경우 또는 회원가입 남용, 서비스 부정 사용 등을 위한 회사 내부 정책에 의하여 보관해야 하는 정보는 회원 탈퇴일로부터 6개월간 보관되며, 이후 자동 삭제됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mypage-menu-wrap">
                        <label for="type_1">
                            <input type="checkbox" class="form-checkbox" id="type_1" name="type" v-model="form.isAgree">
                            <error :form="form" name="동의"  />
                            <div class="checked-item col-group">
                                <div class="icon">
                                    <i class="xi-check"></i>
                                </div>
                                <p class="txt">
                                    위 내용을 모두 확인하였으며, 동의합니다.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="form-footer container col-group">
                    <button class="form-footer-btn del-btn" :class="{'submit-btn':form.isAgree}" @click="isRemove = true" :disabled="!form.isAgree">회원탈퇴</button>
                    <button class="form-footer-btn del-btn" @click="$router.back()">취소</button>
                </div>
              <div class="modal-container modal_trans" :class="{'active':isRemove}">
                <div class="modal-wrap modal-alert">
                  <div class="modal-title-wrap">
                    <i class="icon blue"></i>
                  </div>
                  <p class="modal-alert-txt">
                    정말로 탈퇴하시겠습니까?
                  </p>

                  <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn" @click="remove">
                      예
                    </button>
                    <button class="modal-footer-btn close-btn" @click.prevent="isRemove=false">
                      아니오
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-container modal_trans" :class="{'active':removeComplete}">
                <div class="modal-wrap modal-alert">
                  <div class="modal-title-wrap">
                    <i class="icon blue"></i>
                  </div>
                  <p class="modal-alert-txt">
                    회원 탈퇴가 완료되었습니다.<br>
                    아쉽지만, 다음에 또 만나요.
                  </p>
                </div>
              </div>
            </div>
        </main>

    </div>
</template>
<script>
import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {
                isAgree:"",
            }),
            isRemove:false,
            removeComplete:false,

        }

    },

    methods: {
            remove(){
                if(this.form.isAgree == true) {
                    this.form.delete("api/users")
                            .then(response => {
                              this.removeComplete=true;
                              setTimeout(() => {
                                this.$auth.logout();
                              }, 2000); // 2초(2000밀리초) 후에 로그아웃 처리
                            })
                }

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