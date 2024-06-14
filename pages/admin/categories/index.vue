<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                카테고리
            </h2>

            <div class="top-btn-wrap col-group">
                <a :href="`/admin/categories/create`" class="btn">
                    등록
                </a>
            </div>
        </div>

        <table class="admin-table">
            <colgroup>
                <col style="width:10%;">
                <col style="width:20%;">
                <col>
                <col>
                <col style="width: 10%">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>
                <th class="admin-th">이미지</th>
                <th class="admin-th">유형</th>
                <th class="admin-th">제목</th>
                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>
                <td class="admin-td">
                    <img :src="item.img ? item.img.url : ''" alt="" style="width:150px;">
                </td>
                <td class="admin-td">{{item.type}}</td>
                <td class="admin-td">{{item.title}}</td>

                <td class="admin-td">
                    <div class="btn-wrap col-group">
                        <nuxt-link :to="`/admin/categories/create?id=${item.id}`" class="btn">
                            상세
                        </nuxt-link>

                        <button type="button" class="btn del-btn" @click="remove(item)">
                            삭제
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <empty v-if="items.data.length === 0" />

        <pagination :meta="items.meta" @paginate="(page) => {form.page = page; filter()}" />

    </div>
</template>
<script>
import Form from "@/utils/Form";
export default {
    middleware: ["admin"],
    layout: "admin",

    components: {},

    data() {
        return {
            items: {
                data: [],
                meta: {
                    current_page:1,
                    last_page:1
                }
            },

            form: new Form(this.$axios, {
                page: 1,
                word: "",
                type:"",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/categories", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/categories/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        up(item){
            let index = this.items.data.indexOf(item);

            if (index > 0) {
                const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

                this.items.data.splice(index - 1, 0, itemToMove); // Insert the item one position ahead

                this.form.patch("/api/admin/categories/" + item.id + "/up");
            }
        },

        down(item){
            let index = this.items.data.indexOf(item);

            if (index < this.items.data.length - 1) {
                const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

                this.items.data.splice(index + 1, 0, itemToMove); // Insert the item one position ahead

                this.form.patch("/api/admin/categories/" + item.id + "/down");

            }

        }
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
