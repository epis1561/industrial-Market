<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <h2 class="main-title">
                회원
            </h2>

            <div class="top-btn-wrap col-group">
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
                <th class="admin-th">고유번호</th>
                <th class="admin-th">이름</th>
                <th class="admin-th">닉네임</th>
                <th class="admin-th">이메일</th>
                <th class="admin-th">연락처</th>
                <th class="admin-th">거주국</th>
                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">{{item.id}}</td>
                <td class="admin-td">{{item.name}}</td>
                <td class="admin-td">{{item.nickname}}</td>
                <td class="admin-td">{{item.email}}</td>
                <td class="admin-td">{{item.contact}}</td>
                <td class="admin-td">{{item.country}}</td>
                <td class="admin-td">
                    <div class="btn-wrap col-group">
                        <nuxt-link :to="`/admin/users/create?id=${item.id}`" class="btn">
                            상세
                        </nuxt-link>
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
                removed: "",
                point: 0,
                user_id: "",
            }),

            target: null,
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/users", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 탈퇴시키겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/users/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id != response.data.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        restore(item){
            let confirmed = window.confirm("정말로 복원하시겠습니까?");

            if(confirmed)
                this.form.patch("/api/admin/users/restore?id=" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        hide(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.patch("/api/admin/users/hide?id=" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        givePoint(){
            this.form.user_id = this.target.id;

            this.form.patch("/api/admin/users/give")
                .then(response => {
                    this.target = null;

                    return alert("성공적으로 처리되었습니다.");
                });
        }
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
