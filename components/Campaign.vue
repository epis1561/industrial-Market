<template>
    <nuxt-link :to="`/campaigns/${campaign.id}`" class="campaign_common_item">
        <div class="thumbnail">
            <div class="tags">
                <p class="tag" v-if="campaign.premium == 1">프리미엄</p>
                <p class="tag" v-if="campaign.need_order == 1">구매형</p>
            </div>

            <div class="reward" v-if="campaign.point_give_per_person">{{campaign.point_give_per_person.toLocaleString()}}P</div>

            <img :src="campaign.img ? campaign.img.url : ''" alt="">
            <button :class="`interest ${campaign.like ? 'active' : ''}`" @click.stop.prevent="like">
                <i class="xi-heart"></i>
            </button>
        </div>
        <div class="txt_wrap">
            <h4>{{ campaign.title }}</h4>
            <p>
                <span v-for="tag in campaign.tags" :key="tag.id">#{{tag.title}} </span>
            </p>
            <div class="sns_wrap">
                <img class="sns" src="/images/common/sns/instagram.png" alt="" v-if="campaign.platform === 'INSTAGRAM'">
                <img class="sns" src="/images/main/popularity_campaign/blog.svg" alt="" v-if="campaign.platform === 'BLOG'">
                <img class="sns" src="/images/main/popularity_campaign/youtube.png" alt="" v-if="campaign.platform === 'YOUTUBE'">

                <strong>모집 {{campaign.count_application}}명</strong>
                <p>{{ campaign.d_day }}</p>
            </div>
        </div>
    </nuxt-link>
</template>
<script>
import Form from "../utils/Form";
export default {
    props: ["campaign"],

    data(){
        return {
            form: new Form(this.$axios, {
                likeable_type: "Campaign",
                likeable_id: this.campaign.id,
            }),

            loading: false,
        }
    },

    methods: {
        like(){
            if(!this.loading){
                this.loading = true;

                this.$store.commit("setLoading", true);

                this.form.post("/api/likes")
                        .then(response => {
                            this.campaign.like = this.campaign.like ? "" : true;

                            this.loading = false;
                        }).catch(error => {
                            this.loading = false;
                });
            }

        },

    },

    computed: {

    },

    watch: {

    },

    mounted() {

    }
}
</script>
