<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                   채팅관리자
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
                <col style="width:10%;">
            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>
                <th class="admin-th">글쓴이</th>
                <th class="admin-th">제품명</th>
                <th class="admin-th">생성일자</th>
              <th class="admin-th">상세보기</th>
            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">
                    {{item.id}}
                </td>
                <td class="admin-td">{{item.owner.nickname || item.owner.name}}</td>
                <td class="admin-td">{{item.product.title}}</td>
                <td class="admin-td">{{item.updated_at}}</td>
              <td class="admin-td">
                <div class="btn-wrap col-group">
                  <button class="btn" @click="openChat(item.id)">
                    상세
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
              product_id:"",
              files: [],
              files_mobile: [],
              files_remove_ids: [],
            }),
        }
    },

    methods: {
        filter(){
            this.$axios.get("/api/admin/chats", {
                params: this.form.data()
            }).then(response => {

                this.items = response.data;
                console.log(this.items);
            });
        },


        up(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index - 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/chats/" + item.id + "/up");
        },

        down(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index + 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/chats/" + item.id + "/down");
        },
      openChat(id) {
        window.open(`/admin/chats/${id}`, '_blank', 'width=1000,height=900');
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
