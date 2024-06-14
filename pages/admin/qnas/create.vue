<template>
    <div class="admin-wrap admin-detail-wrap user" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                문의사항
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    카테고리 <span class="star">*</span>
                </p>
                <textarea class="form-textarea disabled" placeholder="" v-model="form.format_category" disabled></textarea>
            </div>
            <div class="form-item row-group">
                <p class="item-default">
                    제목 <span class="star">*</span>
                </p>
                <textarea class="form-textarea disabled" placeholder="" v-model="form.title" disabled></textarea>
            </div>
            <div class="form-item row-group">
                <p class="item-default">
                    내용 <span class="star">*</span>
                </p>
                <textarea class="form-textarea disabled" placeholder="" v-model="form.description" disabled></textarea>
            </div>
            <div class="form-item row-group">
                <p class="item-default">
                    이미지 <span class="star">*</span>
                </p>
                <input-images :default="item.imgs" :only-show="true"/>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    답변 <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.answer"></textarea>
            </div>
        </div>

        <div class="m-spaces type01 mt-40 flex-end">
<!--            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/qnas" class="m-btn type01 bg-gray">목록</a>
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
                answer: "",
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
                return this.form.post("/api/admin/qnas/" + this.item.id)
                    .then(response => {
                        this.$router.back();
                    });

            this.form.post("/api/admin/qnas")
                .then(response => {
                    this.$router.back();
                });
        },
    },


    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/qnas/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set({...this.form, ...this.item});

                    console.log(this.item);

                    this.loading = false;

                    $("html,body").scrollTop(0);
                })
        }

        this.loading = false;


    }

}
</script>
