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
        // if(/WEBVIEW/.test(navigator.userAgent)){
        //     this.$router.push("/intro");
        // }
        this.$store.dispatch("getCoords");
        this.getCities();

        if(!this.$route.query.WEBVIEW){
            if (!/WEBVIEW/.test(navigator.userAgent)) {
                let url = "industrialmarket:/" + location.pathname;

                location.href = url;

                return this.$router.push("/intro");
            }

            if (/WEBVIEW/.test(navigator.userAgent) && location.pathname === "/intro")
                return this.$router.push("/products");
        }
    }
}
</script>
