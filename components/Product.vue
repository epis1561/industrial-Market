<template>
    <nuxt-link to="" class="prod-item col-group">
        <div class="item-img">
<!--            <img :src="item.img.url" alt="">-->
        </div>
        <div class="item-txt-wrap">
            <p class="title">
                {{ item.title }}
            </p>
            <div class="sub-txt-group col-group">
                <p class="sub-txt">
                    {{ item.format_title }}
                </p>
                <p class="sub-txt">
                    {{ item.format_created_at }}
                </p>
            </div>
            <div class="price">
                <p :class="{
      'label': item.type === 0,
      'label1': item.type === 1,
      'label2': item.type === 2
    }">
                    {{ item.format_type }}
                </p>
                {{ item.format_price }}
            </div>
            <div class="prod-btn-wrap col-group">
                <div class="prod-btn col-group">
                    <img src="/images/icon_chat_gray.png" alt="" class="icon">
                    <p class="txt">{{ item.count_chat }}</p>
                </div>
                <div class="prod-btn col-group">
                    <img src="/images/icon_like_gray.png" alt="" class="icon">
                    <p class="txt">{{ item.count_like }}</p>
                </div>
            </div>
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
