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
                    국가코드
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.country" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    활동지역
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.activeCounty ? item.activeCounty.title : ''" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    연락처
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.contact" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    닉네임
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.nickname" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    이메일
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.email" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    받은 관심수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_like" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    관심 회원수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_like_user" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    관심 상품수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_like_product" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    판매중인 상품수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_product_ongoing_sell" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    판매수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_product_sell" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    구매완료 상품수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_product_buy" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    거래완료 상품수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_product_finish" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    받은 후기수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_review_receive" disabled>
            </div>
        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/users" class="m-btn type01 bg-gray">목록</a>
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
