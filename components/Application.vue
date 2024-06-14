<template>
    <a :href="application.url" class="campaign_common_item">
        <div class="thumbnail">
            <img :src="application.img ? application.img.url : (application.campaign.img ? application.campaign.img.url : '/images/replace.png')" alt="">
        </div>
        <div class="txt_wrap">
            <h4 class="title">
                {{ application.campaign.title }}
            </h4>
            <p class="date">
                {{ application.format_created_at }}
            </p>
<!--            <div class="creater_wrap">
                <img class="img" src="images/main/popularity_campaign/instagram.png" alt="">
                <p class="name">수제한방 모란꽃차</p>
            </div>-->
        </div>
    </a>

</template>
<script>
import Form from "../utils/Form";
export default {
    props: ["application"],

    data(){
        return {
            form: new Form(this.$axios, {
                likeable_type: "Application",
                likeable_id: this.application.id,
            }),

            loading: false,
        }
    },

    methods: {
        like(){
            if(!this.loading){
                this.loading = true;

                this.$store.commit("setLoading");

                this.form.post("/api/likes")
                        .then(response => {
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
