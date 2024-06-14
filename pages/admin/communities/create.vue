<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                커뮤니티
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    제목 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.title" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    내용 <span class="star">*</span>
                </p>
                <input-editor @change="(data) => form.description = data" :default="form.description"/>
            </div>
<!--
            <div class="form-item row-group">
                <p class="item-default">
                    파일 <span class="star">*</span>
                </p>
                <input-files :default="item && item.img ? [item.img] : ''" comment="최소 1920*980px 비율 고해상도 사진 등록" @change="(data) => form.files = data" @removed="data => form.files_remove_ids = data" />
            </div>-->

        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/communities" class="m-btn type01 bg-gray">목록</a>
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
            form: new Form(this.$axios, {
                title: "",
                description: "",

                files: [],
                files_mobile: [],
                files_remove_ids: [],
            }),

            categories: {
                data: [],
            }
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/communities/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/communities");
                    });

            this.form.post("/api/admin/communities")
                .then(response => {
                    this.$router.push("/admin/communities");
                });
        },
    },


    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/communities/" + this.$route.query.id)
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
