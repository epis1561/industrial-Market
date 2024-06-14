<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    주문내역
                </h2>

            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
<!--                    <select name="" id="" v-model="form.type" @change="filter">
                        <option value="">전체보기</option>
                    </select>-->
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
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">주문번호</th>
                <th class="admin-th">주문자 이름</th>
                <th class="admin-th">주문자 이메일</th>
                <th class="admin-th">주문자 연락처</th>
                <th class="admin-th">주문상품</th>
                <th class="admin-th">주문금액</th>
                <th class="admin-th">주문일자</th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">{{item.imp_uid}}</td>
                <td class="admin-td">{{item.user_name}}</td>
                <td class="admin-td">{{item.user_email}}</td>
                <td class="admin-td">{{item.user_contact}}</td>
                <td class="admin-td">{{item.product_point.toLocaleString()}} P</td>
                <td class="admin-td">{{item.price.toLocaleString()}}</td>
                <td class="admin-td">{{item.created_at}}</td>
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
            this.$axios.get("/api/admin/orders", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/orders/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        up(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index - 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/orders/" + item.id + "/up");
        },

        down(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index + 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/orders/" + item.id + "/down");
        }
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
