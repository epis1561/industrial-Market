<template>
        <nuxt-link :to="`/users/${likeUser.likeable.id}`" class="user-item col-group">
            <button class="like-btn" @click.prevent.stop="remove" :class="{'active':isLike}"></button>
            <div class="item-img">
                <img :src="likeUser.likeable.img ? likeUser.likeable.img.url:'/images/profile_null.png'" alt="">
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

            isLike:true,
        }
    },

    methods: {
        remove(){
            this.isLike=false;
            this.$emit('removeProduct',);
            console.log('에밋발동')
        }

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