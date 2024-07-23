<template>
    <div>
        <button @click="openApp">앱 열기 또는 설치</button>
    </div>
</template>

<script>
export default {
    name: 'AppSchemeHandler',
    data() {
        return {
            scheme: 'myapp',
            iosId: '1234567',
            androidPackage: 'my.app.id',
            isIOS: false,
            isAndroid: false,
            isMobile: false
        }
    },
    mounted() {
        this.detectPlatform()
    },
    methods: {
        detectPlatform() {
            const userAgent = navigator.userAgent.toLowerCase()
            this.isIOS = /ipad|iphone|ipod/.test(userAgent) && !window.MSStream
            this.isAndroid = /android/.test(userAgent)
            this.isMobile = this.isIOS || this.isAndroid
        },
        openApp() {
            if (this.isIOS) {
                this.openIOSApp()
            } else if (this.isAndroid) {
                this.openAndroidApp()
            } else {
            }
        },
        openIOSApp() {
            const appUrl = `${this.scheme}://view?id=123`
            const storeUrl = `https://itunes.apple.com/app/id${this.iosId}`

            window.location = appUrl
            setTimeout(() => {
                if (!document.hidden) {
                    window.location = storeUrl
                }
            }, 25)
        },
        openAndroidApp() {
            const intentUrl = `intent://view?id=123#Intent;package=${this.androidPackage};scheme=${this.scheme};launchFlags=268435456;end;`
            window.location = intentUrl
        }
    }
}
</script>