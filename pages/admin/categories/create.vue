<template>
    <div class="admin-wrap admin-detail-wrap user" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                카테고리
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    유형 <span class="star">*</span>
                </p>
                <select name="" id="" class="form-select" v-model="form.type">
                    <option value="">선택</option>
                    <option value="LOCAL">지역</option>
                    <option value="PRODUCT">제품</option>
                    <option value="REPORTER">기자단</option>
                </select>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    제목 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.title">
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
                    <a href="/admin/categories" class="m-btn type01 bg-gray">목록</a>
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
                type: "",
                title: "",
                description: "",
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
                return this.form.post("/api/admin/categories/" + this.item.id)
                    .then(response => {
                        this.$router.replace("/admin/categories");
                    });

            this.form.post("/api/admin/categories")
                .then(response => {
                    this.$router.replace("/admin/categories");
                });
        },
    },


    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/categories/" + this.$route.query.id)
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
