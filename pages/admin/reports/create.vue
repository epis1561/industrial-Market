<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                패널티
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    광고주 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" :value="`${item.user.company_title} ${item.user.name}`" required disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    제목
                </p>
                <input type="text" class="form-input form-input-disabled" :value="`${item.title}`" required disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    내용
                </p>
                <textarea class="form-textarea form-textarea-disabled" placeholder="" :value="item.description"></textarea>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    신고대상글
                </p>
                <a :href="`/applications/${item.application.id}?campaign_id=${item.application.campaign.id}`" target="_blank" class="btn" style="color:blue; text-decoration: underline;">{{item.application.user.nickname}} 지원글 상세보기</a>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    패널티 부여여부 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" disabled value="패널티 부여됨" v-if="item.penalty_at">

                <select name="" id="" class="form-select" v-model="form.give_penalty" v-else>
                    <option :value="0">패널티 부여하지 않기</option>
                    <option :value="1">패널티 부여하기</option>
                </select>
            </div>

            <template v-if="form.give_penalty">
                <div class="form-item row-group">
                    <p class="item-default">
                        광고주에게 보일 처리 답변
                    </p>
                    <textarea class="form-textarea" placeholder="" v-model="form.answer"></textarea>
                </div>

                <div class="form-item row-group">
                    <p class="item-default">
                        인플루언서에게 보일 패널티 제목
                    </p>
                    <input type="text" class="form-input" v-model="form.title_penalty">
                </div>

                <div class="form-item row-group" v-if="item.penalty_at">
                    <p class="item-default">
                        패널티 부여일자
                    </p>
                    <input type="text" class="form-input form-input-disabled" :value="item.penalty_at" disabled>
                </div>
            </template>

        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/penalties" class="m-btn type01 bg-gray">목록</a>
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


            form: new Form(this.$axios, {
                give_penalty: 1,
                answer: "",
                title_penalty: "",

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
                return this.form.post("/api/admin/penalties/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/penalties");
                    });

            this.form.post("/api/admin/penalties")
                .then(response => {
                    this.$router.push("/admin/penalties");
                });
        },
    },

    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/penalties/" + this.$route.query.id)
                .then(response => {
                    this.item = response.data.data;

                    this.form.set({...this.form, ...this.item});

                    this.form.give_penalty = this.item.penalty_at ? 1 : 0;

                    this.loading = false;

                    $("html,body").scrollTop(0);
                })
        }

        this.loading = false;


    }

}
</script>
