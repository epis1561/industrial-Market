<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    이벤트
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage board">
            <div class="container">
                <div class="event-list row-group">
                    <nuxt-link :to="`/events/${event.id}`" class="event-item" v-for="event in events.data" :key="event.id">
                        <div class="img-container">
                            <img :src="event.img ? event.img.url : ''" alt="">
                        </div>
                        <div class="txt-wrap row-group">
                            <p :class="`label label${event.state}`">
                                {{ event.format_state }}
                            </p>
                            <p class="title">
                                {{ event.title }}
                            </p>
                            <p class="date">
                                {{ event.started_at }} ~ {{ event.finished_at }}
                            </p>
                        </div>
                    </nuxt-link>
                    <empty v-if="events.data.length===0" />
                </div>
            </div>
            <infinite-scroll v-if="events.meta" :loading="loading" :form="form" :meta="events.meta" :target-contents="'.event-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getEvents(true);}"/>
        </main>


    </div>
    </body>
</template>

<style>

</style>
<script>

import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    data() {
        return {
            form: new Form(this.$axios, {
                page:1,
            }),
            events: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                }
            },
            loading:false,

        }
    },

    methods: {
        getEvents(loadMore = false) {
            this.loading = true;
            this.$store.commit("setLoading",true);
            this.$axios.get("/api/events", {
                params: this.form.data(),
            }).then(response => {
                if (loadMore){
                    this.loading = false;
                    this.events.data = [...this.events.data, ...response.data.data];
                    return this.events.meta = response.data.meta;
                }
                this.events = response.data;
            })
        },

    },

    computed: {},

    watch: {},


    mounted() {
    this.getEvents();
    },

};
</script>
