<template>
    <div class="admin-wrap admin-detail-wrap user" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                배너
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    제목 <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.title"></textarea>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    URL <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.url"></textarea>
            </div>


            <div class="form-item row-group">
                <p class="item-default">
                    이미지 <span class="star">*</span>
                </p>
                <input-files :default="item && item.img ? [item.img] : ''" @change="(data) => form.files = data" @removed="data => form.files_remove_ids = data" />
            </div>

        </div>

        <div class="m-spaces type01 mt-40 flex-end">
<!--            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/banners" class="m-btn type01 bg-gray">목록</a>
                </div>
            </div>-->

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
                url: "",
                files: [],
                files_mobile: [],
            }),

            categories: {
                data: [],
            }
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/banners/" + this.item.id)
                    .then(response => {
                        this.$router.replace("/admin/banners");
                    });

            this.form.post("/api/admin/banners")
                .then(response => {
                    this.$router.replace("/admin/banners");
                });
        },
    },


    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/banners/" + this.$route.query.id)
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
