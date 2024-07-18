<template>
    <div id="wrap" v-if="load" class="qnas">
        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <nuxt-link to="/qnas/" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </nuxt-link>
                <h2 class="title">
                    1:1 문의
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-tab-wrap col-group">
                <nuxt-link to="/qnas" class="tab-item">
                    문의 목록
                </nuxt-link>
                <nuxt-link to="/qnas/create" class="tab-item active">
                    문의하기
                </nuxt-link>
            </div>

            <div class="container">

                <div class="form-wrap row-group">
                    <div class="form-item row-group">
                        <div class="item-default">제목</div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="제목을 입력하세요" v-model="form.title">
                            <error :form="form" name="title" />
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">문의내용</div>
                        <div class="item-user">
                            <div class="form-textarea-wrap">
                                <textarea name="" id="" maxlength="1000" class="form-textarea" v-model="form.description"></textarea>
                                <p class="sticker">
                                    <span>{{ form.description.length }}</span> / 1000
                                </p>
                            </div>
                            <error :form="form" name="description"></error>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="item-user">
                            <div class="file-upload-wrap col-group">

                                <label class="file-upload-btn" for="imgs" v-if="!qna">
                                    <i class="icon"></i>
                                    {{ form.imgs.length - form.imgs_remove_ids.length }}/5
                                </label>
                                <label class="file-upload-btn" for="imgs" v-if="qna">
                                    <i class="icon"></i>
                                    {{ qna.imgs.length + form.imgs.length - form.imgs_remove_ids.length  }}/5
                                </label>

                                <div class="file-preview-scroll-wrap">
                                    <div class="file-preview-wrap col-group">
                                        <input-images :max="max" :multiple="true" :default="qna ? qna.imgs : []" @removed="(data) => {form.imgs_remove_ids = data;}" @change="(data) => {form.imgs = data;}"/>
                                        <!--                                        <div class="file-preview">-->
                                        <!--                                            <img class="file-preview-img" src="/images/biz_program_01.png">-->
                                        <!--                                            <i class="xi-close"></i>-->
                                        <!--                                            <div class="file-preview-label">-->
                                        <!--                                                대표-->
                                        <!--                                            </div>-->
                                        <!--                                        </div>-->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="inquiry-guide-group row-group">
                        <p class="inquiry-guide-txt">
                            상담에 필요한 정보 외 개인정보를 포함하지 않도록 주의해주세요.
                        </p>
                        <p class="inquiry-guide-txt">
                            비방/욕설/명예훼손성 게시글 및 관련 없는 광고글 등 부적절한 게시글 등록 시 게시글이 삭제 조치 될 수 있습니다.
                        </p>
                        <p class="inquiry-guide-txt">
                            자주 묻는 질문을 확인하면 답변을 빨리 받을 수 있어요.
                        </p>
                    </div>
                    <div class="form-footer">
                        <button class="form-footer-btn submit-btn" :class="{'disabled': !checkInputAll}"  @click="isCreate=true">
                            문의등록
                        </button>
                    </div>
                </div>
                <div class="modal-container modal_trans" :class="{'active':isCreate}">
                    <div class="modal-wrap modal-alert">
                        <div class="modal-title-wrap">
                            <i class="icon blue"></i>
                        </div>
                        <p class="modal-alert-txt">
                            등록하시겠습니까?
                        </p>

                        <div class="modal-footer col-group">
                            <button class="modal-footer-btn submit-btn" @click="store">
                                예
                            </button>
                            <button class="modal-footer-btn close-btn" @click="isCreate=false">
                                아니오
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb"></div>
        <!-- gnb End -->
    </div>
</template>

<style>
.file-preview-label {
    top: 5px;
    left: 5px;
}

.m-file-wrap:first-child .file-preview-label {
    display: block;
    z-index: 9999;
}

.m-input-images.type01.hide {
    position: absolute;
    left: -50000000px;
    opacity: 0;
}

.m-input-images.type01 {
    display: flex;
    width: 100%;
    justify-content: start;
}

.m-input-images.type01 .m-input {
    margin-right: 0;
}

.m-input-images.type01 .m-input input {
    display: none;
}

.m-input-images.type01 .m-input .m-btn {
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 8px;
    width: 88px;
    height: 88px;
    background-color: #f5f5f5;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #a7a7a7;
    border: dashed 1px #a7a7a7;
    cursor: pointer;
}

.m-input-images.type01 .m-input .m-btn i {
    font-size: 32px;
    color: #a7a7a7;
}

.m-input-images.type01 .m-files-wrap {

}

.m-input-images.type01 .m-files {
    display: flex;
    flex-wrap: nowrap !important;
    margin: -4px;
}

.m-input-images.type01 .m-file-wrap {
    padding: 4px;
    position: relative;
}

.m-input-images.type01 .m-file {
    border-radius: 4px;
    width: 88px;
    height: 88px;
    position: relative;
    background-size: cover;
    background-position: center center;
    border: 1px solid #e1e1e1;
}

.m-input-images.type01 .m-file .m-btn-remove {
    width: auto;
    height: auto;
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 5px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.m-input-images.type01 .m-file .m-btn-remove i {
    color: #fff;
}
</style>
<script>

import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    data() {
        return {
            load: false,
            form: new Form(this.$axios, {
                title: "",
                description: "",
                imgs: [],
                imgs_remove_ids: [],
            }),
            max: 5,
            qna: null,
            isCreate:false,
            enough:false,
        }

    },

    methods: {



        store() {

            if(!this.checkInputAll){

            }
          this.$store.commit("setLoading", true);
            if (this.$route.query.id)
                return this.form.patch("/api/qnas/" + this.$route.query.id)
                        .then(response => {
                            this.isCreate=false;
                            this.$router.push("/qnas");
                        }).catch(error => {
                      this.isCreate=false;
              });

            this.form.post("/api/qnas").then(response => {
                this.$router.push("/qnas");
            }).catch(error => {
              this.isCreate=false;
              });
        },

        getQnas() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/qnas/" + this.$route.query.id, {})
                    .then(response => {
                        this.qna = response.data.data;

                        this.form.title = this.qna.title;
                        this.form.description = this.qna.description;
                        this.form.imgs = this.qna.imgs;
                        this.load = true;
                    })
        },
    },


    computed: {

        checkInputAll() {
            let exceptColumns = ["imgs", "imgs_remove_ids"];

            let keys = Object.keys(this.form.data());

            let result = true;

            keys.some(key => {
                if (exceptColumns.includes(key))
                    return false;

                if (Array.isArray(this.form[key]) && this.form[key].length === 0) {
                    result = false;
                    return true;
                }

                if (this.form[key] === "") {
                    result = false;

                    return true;
                }

                return false;
            });

            return result;
        },
    },

    watch: {

    },


    mounted() {
        if (this.$route.query.id)
            return this.getQnas();

        return this.load = true;
    },

};
</script>
