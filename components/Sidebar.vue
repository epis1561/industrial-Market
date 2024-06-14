<template>
    <div class="mypage-nav row-group">
        <div class="mypage-gnb-wrap row-group">
            <div class="logo">
                <img src="/images/LOGO-w.svg" alt="">
            </div>
            <h2 class="title">
                My page
            </h2>
            <div class="mypage-gnb row-group">
                <nuxt-link to="/users/edit" :class="`mypage-gnb-item ${this.$route.path.includes('/users/edit') ? 'active' : ''}`">
                    정보수정
                </nuxt-link>
                <nuxt-link to="/kids" :class="`mypage-gnb-item ${this.$route.path.includes('kids') ? 'active' : ''}`">
                    자녀 관리
                </nuxt-link>
                <nuxt-link to="/orders" :class="`mypage-gnb-item ${this.$route.path.includes('orders') ? 'active' : ''}`">
                    결제 내역
                </nuxt-link>
            </div>
        </div>
        <div class="copy-wrap row-group">
            <p class="title">
                Gelten
            </p>
            <p class="txt">
                Hello, this is Galten Co., Ltd., a developer of XR contents. <br>
                Main business field AR/VR field development.
            </p>
            <p class="copy">
                © Gelten Corp.
            </p>
        </div>
    </div>
</template>
<script>
export default  {

}
</script>
