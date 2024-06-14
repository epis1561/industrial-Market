<template>
    <div class="admin-wrap table-wrap">

        <div class="title-wrap col-group">
            <div class="main-title-wrap col-group">
                <h2 class="main-title">
                    인플루언서
                </h2>
            </div>

            <div class="filter_wrap">
                <div class="filter_input_wrap">
                    <select name="" id="" v-model="form.platform" @change="() => {form.page = 1; filter();}">
                        <option value="">플랫폼</option>
                        <option value="blog">블로그</option>
                        <option value="instagram">인스타그램</option>
                        <option value="youtube">유튜브</option>
                    </select>
                    <select name="" id="" v-model="form.premium" @change="() => {form.page = 1; filter();}">
                        <option value="">프리미어 종류</option>
                        <option value="blog_premium">블로그 프리미어</option>
                        <option value="instagram_premium">인스타그램 프리미어</option>
                        <option value="naver_premium">네이버 공식 인플루언서</option>
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

                <col style="width:10%;">
                <col style="width:10%;">

                <col style="width:20%">
                <col style="width:10%">
                <col style="width:15%">

                <col>
                <col>
                <col>

            </colgroup>
            <thead class="admin-thead">
            <tr class="admin-tr">
                <th class="admin-th">고유번호</th>

                <th class="admin-th">이메일 수신여부</th>
                <th class="admin-th">문자 수신여부</th>

                <th class="admin-th">이메일</th>
                <th class="admin-th">닉네임</th>
                <th class="admin-th">연락처</th>

                <th class="admin-th">네이버</th>
                <th class="admin-th">인스타그램 <button class="btn-rotate" @click.prevent="() => {form.page=1; form.order_by='instagram_count_follower'; form.align = form.align === 'desc' ? 'asc' : 'desc'; filter();}"><i class="xi-rotate-right"></i></button></th>
                <th class="admin-th">유튜브 <button class="btn-rotate" @click.prevent="() => {form.page=1; form.order_by='youtube_count_subscriber'; form.align = form.align === 'desc' ? 'asc' : 'desc'; filter();}"><i class="xi-rotate-right"></i></button></th>

            </tr>
            </thead>
            <tbody class="admin-tbody">
            <tr class="admin-tr" v-for="item in items.data" :key="item.id">
                <td class="admin-td">{{item.id}}</td>

                <td class="admin-td">{{item.agree_promotion_email ? 'Y' : 'N'}}</td>
                <td class="admin-td">{{item.agree_promotion_sms ? 'Y' : 'N'}}</td>

                <td class="admin-td">{{item.email}}</td>
                <td class="admin-td">{{item.nickname}}</td>
                <td class="admin-td">{{item.contact}}</td>

                <td class="admin-td">
                    <template v-if="item.blog">
                        <a :href="item.blog" target="_blank">
                            {{item.blog_premium == 1 ? '[프리미어]' : ''}}
                            {{item.naver_premium == 1 ? '[프리미어]' : ''}}
                            바로가기
                        </a>
                        <br/><span class="sub" style="font-size:12px;">이웃수 {{item.blog_count_follower.toLocaleString()}}</span>
                    </template>
                </td>
                <td class="admin-td">
                    <template v-if="item.instagram">
                        <a :href="item.instagram" target="_blank">
                            {{item.instagram_premium == 1 ? '[프리미어]' : ''}}
                            바로가기
                        </a>
                        <br/><span class="sub" style="font-size:12px;">팔로워 {{item.instagram_count_follower.toLocaleString()}}</span>
                    </template>
                </td>
                <td class="admin-td">
                    <template v-if="item.youtube">
                        <a :href="item.youtube" target="_blank">바로가기</a>
                        <br/><span class="sub" style="font-size:12px;">구독자수 {{item.youtube_count_subscriber.toLocaleString()}}</span>
                    </template>
                </td>

<!--                <td class="admin-td">
&lt;!&ndash;                    <div class="btn-wrap col-group">
                        <nuxt-link :to="`/admin/influencers/create?id=${item.id}`" class="btn">
                            상세
                        </nuxt-link>
                    </div>&ndash;&gt;
                </td>-->
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
                premium:"",
                platform:"",
                word: "",
                type:"",
                order_by: "",
                align: "",
            }),
        }
    },

    methods: {
        filter(){
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/admin/influencers", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
            });
        },

        remove(item){
            let confirmed = window.confirm("정말로 삭제하시겠습니까?");

            if(confirmed)
                this.form.delete("/api/admin/influencers/" + item.id)
                    .then(response => {
                        this.items.data = this.items.data.filter(itemData => itemData.id != item.id);
                    });
        },

        up(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index - 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/influencers/" + item.id + "/up");
        },

        down(item){
            let index = this.items.data.indexOf(item);

            const itemToMove = this.items.data.splice(index, 1)[0]; // Remove the item from the array

            this.items.data.splice(index + 1, 0, itemToMove); // Insert the item one position ahead

            this.form.patch("/api/admin/influencers/" + item.id + "/down");
        }
    },

    computed: {


    },

    mounted() {
        this.filter();
    }
}
</script>
