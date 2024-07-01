<template>
    <div id="wrap" v-if="load">
        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
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
                            <error :form="form" name="title"></error>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">문의내용</div>
                        <div class="item-user">
                            <div class="form-textarea-wrap">
                                <textarea name="" id="" maxlength="1000" class="form-textarea"
                                          v-model="form.description"></textarea>
                                <p class="sticker">
                                    <span>{{ form.description.length }}</span> / 1000
                                </p>
                                <error :form="form" name="description"></error>
                            </div>
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
                                        <input-images :max="max" :multiple="true" :default="qna ? qna.imgs : []"
                                                      @removed="(data) => {form.imgs_remove_ids = data;}"
                                                      @change="(data) => {form.imgs = data;}"/>
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
                        <form @submit.prevent="store">
                            <button class="form-footer-btn submit-btn">
                                문의등록
                            </button>
                        </form>
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
    flex-wrap: wrap;
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
        }

    },

    methods: {
        store() {
            this.$store.commit("setLoading", true);


            if (this.$route.query.id)
                return this.form.patch("/api/qnas/" + this.$route.query.id)
                        .then(response => {
                            this.$router.push("/qnas");
                        });

            this.form.post("/api/qnas").then(response => {
                this.$router.push("/qnas");
            });
        },

        getQna() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/qnas/" + this.$route.query.id, {})
                    .then(response => {
                        this.qna = response.data.data;

                        this.form.title = this.qna.title;
                        this.form.description = this.qna.title;

                        this.load = true;
                    })
        },
    },


    computed: {},

    watch: {},


    mounted() {
        if (this.$route.query.id)
            return this.getQna();

        return this.load = true;
    },

};
</script>
