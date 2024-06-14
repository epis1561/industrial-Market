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

    },

    beforeMount() {
        if(/WEBVIEW/.test(navigator.userAgent))
            localStorage.setItem("webview", "true");

        if(this.$route.query.WEBVIEW == 1)
            localStorage.setItem("webview", "true");

        let webview = localStorage.getItem("webview");

        if(!webview)
            return this.$router.push("/intro");
    },

    mounted() {

    }
}
</script>
