<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                   알람관리자
                </h2>
            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
                    <select name="" id="" v-model="form.type" @change="filter">
                        <option value="">알람</option>
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
                <col style="width:10%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>
                <th class="admin-th">닉네임</th>
                <th class="admin-th">부제</th>
                <th class="admin-th">제목</th>
                <th class="admin-th">생성일자</th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>
                <td class="admin-td">{{item.user.nickname}}</td>
                <td class="admin-td">{{item.subtitle}}</td>
                <td class="admin-td">{{item.title}}</td>

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
              type:"",

              files: [],
              files_mobile: [],
              files_remove_ids: [],
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/alarms", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },


        up(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index - 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/alarms/" + item.id + "/up");
        },

        down(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index + 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/alarms/" + item.id + "/down");
        }
    },

    computed: {
          user(){
            return this.$auth.user.data;
          }

    },

    mounted() {
        this.filter();
    }
}
</script>
