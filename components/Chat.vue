<template>
    <nuxt-link :to="`/products/${item.id}`"class="chat-item col-group">
        <div class="profile-img">
            <img :src="chatting.img.url ? chatting.img.url : ''" />
        </div>
        <div class="item-txt-wrap row-group">
            <div class="title-group col-group">
                <p class="name">
                    {{ chatting.name }}
                </p>
                <p class="date">
                    {{ chattings.data.format_created_at }}
                </p>
            </div>
            <p class="txt">
                {{ chatting.latestMessage.description }}
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

    },

    mounted() {
    }
}
</script>
