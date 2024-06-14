<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                인플루언서
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    이메일 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.email" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    닉네임 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.nickname" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    연락처 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.contact" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    이메일 수신여부 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.nickname" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    텍스트 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.nickname" required>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    텍스트 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.nickname" required>
            </div>

        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/influencers" class="m-btn type01 bg-gray">목록</a>
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
                return this.form.post("/api/admin/influencers/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/influencers");
                    });

            this.form.post("/api/admin/influencers")
                .then(response => {
                    this.$router.push("/admin/influencers");
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
            return this.$axios.get("/api/admin/influencers/" + this.$route.query.id)
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
