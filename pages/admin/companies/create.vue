<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                광고주
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    이메일
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.email" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    기업형태
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.company_type" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    사업자 등록번호
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.company_business_number" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    회사명
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.company_title" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    대표자명
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.company_president" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    담당자명
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.name" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    연락처
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.contact" disabled>
            </div>

        </div>

<!--        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/companies" class="m-btn type01 bg-gray">목록</a>
                </div>
            </div>

            <div class="m-space-wrap">
                <div class="m-space">
                    <button class="m-btn type01 bg-primary" @click.prevent="store">저장</button>
                </div>
            </div>
        </div>-->

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
                return this.form.post("/api/admin/companies/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/companies");
                    });

            this.form.post("/api/admin/companies")
                .then(response => {
                    this.$router.push("/admin/companies");
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
            return this.$axios.get("/api/admin/companies/" + this.$route.query.id)
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
