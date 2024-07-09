<template>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    알림
                </h2>
                <nuxt-link to="/users/editAlarm" class="sub-header-btn">
                    <img src="/images/icon_setting.png" alt="" v-if="form.category==0">
                    <img src="/images/icon_setting.png" alt="" v-if="form.category==1">
                </nuxt-link>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="top-tab-wrap col-group">
                <a href="#" class="tab-item" @click.prevent="change(0)" :class="{'active':form.category==0}">
                    활동 알림
                </a>
                <a href="#" class="tab-item" @click.prevent="change(1)" :class="{'active':form.category==1}">
                    키워드 알림
                </a>
            </div>
            <div class="container">
                <div class="notification-wrap">
                    <p class="notification-txt">
                        최근 90일 동안의 알림이 최대 50건까지 보관됩니다.
                    </p>
                    <div class="notification-list">
                        <nuxt-link :to="alarm.url" class="notification-item col-group" v-for="(alarm, index) in alarms.data" :key="alarm.id">
                            <div class="item-img">
                                <img :src="alarm.img ? alarm.img.url : '/images/notification_icon_bg.png'" alt="">
                            </div>
                            <div class="item-txt row-group">
                                <p class="txt">
                                   [{{index}}] {{ alarm.subtitle }}
                                </p>
                                <p class="title">
                                    {{ alarm.title }}
                                </p>
                                <p class="date">
                                    {{ alarm.format_created_at }}
                                </p>
                            </div>
                        </nuxt-link>

                    </div>
                </div>
            </div>
        </main>

        <infinite-scroll v-if="alarms.meta" :loading="loading" :form="form" :meta="alarms.meta" :target-contents="'.notification-list'" :target-scroll="'.subpage'" @paginate="(data) => {form.page = data; getAlarms(true);}"/>
    </div>
</template>
<style>

</style>
<script>

import Form from "@/utils/Form";

export default {
    middleware: ["user"],
    load: false,
    data() {
        return {
            form: new Form(this.$axios, {
                category: 0,
                page: 1,
            }),
            alarms: {
                data: [],
                meta:{
                    current_page:1,
                    last_page:1,
                }
            },
            loading: false,
            loadFirst: true,
        }


    },

    methods: {
        getAlarms(loadMore = false) {

            this.loading = true;

            this.$store.commit("setLoading", true);

            this.$axios.get("/api/alarms", {
                params: this.form.data(),
            }).then(response => {
                this.$auth.fetchUser();

                this.loading = false;

                if (loadMore) {

                    this.alarms.data = [...this.alarms.data, ...response.data.data];

                    console.log(this.alarms.data.length);

                    return this.alarms.meta = response.data.meta;
                }

                console.log(response.data);

                return this.alarms = response.data;
            })
        },
        change(num) {
            this.form.page = 1;
            this.loading = false;
            this.alarms.data = [];
            this.form.category = num;
            this.getAlarms(this.loading);
        },
    },

    computed: {},

    mounted() {
        this.getAlarms();
    },

};
</script>
