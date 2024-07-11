<template>
    <nuxt-link :to="`/chats/${item.id}`"class="chat-item col-group">
        <div class="profile-img">
            <img :src="targetUser.img ? targetUser.img.url : ''" v-if="targetUser.img" />
        </div>
        <div class="item-txt-wrap row-group">
            <div class="title-group col-group">
                <p class="name">
                    {{ targetUser.nickname || targetUser.name }}
                </p>
                <p class="date">
                    {{ item.latestMessage.format_created_at }}
                </p>
            </div>

            <p class="txt">
                {{item.latestMessage ? (item.latestMessage.imgs.length > 0 ? '(사진)' : item.latestMessage.description) : '메시지가 없습니다.'}}

                <div class="chat-num-wrap">
                    <div class="chat-num" v-if="item.count_unread_message > 0">
                        {{ item.count_unread_message }}
                    </div>
                </div>
            </p>

        </div>
    </nuxt-link>

</template>
<style>
.item-txt-wrap .chat-num-wrap{
    position: relative;
    display: inline-block;
}
.chat-item .txt{
    width: fit-content;
}
.item-txt-wrap .chat-num{
    width: auto;
    background-color: #EE2727;
    border-radius: 12px;
    padding: 5px 8px;
    color: #fff;
    font-size: 14px;
    position: absolute;
    right: 0px;
    top: -5px;
}
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
            if(this.item.owner && this.item.owner.id == this.$auth.user.data.id)
                return this.item.asker;

            return this.item.owner;
        },
    },

    mounted() {

    }
}
</script>
