<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    캠페인 후기
                </h2>
<!--                <div class="top-btn-wrap">
                    <nuxt-link :to="`/admin/reviews/create`" class="btn">
                        등록
                    </nuxt-link>
                </div>-->
            </div>

<!--            <div class="filter_wrap">
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
            </div>-->
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
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">캠페인</th>
                <th class="admin-th">인플루언서</th>
                <th class="admin-th">모집공고와 상이여부</th>
                <th class="admin-th">불쾌한 요구여부</th>
                <th class="admin-th">원활한 배송여부</th>
                <th class="admin-th">추가 코멘트</th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>

                <td class="admin-td">{{item.campaign.title}}</td>
                <td class="admin-td">{{item.user.nickname || item.user.name}}</td>
                <td class="admin-td">{{item.different}}</td>
                <td class="admin-td">{{item.terrible}}</td>
                <td class="admin-td">{{item.delivery}}</td>
                <td class="admin-td">{{item.comment}}</td>
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

            this.$axios.get("/api/admin/reviews", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/reviews/" + item.id)
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
