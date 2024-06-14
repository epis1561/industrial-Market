<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                사용자
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    월결제 가능여부 <span class="star">*</span>
                </p>
                <select name="" id="" class="form-select" v-model="form.can_calculate">
                    <option value="1">Y</option>
                    <option value="0">N</option>
                </select>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    타입 <span class="star">*</span>
                </p>
                <select name="" id="" class="form-select" v-model="form.type">
                    <option value="PERSONAL">개인회원</option>
                    <option value="COMPANY">기업회원</option>
                </select>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    아이디 <span class="star">*</span>
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.ids" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    이름/업체명 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.name">
                <error :form="form" name="name" />
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    연락처 <span class="star">*</span>
                </p>
                <input type="text" class="form-input" v-model="form.contact">

                <error :form="form" name="contact" />
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    대표자명
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.president" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    사업자번호
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.business_number" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    부서
                </p>
                <input type="text" class="form-input" v-model="form.department">
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    직위/담당자
                </p>
                <input type="text" class="form-input" v-model="form.position">
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    주소
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.address" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    상세주소
                </p>
                <input type="text" class="form-input form-input-disabled" v-model="form.address_detail" disabled>
            </div>
        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/users" class="m-btn type01 bg-gray">목록</a>
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
                can_calculate: "",
                type: "",
                name: "",
                contact: "",
                department: "",
                position: "",

                files: [],
                files_mobile: [],
                files_remove_ids: [],
            }),

            categories: {
                data: [],
            }
        }
    },

    methods: {
        store(){
            if(this.item)
                return this.form.post("/api/admin/users/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/users");
                    }).catch(error => {});

            this.form.post("/api/admin/users")
                .then(response => {
                    this.$router.push("/admin/users");
                }).catch(error => {});
        },
    },


    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/users/" + this.$route.query.id)
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
