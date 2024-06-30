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
                page:1,
            }),
            events: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: "",
                }
            }

        }
    },

    methods: {
        getEvents(loadMore) {
            this.$store.commit("setLoading",true);
            this.$axios.get("/api/events", {}).then(response => {
                if (loadMore){
                    this.load = false;
                    return this.events.data = [...this.events.data, ...response.data.data];
                }
                this.events = response.data;
                console.log(this.events.data);
            })
        },
        loadMore() {
            var scrollTop = $('.subpage').scrollTop();

            var innerHeight = $('.subpage').innerHeight();

            var scrollHeight = $('.subpage').prop('scrollHeight');
            if (this.load || this.form.page >= this.events.meta.last_page) {
                return;
            }
            console.log(this.form.page)
            if (scrollTop + innerHeight >= scrollHeight - 100) {

                if(this.form.page < this.events.meta.last_page) {
                    this.load = true;
                    this.form.page += 1;
                    return this.getEvents(this.load);
                };

            }
        },
        scroll(){
            $('.subpage').scroll(this.loadMore);
        },
    },

    computed: {},

    watch: {},


    mounted() {
    this.getEvents();
    },

};
</script>
