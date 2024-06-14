<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    광고주
                </h2>

            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
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
                <col>

                <col style="width:10%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">이메일</th>
                <th class="admin-th">담당자명</th>
                <th class="admin-th">연락처</th>
                <th class="admin-th">회사명</th>
                <th class="admin-th">사업자번호</th>
                <th class="admin-th">보유포인트</th>

                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">{{item.id}}</td>

                <td class="admin-td">{{item.email}}</td>
                <td class="admin-td">{{item.name}}</td>
                <td class="admin-td">{{item.contact}}</td>
                <td class="admin-td">{{item.company_title}}</td>
                <td class="admin-td">{{item.company_business_number}}</td>
                <td class="admin-td">{{item.point.toLocaleString()}}</td>

                <td class="admin-td">
                    <div class="btn-wrap col-group">
                        <nuxt-link :to="`/admin/companies/create?id=${item.id}`" class="btn">
                            상세
                        </nuxt-link>
                        <button type="button" class="btn" @click.prevent="givePoint(item)">
                            포인트 부여
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
                point: "",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/companies", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/companies/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        givePoint(item){
            this.form.point = prompt("지급할 포인트를 입력해주세요.");

            this.$store.commit("setLoading", true);

            this.form.patch("/api/admin/companies/givePoint/" + item.id)
                .then(response => {
                    this.filter();
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
