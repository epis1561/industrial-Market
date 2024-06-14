<template>
    <div id="wrap">
        <div class="admin-container">
            <pop />

            <loading v-if="$store.state.loading" />

            <admin-header />

            <Nuxt/>
        </div>
    </div>
</template>
<script>
export default {
    head() {
        return {
            link: [
                {rel: 'stylesheet', type: 'text/css', href: '//cdn.quilljs.com/1.3.4/quill.snow.css'},
                {rel: 'stylesheet', href: '/admin/css/common.css'},
                {rel: 'stylesheet', href: '/admin/css/style.css'},
            ],
            script: [
                {
                    src: '//cdn.quilljs.com/1.3.6/quill.min.js',
                    defer: true
                },
            ],
        }
    },

    components: {},

    watch: {
        '$route'(to, from) {
            this.activeHeader = this.$route.path === "/admin/login" ? false : true;
            $('.gnb-item').unbind("click").bind("click",function(){
                $(this).toggleClass('active');
            });
        }
    },

    mounted() {

        if(this.$route.path !== "/admin/login" && (!this.$auth.user || !this.$auth.user.data.admin))
            return this.$router.push("/admin/login");
    }
}
</script>
