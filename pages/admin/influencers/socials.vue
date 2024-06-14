<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    인플루언서
                </h2>
            </div>

            <div class="filter_wrap">
                <button class="btn-save" style="padding:20px; color:#fff; background-color:black;" @click.prevent="update">저장</button>
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
                <col style="width:5%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">바로가기</th>
                <th class="admin-th">인스타그램</th>
                <th class="admin-th">인스타그램 팔로워수</th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="(item, index) in items.data" :key="item.id">
                <td class="admin-td">{{item.id}}</td>

                <td class="admin-td">
                    <a :href="item.instagram" target="_blank">바로가기</a>
                </td>
                <td class="admin-td">
                    <input type="text" style="width:100%; border:1px solid #e1e1e1;" v-model="form['users'][index].instagram">
                </td>
                <td class="admin-td">
                    <input type="text" style="border:1px solid #e1e1e1;" v-model="form['users'][index].instagram_count_follower">
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
                users: [],
            }),
        }
    },

    methods: {
        filter(){
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/admin/influencers/socials", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;

                this.form.users = [];

                this.items.data.map(item => {
                    this.form.users.push({
                        id: item.id,
                        instagram: item.instagram,
                        instagram_count_follower : item.instagram_count_follower,
                    })
                })
            });
        },

        update(){
            this.form.patch("/api/admin/influencers/updateSocials" )
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
