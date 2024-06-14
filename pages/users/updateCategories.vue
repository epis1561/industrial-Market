<template>
    <div class="subpage">
        <div class="container w1200">
            <div class="recommend">
                <div class="recommend-wrap">
                    <div class="recommend-title-wrap">
                        <h2 class="title">
                            인플루언서님의 <br>
                            자신있는 분야가 있으신가요?
                        </h2>
                        <p class="txt">
                            · 원하시는 분야를 선택해주시면 관련분야의 캠페인을 추천드립니다!
                        </p>
                    </div>

                    <div class="recommend-content">
                        <div class="category_ul">
                            <button :class="`category_item ${form.category_ids.includes(category.id) ? 'on' : ''}`" v-for="category in categories.data" :key="category.id" @click.prevent="toggleCategory(category)">
                                <img :src="category.img ? category.img.url : ''" alt="">
                                <p>{{ category.title }}</p>
                            </button>
                        </div>
                    </div>

                    <div class="recommend-footer col-group">
                        <nuxt-link to="/" class="recommend-footer-btn prev-btn" >
                            나중에
                        </nuxt-link>
                        <a href="#" class="recommend-footer-btn next-btn" @click.prevent="update">
                            다음
                            <i class="xi-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div class="recommend-side-wrap">
                    <div class="recommend-side-title-wrap">
                        <img src="/images/icon_recommned.png" alt="" class="icon">
                        <p class="txt">
                            추천 캠페인
                        </p>
                        <h3 class="title">
                            선호도에 맞춰 <br>
                            캠페인을 추천드립니다.
                        </h3>
                    </div>
                    <div class="recommend-step-wrap col-group">
                        <div class="recommend-step step-1">
                            <div class="core"></div>
                        </div>
                        <div class="recommend-step-list row-group">
                            <div class="recommend-step-item active">
                                <p class="title">
                                    01. 캠페인 분야
                                </p>
                                <p class="txt">
                                    자주 찾는 캠페인 분야가 있으신가요?
                                </p>
                            </div>
                            <div class="recommend-step-item">
                                <p class="title">
                                    02. 활동 지역
                                </p>
                                <p class="txt">
                                    지역 캠페인 진행에 어려움이 없는 <br>
                                    지역을 알려주세요!
                                </p>
                            </div>
                            <div class="recommend-step-item">
                                <p class="title">
                                    03. 미디어
                                </p>
                                <p class="txt">
                                    선호하시는 미디어를 알려주세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "../../utils/Form";
export default {

    data() {
        return {
            form: new Form(this.$axios, {
                category_ids: [],
            }),
        };
    },

    methods: {
        update(){
            this.$store.commit("setLoading", true);

            this.form.patch("/api/users/updateCategories")
                    .then(response => {
                        this.$router.push("/users/updateLocation");
                    });
        },

        toggleCategory(category){
            if(this.form.category_ids.includes(category.id))
                return this.form.category_ids = this.form.category_ids.filter(id => id != category.id);

            return this.form.category_ids.push(category.id);
        }

    },

    computed: {
        categories(){
            return this.$store.state.categories;
        }
    },
    watch: {

    },
    mounted() {


    }
}
</script>