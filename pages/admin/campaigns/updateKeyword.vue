<template>
    <div class="admin-wrap admin-detail-wrap admin-keywords" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                키워드 기록
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    키워드 등록 <span class="star">*</span>
                </p>
                <div class="inputs-wrap">
                    <div class="inputs" style="display: flex; gap:12px; width:450px" v-for="(keyword, index) in form.keywords" :key="index">
                        <input type="text" placeholder="키워드명" class="form-input" v-model="form['keywords'][index].title" required>
                        <input type="number" style="width:120px; text-align: center;" placeholder="검색수" class="form-input" v-model="form['keywords'][index].count" required>

                        <button class="btn btn-add" @click.prevent="add" v-if="form.keywords.length - 1 === index">
                            <i class="xi-plus"></i>
                        </button>
                        <button class="btn btn-delete" @click.prevent="remove(index)">
                            <i class="xi-trash"></i>
                        </button>
                    </div>

                </div>

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
<style>
.admin-keywords .inputs {
    margin-top:12px;
}
.admin-keywords .btn {
    flex: 0 0 auto;
    width:48px; height:48px;
    font-weight:bold;
    border-radius:3px; border:2px solid black;
}
.admin-keywords .btn i {
    font-weight:bold;
}
</style>
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
                keywords: []
            }),

            keyword: {
                title: "",
                count: "",
            }
        }
    },

    methods: {
        store(){
            return this.form.post("/api/admin/campaigns/updateKeyword/" + this.$route.query.id)
                .then(response => {
                    this.$router.push("/admin/campaigns");
                });
        },

        add(){
            this.form.keywords.push({...this.keyword});
        },

        remove(index){
            this.form.keywords.splice(index, 1);
        },
    },

    mounted() {
        return this.$axios.get("/api/admin/campaigns/" + this.$route.query.id)
            .then(response => {
                this.form.keywords = response.data.data.keywords;

                if(this.form.keywords.length === 0)
                    this.add();

                this.loading = false;

                $("html,body").scrollTop(0);
            })

    }

}
</script>
