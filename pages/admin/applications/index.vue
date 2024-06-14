<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    지원내역
                </h2>

            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
                    <select name="" id="" v-model="form.selected" @change="filter">
                        <option value="">전체보기</option>
                        <option value="1">선정</option>
                        <option value="0">미선정</option>
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
                <col>
                <col>
                <col>

                <col style="width:10%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">캠페인명</th>
                <th class="admin-th">인플루언서명</th>
                <th class="admin-th">연락처</th>
                <th class="admin-th">URL</th>
                <th class="admin-th">조회수</th>
                <th class="admin-th">좋아요수</th>
                <th class="admin-th">댓글수</th>
                <th class="admin-th">선정여부</th>

                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>

                <td class="admin-td">{{item.campaign.title}}</td>
                <td class="admin-td">
                    <a href="#" @click.prevent="move(item)">{{item.user.nickname}}</a>
                </td>
                <td class="admin-td">
                    {{item.contact}}
                </td>
                <td class="admin-td">
                    <a :href="item.url" target="_blank" v-if="item.url">바로가기</a>
                    <template v-else>미제출</template>
                </td>
                <td class="admin-td">{{item.count_view.toLocaleString()}}</td>
                <td class="admin-td">{{item.count_like.toLocaleString()}}</td>
                <td class="admin-td">{{item.count_comment.toLocaleString()}}</td>
                <td>{{item.selected == 1 ? 'Y' : 'N'}}</td>

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
                selected: "",
                campaign_id: this.$route.query.campaign_id || "",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/applications", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        move(item){
            if(item.campaign.platform === 'INSTAGRAM'){
                if(!item.user.instagram)
                    return this.$store.commit("setPop", {
                        description: "등록된 인스타그램 URL이 없습니다."
                    })

                return window.open(item.user.instagram);
            }

            if(item.campaign.platform === 'BLOG'){
                if(!item.user.blog)
                    return this.$store.commit("setPop", {
                        description: "등록된 블로그 URL이 없습니다."
                    })

                return window.open(item.user.blog);
            }

            if(item.campaign.platform === 'YOUTUBE'){
                if(!item.user.youtube)
                    return this.$store.commit("setPop", {
                        description: "등록된 유튜브 URL이 없습니다."
                    })

                return window.open(item.user.youtube);
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
