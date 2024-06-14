<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    출금신청
                </h2>

            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
                    <select name="" id="" v-model="form.state" @change="filter">
                        <option value="">전체보기</option>
                        <option value="WAIT">대기</option>
                        <option value="DENY">반려</option>
                        <option value="ACCEPT">승인</option>
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
                <col>
                <col>

                <col style="width:10%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>
                <th class="admin-th">상태</th>
                <th class="admin-th">신청자 닉네임</th>
                <th class="admin-th">신청자 이메일</th>
                <th class="admin-th">신청자 연락처</th>
                <th class="admin-th">등록일</th>
                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">{{item.id}}</td>

                <td class="admin-td">{{item.format_state}}</td>
                <td class="admin-td">{{item.user.nickname}}</td>
                <td class="admin-td">{{item.user.email}}</td>
                <td class="admin-td">{{item.user.contact}}</td>
                <td class="admin-td">{{item.format_created_at}}</td>

                <td class="admin-td">
                    <div class="btn-wrap col-group" v-if="item.state === 'WAIT'">
                        <button type="button" class="btn" @click="accept(item)">
                            승인
                        </button>

                        <button type="button" class="btn del-btn" @click="deny(item)">
                            반려
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
                state:"",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/requestMonies", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/requestMonies/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        accept(item){
            this.form.patch("/api/admin/requestMonies/accept/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        deny(item){
            let message = prompt("삭제 사유를 입력해주세요.");

            this.form.reason_deny = message;

            this.form.patch("/api/admin/requestMonies/deny/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
