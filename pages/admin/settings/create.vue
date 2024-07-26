<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                금액설정
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    최소금액설정 <span class="star">*</span>
                </p>
                <input type="number" class="form-input" v-model="form.min_price_for_show" required>
            </div>
        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/settings" class="m-btn type01 bg-gray">목록</a>
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
               min_price_for_show:"",
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
                return this.form.post("/api/admin/settings/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/settings");
                    });

            this.form.post("/api/admin/settings")
                .then(response => {
                    this.$router.push("/admin/settings");
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
            return this.$axios.get("/api/admin/settings/" + this.$route.query.id)
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
