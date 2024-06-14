<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                검색상위노출 인증샷
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    파일 <span class="star">*</span>
                </p>
                <input-files :multiple="true" :default="item.tops" @change="(data) => form.files = data" @removed="data => form.files_remove_ids = data" />
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
            return this.form.post("/api/admin/campaigns/updateTop/" + this.item.id)
                .then(response => {
                    this.$router.push("/admin/campaigns");
                });
        },


    },

    mounted() {
        return this.$axios.get("/api/admin/campaigns/" + this.$route.query.id)
            .then(response => {
                this.item = response.data.data;

                this.form.set({...this.form, ...this.item});

                this.loading = false;

                $("html,body").scrollTop(0);
            })
    }

}
</script>
