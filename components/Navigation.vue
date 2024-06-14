<template>
    <!-- 지원센터 -->
    <aside v-if="path.includes('supports')">
        <h2>지원센터</h2>
        <ul>
            <li :class="activeClass('supports/intro')">
                <nuxt-link to="/supports/intro">인사말</nuxt-link>
            </li>
            <li :class="activeClass('supports/history')">
                <nuxt-link to="/supports/history">연혁</nuxt-link>
            </li>
            <li :class="activeClass('supports/chart')">
                <nuxt-link to="/supports/chart">조직도</nuxt-link>
            </li>
            <li :class="activeClass('supports/location')">
                <nuxt-link to="/supports/location">찾아오시는 길</nuxt-link>
            </li>
        </ul>
    </aside>

    <!-- 주요사업 -->
    <aside v-else-if="path.includes('mainBusiness')">
        <h2>주요사업</h2>
        <ul>
            <li :class="path.includes('mainBusiness/support') ? '' : 'active'">
                <nuxt-link to="/mainBusiness/about">6차산업</nuxt-link>
                <dl>
                    <dd :class="activeClass('mainBusiness/about')">
                        <nuxt-link to="/mainBusiness/about">6차산업이란</nuxt-link>
                    </dd>
                    <dd :class="activeClass('mainBusiness/certification')">
                        <nuxt-link to="/mainBusiness/certification">6차산업 사업자 인증제</nuxt-link>
                    </dd>
                    <dd :class="activeClass('mainBusiness/coaching')">
                        <nuxt-link to="/mainBusiness/coaching">현장코칭</nuxt-link>
                    </dd>
                    <dd :class="activeClass('mainBusiness/antenna')">
                        <nuxt-link to="/mainBusiness/antenna">안테나숍</nuxt-link>
                    </dd>
                    <dd :class="activeClass('mainBusiness/program')">
                        <nuxt-link to="/mainBusiness/program">체험프로그램</nuxt-link>
                    </dd>
                </dl>
            </li>
            <li :class="path.includes('mainBusiness/support') ? 'active' : ''">
                <nuxt-link to="/mainBusiness/support/connect">농촌활력지원</nuxt-link>
                <dl>
                    <dd :class="activeClass('/mainBusiness/support/connect')">
                        <nuxt-link to="/mainBusiness/support/connect">농업과 기업간 연계강화사업</nuxt-link>
                    </dd>
                    <dd :class="activeClass('/mainBusiness/support/back')">
                        <nuxt-link to="/mainBusiness/support/back">귀농귀촌지원사업</nuxt-link>
                    </dd>
                    <dd :class="activeClass('/mainBusiness/support/active')">
                        <nuxt-link to="/mainBusiness/support/active">농촌활력프로젝트</nuxt-link>
                    </dd>
                    <dd :class="activeClass('/mainBusiness/support/future')">
                        <nuxt-link to="/mainBusiness/support/future">미래농정거버넌스 운영</nuxt-link>
                    </dd>
                </dl>
            </li>
        </ul>
    </aside>

    <!-- 정보광장 -->
    <aside v-else-if="path.includes('information')">
        <h2>정보광장</h2>
        <ul>
            <li :class="activeClass('information/notices')">
                <nuxt-link to="/information/notices">공지사항</nuxt-link>
            </li>
            <li :class="activeClass('information/otherNotices')">
                <nuxt-link to="/information/otherNotices">타기관공고</nuxt-link>
            </li>
            <li :class="activeClass('information/documents')">
                <nuxt-link to="/information/documents">자료실</nuxt-link>
            </li>
            <li :class="activeClass('information/galleries')">
                <nuxt-link to="/information/galleries">갤러리</nuxt-link>
            </li>
        </ul>
    </aside>
</template>
<script>


export default {
    data(){
        return {

        }
    },

    methods: {
        activeClass(path){
            return this.path.includes(path) ? 'active' : '';
        }
    },

    computed: {
        path(){
            return this.$route.path;
        }
    },

    mounted() {


    }
}
</script>
