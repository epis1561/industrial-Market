<template>

    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    차단 사용자 관리
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="user-list">
                    <div class="user-item col-group" v-for="block in blocks.data" :key="block.id">
                        <div class="item-img">
                            <img :src="block.targetUser.img ? block.targetUser.img.url: ''" alt="">
                        </div>
                        <div class="item-title" v-if="block.targetUser!=null">
                            {{ block.targetUser.nickname || block.targetUser.name }}
                        </div>
                        <div class="item-title" v-if="block.targetUser==null">
                           알 수 없는 사용자
                        </div>
                        <button class="block-btn" @click="remove(block.targetUser.nickname || block.targetUser.name, block.id)">
                            차단해제
                        </button>
                    </div>
                </div>
            </div>
            <infinite-scroll v-if="blocks.meta" :loading="loading" :form="form" :meta="blocks.meta" :target-contents="'.user-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getBlocks(true);}"/>
        </main>

        <!-- gnb Start -->

        <!-- gnb End -->
        <flash :name="nickName" :isname="isName" />
        <!-- 차단해제 버튼 클릭 시 팝업 -->

    </div>
</template>
<script>
import Form from "@/utils/Form";
export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                page:1,
            }),
            loading: false,
            blocks:{
                data:[],
                meta:{
                    current_page:1,
                    last_page:1,
                }
            },
            isLike:true,
            nickName:"",
            isName:false,
        };
    },

    methods: {
                getBlocks(loadMore = false){
                    this.loading = true;
                    this.$store.commit("setLoading",true);

                    this.$axios.get("/api/blocks",{

                    }).then(response => {
                        this.loading = false;
                        if(loadMore){
                            this.blocks.data = [...this.blocks.data, ...response.data.data];
                            return this.blocks.meta = response.data.meta;
                        }
                        console.log(response.data);
                        return this.blocks = response.data;
                    })
                },
        remove(name,num){
                    this.isName=true;
                    this.nickName = name
                    this.form.delete("/api/blocks/" + num).then(response => {
                        this.blocks.data = this.blocks.data.filter(blocks =>blocks.id != num)
                    })

        }
    },

    computed: {
        user(){
            return this.$auth.user.data;
        },
    },
    watch: {

    },
    mounted() {
            this.getBlocks();

    }
}
</script>