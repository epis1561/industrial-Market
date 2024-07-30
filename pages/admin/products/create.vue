<template>
    <div class="admin-wrap admin-detail-wrap" v-if="!loading">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                제품
            </h2>
        </div>

        <div class="form-wrap col-group">
            <div class="form-item row-group">
                <p class="item-default">
                    이미지
                </p>
                <input-images :default="item.imgs" :only-show="true" />
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    카테고리
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.productCategory.title" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    제목
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.title" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    설명
                </p>
                <textarea name="" class="form-input-disabled form-textarea form-textarea-disabled" disabled :value="item.description"></textarea>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    키워드
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.keywords_origin" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    등록자
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.user.nickname" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    구매자
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.buyer ? item.buyer.nickname : '-'" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    유형
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.format_type" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    거래상태
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.format_state_transaction" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    희망거래 위치
                </p>
                <input type="text" class="form-input form-input-disabled" :value="address" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    실제 위치
                </p>
                <input type="text" class="form-input form-input-disabled" :value="realAddress" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    조회수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_view" disabled>
            </div>

            <div class="form-item row-group">
                <p class="item-default">
                    채팅수
                </p>
                <input type="text" class="form-input form-input-disabled" :value="item.count_chat" disabled>
            </div>

        </div>

        <div class="m-spaces type01 mt-40 flex-end">
            <div class="m-space-wrap">
                <div class="m-space">
                    <a href="/admin/products" class="m-btn type01 bg-gray">목록</a>
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
                return this.form.post("/api/admin/products/" + this.item.id)
                    .then(response => {
                        this.$router.push("/admin/products");
                    }).catch(error => {});

            this.form.post("/api/admin/products")
                .then(response => {
                    this.$router.push("/admin/products");
                }).catch(error => {});
        },
    },

    computed: {
        address(){
            let address = "";

            if(!this.item)
                return "";

            if(this.item.city)
                address += this.item.city.title;

            if(this.item.county)
                address += (" " + this.item.county.title);

            if(this.item.town)
                address += (" " + this.item.town.title);

            if(this.item.village)
                address += (" " + this.item.village.title);

            if(this.item.address_detail)
                address += (" " + this.item.address_detail);

            return address;
        },
        realAddress(){
            let address = "";

            if(!this.item)
                return "";

            if(this.item.realCity)
                address += this.item.realCity.title;

            if(this.item.realCounty)
                address += (" " + this.item.realCounty.title);

            if(this.item.realTown)
                address += (" " + this.item.realTown.title);

            if(this.item.realVillage)
                address += (" " + this.item.realVillage.title);

            return address;
        },
    },


    mounted() {
        if(this.$route.query.id){
            return this.$axios.get("/api/admin/products/" + this.$route.query.id)
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
