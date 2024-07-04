<template>

    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    계정 정보 수정
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="form-wrap row-group">
                    <div class="form-item">
                        <div class="sns-icon naver"></div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">이름</div>
                        <div class="item-user">
                            <input type="text" class="form-input disable" :value="user.name" readonly>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">연락처</div>
                        <div class="item-user">
                            <input type="text" class="form-input disable" :value="user.contact" readonly>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">이메일</div>
                        <div class="item-user">
                            <input type="text" class="form-input" v-model="form.email">
                            <error :form="form" name="email" />
                        </div>
                    </div>
                    <div class="form-footer">
                        <button class="form-footer-btn submit-btn" @click="update">계정 정보 수정</button>
                    </div>
                    <div class="form-wrap row-group">
                        <div class="form-item row-group">
                            <div class="item-default">활동지역</div>
                            <div class="item-user col-group">
                                <div name="" id="" class="select form-input form-input-half" @click.prevent.stop="activeCities = true">
                                    {{ city || '광역시/도' }}
                                </div>
                                <div name="" id="" class="select form-input form-input-half" @click.prevent.stop="activeCities = true">
                                    {{county || '시/군/구'}}
                                </div>
                            </div>
                            <p class="guide-txt">
                                활동 지역의 물품이 우선 노출됩니다.
                            </p>
                        </div>

                        <div class="area-setting-label col-group">
                            <label for="type_0">
                                <input type="checkbox" class="form-checkbox" id="type_0" name="type">
                                <div class="checked-item col-group">
                                    <div class="icon" @click="defaultLocation">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        현재 위치로 설정
                                    </p>
                                </div>
                            </label>
                            <p class="area-txt">
                                {{ this.$auth.user.data.county.title }}
                            </p>
                        </div>
                    </div>
                    <pop-location @locate="saveLocate" @close="activeCities = false" v-if="activeCities"/>
                </div>
            </div>
        </main>


    </div>

</template>
<script>
import Form from "@/utils/Form";
export default {

    data() {
        return {
            form: new Form(this.$axios, {
                email:this.$auth.user.data.email,
                page:1,
                county_id:"",
            }),
            cities:{
                data:[],
                meta:{
                    current_page:1,
                    last_page:1,
                },

            },
            activeCities:false,
            county:this.$auth.user.data.activeCounty.title,
            city:this.$auth.user.data.activeCounty.city.title,
        };
    },

    methods: {

        check(){
            this.activeCities = true;
        },
        saveLocate(cityName,countyId,countyName){
            this.county=countyName;
            this.city = cityName;
            this.form.county_id = countyId;
        },
        update(){
            this.form.patch("/api/users/updateAccount").then(response => {
                console.log('성공');
                this.$auth.fetchUser();
                this.$router.back();
            })
        },
        defaultLocation(){
            this.form.county_id = this.$auth.user.data.county.id;
            console.log(this.form.county_id);
        }

    },

    computed: {
            user(){
                return this.$auth.user.data;
            }
    },
    watch: {

    },
    mounted() {
console.log(this.$auth.user.data);

    }
}
</script>