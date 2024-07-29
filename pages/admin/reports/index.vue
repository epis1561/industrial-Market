<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    신고리스트
                </h2>
                <div class="top-btn-wrap">
                    <nuxt-link :to="`/admin/reports/create`" class="btn">
                        등록
                    </nuxt-link>
                </div>
            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
                    <select name="" id="" v-model="form.type" @change="filter">
                        <option value="">전체보기</option>
                    </select>
                    <form action="" @submit.prevent="filter">
                        <div class="search-wrap col-group">
                            <input type="text" class="search-input" placeholder="검색어를 입력하세요." v-model="form.word">
                            <button type="submit" class="search-btn">
                                <i class="xi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <table class="admin-table">
            <colgroup>
                <col style="width:10%;">
                <col>
                <col>
                <col>
                <col style="width:10%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>
                <th class="admin-th">닉네임</th>
                <th class="admin-th">카테고리</th>
                <th class="admin-th">신고유형</th>
                <th class="admin-th">내역보기</th>
                <th class="admin-th">내용</th>

            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>
                <td class="admin-td">
                    {{ item.user.nickname }}
                </td>
                <td class="admin-td" v-if="item.report_category_id">
                   {{ item.report_category_id }}
                </td>

                <td class="admin-td">
                   {{ item.format_reportable_type }}
                </td>

                <td class="admin-td">
                    <a :href="`/products/${item.reportable_id}`" v-if="item.format_reportable_type=='상품'" target="_blank">신고상품확인</a>
                    <a :href="`/admin/chats/${item.reportable_id}`" v-if="item.format_reportable_type=='채팅'" target="_blank">신고채팅확인</a>
                    <a :href="`/admin/users/${item.reportable_id}`" v-if="item.format_reportable_type=='유저'" target="_blank">신고유저확인</a>
                </td>

                <td class="admin-td">
                    {{ item.description }}
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
            this.$axios.get("/api/admin/reports", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/reports/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        up(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index - 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/reports/" + item.id + "/up");
        },

        down(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index + 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/reports/" + item.id + "/down");
        }
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
