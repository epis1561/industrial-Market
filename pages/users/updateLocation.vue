<template>
    <div class="subpage">
        <div class="container w1200">
            <div class="recommend">
                <div class="recommend-wrap">
                    <div class="recommend-title-wrap">
                        <h2 class="title">
                            인플루언서님의 방문 가능한 지역 캠페인! <br>
                            어디로 추천드릴까요?
                        </h2>
                        <p class="txt">
                            · 활동 범위에 맞게 추천드릴게요! 어느 지역이 좋으신가요?
                        </p>
                    </div>

                    <div class="recommend-content">
                        <div class="area-tab-list col-group">
                            <div :class="`area-tab ${locationGroup.id == location_group_id ? 'active' : ''}`" v-for="locationGroup in locationGroups.data" :key="locationGroup.id" @click.prevent="() => {location_group_id = locationGroup.id}">
                                {{ locationGroup.title }}
                            </div>
                        </div>
                        <div class="area-wrap active" v-if="selectedLocationGroup">
                            <div class="area-list col-group">
                                <div class="area-item" v-for="location in selectedLocationGroup.locations" :key="location.id">
                                    <label :for="`area_1_${location.id}`">
                                        <input type="checkbox" name="area" :id="`area_1_${location.id}`" :value="location.id" v-model="form.location_ids">
                                        <div class="item-txt">
                                            {{ location.title }}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="recommend-footer col-group">
                        <a href="#" class="recommend-footer-btn prev-btn" @click.prevent="() => {$router.back()}">
                            <i class="xi-angle-left"></i>
                            이전
                        </a>
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
                        <div class="recommend-step step-2">
                            <div class="core"></div>
                        </div>
                        <div class="recommend-step-list row-group">
                            <div class="recommend-step-item">
                                <p class="title">
                                    01. 캠페인 분야
                                </p>
                                <p class="txt">
                                    자주 찾는 캠페인 분야가 있으신가요?
                                </p>
                            </div>
                            <div class="recommend-step-item active">
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
                location_ids: [],
            }),
            locationGroups: {
                data: [],
            },

            location_group_id: "",
        };
    },

    methods: {
        update(){
            if(this.form.location_ids.length === 0)
                return this.$store.commit("setPop", {
                    description: "최소 1개 이상 선택해주세요."
                });

            this.$store.commit("setLoading", true);
            
            this.form.patch("/api/users/updateLocation")
                    .then(response => {
                        this.$router.push("/users/updatePlatform");
                    });
        },

        getLocationGroups(){
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/locationGroups")
                    .then(response => {
                        this.locationGroups = response.data;

                        this.location_group_id = this.locationGroups.data[0].id;
                    });
        }

    },

    computed: {
        selectedLocationGroup(){
            return this.locationGroups.data.find(locationGroup => locationGroup.id == this.location_group_id);
        }
    },
    watch: {

    },
    mounted() {

        this.getLocationGroups();

    }
}
</script>