<template>
        <nuxt-link :to="`/users/${likeUser.likeable.id}`" class="user-item col-group">
            <button class="like-btn active"></button>
            <div class="item-img">
                <img :src="likeUser.likeable.img ? likeUser.likeable.img.url:''" alt="">
            </div>
            <div class="item-title">
                {{ likeUser.likeable.nickname || likeUser.likeable.name }}
            </div>
        </nuxt-link>

</template>
<style>

</style>
<script>
export default {
    props:["likeUser"],
    data(){
        return {
            locateName:[],
        }
    },

    methods: {
console(){

},

    },

    computed: {
        likeable(){
            return this.likeUser.likeable;
        },


    },

    mounted() {

    }
}
</script>