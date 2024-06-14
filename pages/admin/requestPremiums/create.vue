<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                예시제목
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    선택 <span class="star">*</span>
                </p>
                <select name="" id="" class="form-select" v-model="form.type" required>
                    <option value="" disabled>선택</option>
                </select>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    태그 <span class="star">*</span>
                </p>
                <div class="item-user">
                    <div class="form-input-btn-wrap">
                        <input type="text" class="form-input" placeholder="생성할 태그를 작성해주세요." v-model="tag">
                        <button class="form-input-btn" @click.prevent="addTag">생성</button>
                    </div>
                    <div class="form-tag-wrap" v-if="form.tags.length > 0" style="margin-top:12px;">
                        <div class="form-tag" v-for="(tag, index) in form.tags" :key="index">
                            {{ tag }}
                            <button class="form-tag-del-btn" @click.prevent="removeTag(index)">
                                <i class="xi-close-min"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    텍스트 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.title" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    장문텍스트 <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.description"></textarea>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    파일 <span class="star">*</span>
                </p>
                <input-files :default="item && item.img ? [item.img] : ''" comment="최소 1920*980px 비율 고해상도 사진 등록" @change="(data) => form.files = data" @removed="data => form.files_remove_ids = data" />
            </div>

        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/campaigns" class="m-btn type01 bg-gray">목록</a>
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
                title: "",
                type: "",
                url: "",
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
                return this.form.post("/api/admin/campaigns/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/campaigns");
                    });

            this.form.post("/api/admin/campaigns")
                .then(response => {
                    this.$router.push("/admin/campaigns");
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
            return this.$axios.get("/api/admin/campaigns/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set({...this.form, ...this.item});

                    this.loading = false;

                    $("html,body").scrollTop(0);
                })
        }

        this.loading = false;


    }

}
</script>
