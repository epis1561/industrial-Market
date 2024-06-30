<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    이벤트
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage board_detail" v-if="event">
            <div class="container">
                <div class="title-wrap row-group">
                    <p class="sub-title blue">
                        <span :class="`label label${event.state}`">{{ event.format_state }}</span>
                        {{ event.started_at }} ~ {{ event.finished_at }}
                    </p>
                    <p class="title">
                        {{ event.title }}
                    </p>
                    <p class="date">
                        {{ event.format_created_at }}
                    </p>
                </div>

                <div class="con-wrap">
                   <editor-content :description="event.description"/>
                </div>

<!--                <div class="btm-wrap col-group">-->
<!--                    <a href="/event_detail.html" class="btn prev-btn">-->
<!--                        <i class="xi-long-arrow-left"></i>-->
<!--                        이전글-->
<!--                    </a>-->
<!--                    <a href="/event.html" class="list-btn">-->
<!--                        <i class="xi-bars"></i>-->
<!--                    </a>-->
<!--                    <a href="/event_detail.html" class="btn next-btn">-->
<!--                        다음글-->
<!--                        <i class="xi-long-arrow-right"></i>-->
<!--                    </a>-->
<!--                </div>-->
            </div>
        </main>

        <!-- gnb Start -->
        <div id="gnb">
            <gnb/>
        </div>
        <!-- gnb End -->
    </div>
    </body>
</template>

<style>

</style>
<script>

import Form from "@/utils/Form";

export default {

    data() {
        return {
            form: new Form(this.$axios, {

            }),
            event:"",
        }
    },

    methods: {
        getEvent() {
            this.$store.commit("setLoading");
            this.$axios.get("/api/events/"+this.$route.params.id, {}).then(response => {
                this.event = response.data.data;
                console.log(this.event);
            })
        },

    },

    computed: {

    },

    watch: {

    },


    mounted() {
        this.getEvent();
    },

};
</script>
