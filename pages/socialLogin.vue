<template>

</template>
<script>
export default {
    layout: "empty",

    data(){
        return {
        }
    },

    mounted() {
        let pushToken = localStorage.getItem("push_token");

        this.$auth.loginWith('laravelSanctum', {
            data: {
                token: this.$route.query.token,
                push_token : pushToken
            }
        }).then(response => {
            return this.$router.push("/");
        }).catch((e) => {
            alert("소셜로그인에 실패하였습니다. 잠시 후 재시도해주세요.");

            return this.$router.push("/");
        })
    }
}
</script>
