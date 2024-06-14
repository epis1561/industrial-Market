<template>
    <div class="modal-box fixed">
        <div class="box fixed" data-name="write">
            <div class="mx-box">
                <h2 class="tl">신고하기</h2>
                <p class="tl mb32 mb-lg-16">어떤 문제가 있었나요?</p>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio01" value="원치 않는 상업성 콘텐츠 또는 스팸" v-model="form.reason">
                    <label for="radio01"><span>원치 않는 상업성 콘텐츠 또는 스팸</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio02" value="포르노 또는 음란물" v-model="form.reason">
                    <label for="radio02"><span>포르노 또는 음란물</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio03" value="아동학대" v-model="form.reason">
                    <label for="radio03"><span>아동학대</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio04" value="증오심 표현 또는 노골적인 폭력" v-model="form.reason">
                    <label for="radio04"><span>증오심 표현 또는 노골적인 폭력</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio05" value="테러 조장" v-model="form.reason">
                    <label for="radio05"><span>테러 조장</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio06" value="희롱 또는 괴롭힘" v-model="form.reason">
                    <label for="radio06"><span>희롱 또는 괴롭힘</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio07" value="자살 또는 자해" v-model="form.reason">
                    <label for="radio07"><span>자살 또는 자해</span></label>
                </div>
                <div class="check-box mb16 mb-lg-10">
                    <input type="radio" name="radio" id="radio08" value="잘못된 정보" v-model="form.reason">
                    <label for="radio08"><span>잘못된 정보</span></label>
                </div>
                <div class="check-box">
                    <input type="radio" name="radio" id="radio09" value="명의 도용" v-model="form.reason">
                    <label for="radio09"><span>명의 도용</span></label>
                </div>
            </div>
            <error :form="form" name="reason"/>
            <div class="button-box">
                <div class="col-6 pr6">
                    <a href="#" @click.prevent="close" class="btn btn-bd-active btn-md">취소</a>
                </div>
                <div class="col-6 pl6">
                    <a href="#" class="btn btn-active btn-md" @click="store">완료</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "@/utils/Form";
export default {
    props: ["user", "comment", "post"],

    data(){
        return {
            form: new Form(this.$axios, {
                reason: "",
                user_id: this.user ? this.user.id : "",
                comment_id: this.comment ? this.comment.id : "",
                post_id: this.post ? this.post.id : ""
            })
        }
    },

    methods: {
        store(){
            this.form.post("/api/reports")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "신고완료",
                        description : "성공적으로 처리되었습니다!"
                    });

                    this.close();
                });
        },

        close(){
            this.$emit("close");
        }
    },

    mounted() {

    }

}
</script>
