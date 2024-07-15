<template>
    <div>
        <pop />
        <Nuxt />
    </div>
</template>
<script>

export default {
    head() {
        return {
            link: [
                {rel: 'stylesheet', type: 'text/css', href: '/css/common.css'},
                {rel: 'stylesheet', type: 'text/css', href: '/css/intro.css'},

            ],
        }
    },

    components: {

    },

    methods:{
        getCities() {
            this.$axios.get("/api/cities", {}).then(response => {
                this.$store.commit("setCities", response.data);
            })
        },
    },

    beforeMount() {

    },

    mounted() {
        window.postMessage(JSON.stringify({key: 'DEVICE_TOKEN'}));

        this.$store.dispatch("getCoords");
        this.getCities();

    }
}
</script>
