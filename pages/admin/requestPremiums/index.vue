<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    프리미어 신청
                </h2>

            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
                    <select name="" id="" v-model="form.state" @change="() => {form.page=1; filter();}">
                        <option value="">전체보기</option>
                        <option value="WAIT">승인대기</option>
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
                <col style="width:5%;">

                <col>
                <col>
                <col style="width:10%;">
                <col>
                <col style="width:10%;">
                <col>
                <col>

                <col>
                <col>
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">인플루언서명</th>
                <th class="admin-th">연락처</th>
                <th class="admin-th">신청유형</th>
                <th class="admin-th">SNS</th>
                <th class="admin-th">처리상태</th>

                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>

                <td class="admin-td">{{item.user.nickname || item.user.name}}</td>
                <td class="admin-td">{{item.user.contact}}</td>
                <td class="admin-td">{{item.format_platform}}</td>
                <td class="admin-td">
                    <a :href="item.user.blog" target="_blank" v-if="item.user.blog && item.platform === 'NAVER'">바로가기</a>
                    <span style="color:#999" v-if="!item.user.blog && item.platform === 'NAVER'">URL 미등록</span>

                    <a :href="item.user.blog" target="_blank" v-if="item.user.blog && item.platform === 'BLOG'">바로가기</a>
                    <span style="color:#999" v-if="!item.user.blog && item.platform === 'BLOG'">URL 미등록</span>

                    <a :href="item.user.instagram" target="_blank" v-if="item.user.instagram && item.platform === 'INSTAGRAM'">바로가기</a>
                    <span style="color:#999" v-if="!item.user.instagram && item.platform === 'INSTAGRAM'">URL 미등록</span>
                </td>
                <td class="admin-td">{{item.format_state}}</td>
                <!--
                <td class="admin-td">
                    {{item.format_state}}
                    <p class="red" style="margin-top:8px; font-size:12px; color:red;" v-if="item.state === 'DENY'">반려사유 : {{item.reason_deny}}</p>
                    <p class="red" style="margin-top:8px; font-size:12px; color:red;" v-if="item.state === 'CANCEL'">취소사유 : {{item.reason_cancel}}</p>
                </td>
                -->
                <td class="admin-td">
                    <div class="btn-wrap col-group" v-if="item.state === 'WAIT'">
                        <button type="button" class="btn" @click="accept(item)">
                            승인
                        </button>
                        <button type="button" class="btn" style="color:red;" @click="deny(item)">
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
                reason_deny: "",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/requestPremiums", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        accept(item){
            this.form.patch("/api/admin/requestPremiums/accept/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        deny(item){
            // let message = prompt("반려 사유를 입력해주세요.");

            // this.form.reason_deny = message;

            this.form.patch("/api/admin/requestPremiums/deny/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        remove(item){
            if(confirm("정말로 삭제하시겠습니까?")){
                this.form.delete("/api/admin/requestPremiums/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
            }
        },
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
