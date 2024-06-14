<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    신고내역
                </h2>
<!--                <div class="top-btn-wrap">
                    <nuxt-link :to="`/admin/reports/create`" class="btn">
                        등록
                    </nuxt-link>
                </div>-->
            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
<!--                    <select name="" id="" v-model="form.state" @change="filter">
                        <option value="">전체보기</option>
                        <option value="SUCCESS">처리완료</option>
                        <option value="WAIT">미처리</option>
                    </select>-->
<!--                    <form action="" @submit.prevent="filter">
                        <div class="search-wrap col-group">
                            <input type="text" class="search-input" placeholder="검색어를 입력하세요." v-model="form.word">
                            <button type="submit" class="search-btn">
                                <i class="xi-search"></i>
                            </button>
                        </div>
                    </form>-->
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

            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">제목</th>
                <th class="admin-th">내용</th>
                <th class="admin-th">바로가기</th>
                <th class="admin-th">등록일</th>

                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>

                <td class="admin-td">{{item.title}}</td>
                <td class="admin-td">{{item.description}}</td>
                <td class="admin-td">
                    <template v-if="item.reportable">
                        <a :href="`/campaigns/${item.reportable.id}`" target="_blank" v-if="item.reportable_type.includes('Campaign')">신고글 바로가기</a>
                        <a :href="`/communities/${item.reportable.id}`" target="_blank" v-if="item.reportable_type.includes('Community')">신고글 바로가기</a>
                    </template>
                </td>
                <td class="admin-td">{{item.format_created_at}}</td>
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
            this.$store.commit("setLoading", true);

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
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
