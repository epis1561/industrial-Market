<template>
    <div class="title-wrap row-group">
        <h2 class="main-title">
<!--          dd-->
            심리 리포트 관리
        </h2>
        <div class="tab-link-wrap col-group">
            <nuxt-link to="/admin/mentalReports/basic" :class="`tab-link ${$route.path.includes('/admin/mentalReports/basic') ? 'active' : ''}`">
                리포트 판매 금액
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_exce_impul" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_exce_impul') ? 'active' : ''}`">
                자기 조절력
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_nervous" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_nervous') ? 'active' : ''}`">
                환경 변화 불안
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_total_interest_study" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_total_interest_study') ? 'active' : ''}`">
                학습 능력
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_atten_concen" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_atten_concen') ? 'active' : ''}`">
                주의 집중력
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_memory" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_memory') ? 'active' : ''}`">
                기억력
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_distraction" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_distraction') ? 'active' : ''}`">
                산만함
            </nuxt-link>
            <nuxt-link to="/admin/mentalReports/create/psyt_adhd" class="tab-link" :class="`tab-link ${$route.path.includes('/admin/mentalReports/create/psyt_adhd') ? 'active' : ''}`">
                ADHD
            </nuxt-link>

        </div>
    </div>
</template>
<script>
import Form from "@/utils/Form";

export default  {
    data(){
        return {
            form: new Form(this.$axios, {
                kid_id: this.$route.query.kid_id,
            }),

            kid: {},

        }
    },

    methods: {
        getKid(){
            this.$axios.get("/api/kids/" + this.$route.query.kid_id)
                .then(response => {
                    this.kid = response.data.data;
                });
        }
    },
    mounted() {
        this.getKid();
    }
}
</script>
