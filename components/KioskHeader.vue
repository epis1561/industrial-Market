<template>
    <div class="header-wrap">
        <p class="center-wrap">
            서남센터(영등포)
        </p>

        <img class="logo-img" src="/mobile/images/logo-center_1.png" alt="서울디지털동행플라자">

    </div>
</template>
<script>
import Form from "../utils/Form";
export default {
    data(){
        return {
            form: new Form(this.$axios, {

            }),

            alarms: {
                data: [],
                meta: {

                }
            },



            word:"",

            activeTopBanner: true,
        }
    },

    methods: {
        addEvents(){

        },

        setHeaderClass(){

        },

    },

    computed: {

    },

    watch: {

    },

    mounted() {
        this.setHeaderClass();

        this.addEvents();
    }
}
</script>