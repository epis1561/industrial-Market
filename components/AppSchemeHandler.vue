<template>
    <div>
        <!-- 필요한 경우 여기에 UI 요소를 추가할 수 있습니다 -->
    </div>
</template>

<script>
export default {
    name: 'AppSchemeHandler',
    data() {
        return {
            scheme: 'industrialmarket', // 실제 앱 스키마로 변경하세요
            iosId: '1234567', // 실제 iOS 앱 ID로 변경하세요
            androidPackage: 'your.app.package', // 실제 안드로이드 패키지 이름으로 변경하세요
            isIOS: false,
            isAndroid: false,
        }
    },
    mounted() {
        this.detectPlatform()
        this.handleAppRedirection()
    },
    methods: {
        detectPlatform() {
            const userAgent = navigator.userAgent.toLowerCase()
            this.isIOS = /ipad|iphone|ipod/.test(userAgent) && !window.MSStream
            this.isAndroid = /android/.test(userAgent)
        },
        handleAppRedirection() {
            if (this.isIOS || this.isAndroid) {
                this.openApp()
            } else {
                this.$router.push("/intro")
            }
        },
        openApp() {
            const appUrl = this.isIOS ? `${this.scheme}://` : `intent://#Intent;package=${this.androidPackage};scheme=${this.scheme};end;`

            window.location = appUrl

            // 짧은 지연 후 앱이 열리지 않으면 /intro로 리다이렉트
            setTimeout(() => {
                if (!document.hidden) {
                    this.$router.push("/intro")
                }
            }, 2000) // 2초 후 체크
        }
    }
}
</script>