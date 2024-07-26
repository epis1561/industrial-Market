<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                QnA 답변생성
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    닉네임 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.user.nickname" disabled>
            </div>
            <div class="form-item row-group">
                <p class="item-default">
                    이미지 <span class="star">*</span>
                </p>
                <input-images :default="item && item.imgs ? [item.imgs] : ''" comment="" @change="(data) => form.files = data" @removed="data => form.files_remove_ids = data" disabled />
            </div>
            <div class="form-item row-group">
                <p class="item-default">
                    제목 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.title" disabled>
            </div>
            <div class="form-item row-group">
                <p class="item-default">
                   장문텍스트 <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.description" disabled></textarea>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    답변 <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.answer" required></textarea>
            </div>


        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/qnas" class="m-btn type01 bg-gray">목록</a>
                </div>
            </div>

            <div class="m-space-wrap">
                <div class="m-space">
                    <button class="m-btn type01 bg-primary" @click.prevent="store">저장</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import Form from "@/utils/Form";
export default {
    middleware: ["admin"],
    layout: "admin",

    props: {

    },

    data(){
        return {
            loading: true,
            keep: false,
            item: null,
            tag: "",

            form: new Form(this.$axios, {
                user: "",
                imgs: "",
                title: "",
                description:"",
                answer:"",
                files: [],
                files_mobile: [],
                files_remove_ids: [],

                tags:[],
            }),
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/qnas/" + this.item.id)
                        .then(response => {
                            this.$router.push("/admin/qnas");
                        });

            this.form.post("/api/admin/qnas")
                    .then(response => {
                        this.$router.push("/admin/qnas");
                    });
        },

        addTag(){
            let alreadyHas = this.form.tags.find(tag => tag === this.tag);

            if(!alreadyHas)
                this.form.tags.push(this.tag);

            this.tag = "";
        },

        removeTag(index){
            this.form.tags.splice(index, 1);
        },
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/qnas/" + this.$route.query.id)
                    .then(response => {
                        this.item = response.data.data;

                        this.form.set({...this.form, ...this.item});
                        console.log(this.form);
                        this.loading = false;

                        $("html,body").scrollTop(0);
                    })
        }

        this.loading = false;


    }

}
</script>
