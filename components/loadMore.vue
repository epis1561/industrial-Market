<template>
    <div class="m-btns" v-if="links && links.next">
        <a href="#" class="btn" @click.prevent="loadMore">더보기</a>
    </div>
</template>
<style>
    .m-btns {
        display:flex; align-items: center; justify-content: center;
        margin-top:40px;
    }
    .m-btns .btn {
        display: flex; justify-content: center; align-items: center;
        width: calc(100% - 24px - 80px); padding:20px;
        border-radius: 8px; border: solid 2px #ffc800;
        font-size: 18px;
        font-weight: 500;
        color: #333; background-color:#ffc800;
    }
</style>
<script>
export default {
    props: ["links"],

    computed: {

    },

    methods: {
        loadMore(){
            this.$emit("loadMore");
        }
    }

}
</script>
