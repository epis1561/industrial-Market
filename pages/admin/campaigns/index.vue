<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    캠페인
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
                <col style="width:15%;">
                <col>
                <col style="width:10%;">
                <col>
                <col style="width:10%;">
                <col>
                <col>

                <col>
                <col style="width:15%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">이미지</th>
                <th class="admin-th">제목</th>
                <th class="admin-th">광고주</th>
                <th class="admin-th">유형</th>
                <th class="admin-th">플랫폼</th>
                <th class="admin-th">신청인원</th>
                <th class="admin-th">승인상태</th>
                <th class="admin-th">진행상태</th>

                <th class="admin-th"></th>
                <th class="admin-th"></th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>

                <td class="admin-td">
                    <img :src="item.img.url" alt="" v-if="item.img">
                </td>
                <td class="admin-td">
                    <a :href="`/campaigns/${item.id}`" target="_blank" class="link">{{item.title}}</a>
                </td>
                <td class="admin-td">
                    <a :href="`/admin/companies/create?id=${item.user.id}`" target="_blank" class="link">[{{item.user.company_title}}] {{item.user.name}}</a>
                </td>
                <td class="admin-td">{{item.format_type}}</td>
                <td class="admin-td">{{item.format_platform}}</td>
                <td class="admin-td">

                    <div class="m-numbers type01">
                        <button class="btn-number" @click.prevent="decrease(item)">
                            <i class="xi-minus"></i>
                        </button>
                        <p class="value" style="display: flex; align-items: center;">
                            {{item.count_apply_application}}

                            <span class="sub" v-if="item.fake_count_application > 0" style="font-size:10px; margin-left:4px; color:blue;">+ {{item.fake_count_application}}</span>
                        </p>
                        <button class="btn-number" @click.prevent="increase(item)">
                            <i class="xi-plus"></i>
                        </button>
                    </div>

                </td>
                <td class="admin-td">
                    {{item.format_state}}
                    <p class="red" style="margin-top:8px; font-size:12px; color:red;" v-if="item.state === 'DENY'">반려사유 : {{item.reason_deny}}</p>
                    <p class="red" style="margin-top:8px; font-size:12px; color:red;" v-if="item.state === 'CANCEL'">취소사유 : {{item.reason_cancel}}</p>
                </td>
                <td class="admin-td">{{item.format_state_ongoing}}</td>

                <td class="admin-td">
                    <div style="display: flex; gap:16px; white-space: nowrap;" >
<!--                        <a :href="`/campaigns/${item.id}`" class="btn" target="_blank">
                            상세보기
                        </a>-->
                        <nuxt-link :to="`/admin/applications?campaign_id=${item.id}`" class="btn">
                            지원내역
                        </nuxt-link>
                    </div>
                </td>

                <td class="admin-td">
                    <div class="btn-wrap col-group" v-if="item.state === 'WAIT'">
                        <button type="button" class="btn" @click="accept(item)">
                            승인
                        </button>
                        <button type="button" class="btn" style="color:red;" @click="deny(item)">
                            반려
                        </button>
                        <button type="button" class="btn" style="color:red;" @click="cancel(item)">
                            취소
                        </button>
                    </div>

                    <div class="btn-wrap col-group" v-else>
                        <template v-if="item.state !== 'CANCEL'">
                            <nuxt-link :to="`/admin/campaigns/updateTop?id=${item.id}`" class="btn" style="white-space: nowrap;">
                                노출 TOP 10
                            </nuxt-link>
                            <nuxt-link :to="`/admin/campaigns/updateKeyword?id=${item.id}`" class="btn" style="white-space: nowrap;">
                                키워드 연결
                            </nuxt-link>
                            <button type="button" class="btn" style="color:red;" @click="cancel(item)">
                                취소
                            </button>
                        </template>
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
                reason_cancel: "",
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/campaigns", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        accept(item){
            this.form.patch("/api/admin/campaigns/accept/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        deny(item){
            let message = prompt("반려 사유를 입력해주세요.");

            this.form.reason_deny = message;

            this.form.patch("/api/admin/campaigns/deny/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        cancel(item){
            this.form.reason_cancel = prompt("취소 사유를 입력해주세요.");

            this.form.patch("/api/admin/campaigns/cancel/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.map(itemData => {
                            if(itemData.id == item.id)
                                return response.data;

                            return itemData;
                        });
                    });
        },

        increase(item){

            if(!this.$store.state.loading){
                this.$store.commit("setLoading", true);
                this.form.patch("/api/admin/campaigns/increase/" + item.id)
                        .then(response => {
                            this.items.data = this.items.data.map(itemData => {
                                if(itemData.id == item.id)
                                    return response.data;

                                return itemData;
                            })
                        });
            }


        },

        decrease(item){
            if(!this.$store.state.loading){
                this.$store.commit("setLoading", true);
                this.form.patch("/api/admin/campaigns/decrease/" + item.id)
                        .then(response => {
                            this.items.data = this.items.data.map(itemData => {
                                if(itemData.id == item.id)
                                    return response.data;

                                return itemData;
                            })
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
