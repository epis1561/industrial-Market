<template>

</template>

<script>
export default {

    data(){
        return {

        }
    },
    methods: {
        certificate(){
            PortOne.requestIdentityVerification({
                // 고객사 storeId로 변경해주세요.
                storeId: "store-49d5ec55-1bda-4d6e-ba95-a28a327434a0",
                identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
                // 연동 정보 메뉴의 채널 관리 탭에서 확인 가능합니다.
                channelKey: "channel-key-00a18730-1d20-499a-bc5e-14268531a7c4",
            });
        }
    },
    mounted() {
        this.certificate();
    }
}
</script>
