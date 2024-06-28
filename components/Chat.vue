<template>
    <nuxt-link :to="`/chatting/${item.id}`"class="chat-item col-group">
        <div class="profile-img">
            <img :src="targetUser.img.url ? targetUser.img.url : ''" />
        </div>
        <div class="item-txt-wrap row-group">
            <div class="title-group col-group">
                <p class="name">
                    {{ targetUser.name }}
                </p>
                <p class="date">
                    {{ item.latestMessage.format_created_at }}
                </p>
            </div>
            <p class="txt" v-if="item.latestMessage.length!=0">
                {{ item.latestMessage.description }}
            </p>
            <p class="txt" v-if="item.latestMessage.length==0">
                메시지가 없습니다.
            </p>
        </div>
    </nuxt-link>

</template>
<style>

</style>
<script>
export default {
    props: ["item"],
    head(){
        return {
            link: [
                {rel: 'stylesheet', href: '/css/developer.css'},

            ],
        }
    },
    data(){
        return {

        }
    },

    methods: {

    },

    computed: {
        targetUser(){

            if(this.item.owner && this.item.owner.id == this.$auth.user.data.id){
                return this.item.asker;
            }
            else if(this.item.asker && this.item.asker.id == this.$auth.user.data.id){
                return this.item.owner;
            }
        },
    },

    mounted() {

    }
}
</script>
