<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                공지사항 생성
            </h2>
        </div>

        <div class="form-wrap col-group">

            <div class="form-item row-group">
                <p class="item-default">
                    카테고리 <span class="star">*</span>
                </p>
                <div class="categoryBtns">
                    <div class="categorybuttons" v-for="category in noticeCategories.data" :key="category.id">
                        <button class="category" @click="form.notice_category_id = category.id" :class="{'active':form.notice_category_id === category.id}">
                            {{ category.title }}
                        </button>
                    </div>

                </div>

            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    제목 <span class="star">*</span>
                </p>
                <textarea class="form-textarea" placeholder="" v-model="form.title" required></textarea>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                  장문텍스트 <span class="star">*</span>
                </p>
              <input-editor :default ="form.description" @change="data => form.description = data"/>
            </div>
        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/notices" class="m-btn type01 bg-gray">목록</a>
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
               notice_category_id:"",
              title:"",
              description:"",
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
                return this.form.post("/api/admin/notices/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/notices");
                    });

            this.form.post("/api/admin/notices")
                .then(response => {
                    this.$router.push("/admin/notices");
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
        console(){
            console.log(this.noticeCategories.data);
        }
    },
    computed:{
        noticeCategories() {
            return this.$store.state.noticeCategories;
        }
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/notices/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set({...this.form, ...this.item});
                     this.form.notice_category_id = this.form.noticeCategory.id;
                    console.log(this.form);
                    this.loading = false;

                    $("html,body").scrollTop(0);
                })
        }

        this.loading = false;


    }

}
</script>
