<template>

</template>
<script>
import NuxtLogo from "./NuxtLogo";

export default {
    components: {NuxtLogo},

    data() {
        return {}
    },

    methods: {
        top() {
            window.scrollTo({top: 0});
        },

        ready() {
            alert("준비중입니다.");
        },


    },

    watch: {
        '$route'(to, from) {

        }
    },

    mounted() {

    }
}
</script>
