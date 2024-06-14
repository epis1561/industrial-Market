<template>
    <li :class="message.user.id == $auth.user.data.id ? 'user2' : 'user1'">
        <div class="img-wrap" @click="() => $emit('click', message.user)">
            <img :src="message.user.img.url" alt="" v-if="message.user.img">
        </div>
        <div class="chat-txt">
            <div class="textbox" v-html="message.body"></div>
            <div class="date">
                <p class="chat-date">{{ message.created_at }}</p>
            </div>
        </div>
    </li>
</template>
<script>

export default {
    components: {},
    props: ["message"],
    data(){
        return {

        }
    },
}
</script>
