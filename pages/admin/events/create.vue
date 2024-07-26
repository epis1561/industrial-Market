<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                이벤트 생성관리자
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
                    이미지 <span class="star">*</span>
                </p>

            </div>
          <div class="item-user">
            <div class="file-upload-wrap col-group">
              <label class="file-upload-btn" for="imgs" @click="activeFiles=true">
                <i class="icon"></i>
              </label>
              <div class="file-preview-scroll-wrap">
                <div class="file-preview-wrap col-group">
                  <input-images :multiple="false" @change="(data) => {form.files = data;}"
                                @removed="(data) => {form.files_remove_ids = data}"
                                :default="item && item.img ? [item.img] : ''" :max="1"/>
                </div>

              </div>
            </div>
          </div>
          <div class="form-item row-group">
            <p class="item-default">
              시작일자 <span class="star">*</span>
            </p>
            <input type="date" class="form-input" v-model="form.started_at" required style="width:230px">
          </div>

          <div class="form-item row-group">
            <p class="item-default">
              종료일자 <span class="star">*</span>
            </p>
            <input type="date" class="form-input" v-model="form.finished_at" required style="width:230px">
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
                    <a href="/admin/events" class="m-btn type01 bg-gray">목록</a>
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
               title:"",
               img:"",
               started_at:"",
               finished_at:"",
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
            return this.form.post("/api/admin/events/" + this.item.id)
                    .then(response => {
                        console.log('여기발동')
                        this.$router.push("/admin/events");
                    });

            this.form.post("/api/admin/events")
                .then(response => {
                    this.$router.push("/admin/events");
                });
        },

    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/events/" + this.$route.query.id)
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
