<template>

    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title" @click="console">
                    계정 정보 수정
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage">
            <div class="container">
                <div class="form-wrap row-group">
                    <div class="form-item">
                        <div class="sns-icon kakao" v-if="user.social_platform == 'kakaoCustom'"></div>
                        <div class="sns-icon naver" v-if="user.social_platform == 'naverCustom'"></div>
                        <div class="sns-icon google" v-if="user.social_platform == 'google'"></div>
                        <div class="sns-icon apple" v-if="user.social_platform == 'apple'"></div>
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
                        <div class="item-default">닉네임</div>
                        <div class="item-user">
                            <input type="text" class="form-input" :value="user.nickname" v-if="user.nickname">
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">이메일</div>
                        <div class="item-user">
                            <input type="text" class="form-input" v-model="form.email">
                            <error :form="form" name="email"/>
                        </div>
                    </div>
                    <div class="form-footer">
                        <button class="form-footer-btn submit-btn" @click="isStore=true">계정 정보 수정</button>
                    </div>
                    <div class="form-wrap row-group">
                        <div class="form-item row-group">
                            <div class="item-default">활동지역</div>
                            <div class="item-user col-group">
                                <div name="" id="" class="select form-input form-input-half" @click.prevent.stop="activeCities = true, isLocationCurrent = false">
                                   {{ active_city ? active_city : '시/도'}}
                                </div>
                                <div name="" id="" class="select form-input form-input-half" @click.prevent.stop="activeCities = true, isLocationCurrent = false">
                                    {{ active_county ? active_county : '시/군/구'}}
                                </div>
                            </div>
                            <p class="guide-txt">
                                활동 지역의 물품이 우선 노출됩니다.
                            </p>
                        </div>

                        <div class="area-setting-label col-group">
                            <label for="type_0">
                                <input type="checkbox" class="form-checkbox" id="type_0" name="type" v-model="isLocationCurrent" @change="defaultLocation">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        현재 위치로 설정
                                    </p>
                                </div>
                            </label>
                            <p class="area-txt"  @click="getMap">
                                {{ this.$auth.user.data.county.title }}
                            </p>
                        </div>
                    </div>
                    <div class="modal-container modal_addr" :class="{'active':showMap==true}">
                        <div class="modal-wrap maps">
                            <i class="xi-close close-btn" @click="showMap=false"></i>
                            <div class="map-wrap">
                                <div id="map" class="root_daum_roughmap root_daum_roughmap_landing"></div> <!-- 구글지도 변경 필요 -->
                            </div>
                        </div>
                    </div>

                    <pop-location :active="activeCities" @change="changeLocation" @close="activeCities = false" v-if="activeCities"/>
                </div>
            </div>
            <flash :isNullLocate="isNullLocate"/>
        </main>

      <div class="modal-container modal_trans" :class="{'active':isStore}">
        <div class="modal-wrap modal-alert">
          <div class="modal-title-wrap">
            <i class="icon blue"></i>
          </div>
          <p class="modal-alert-txt">
            수정하시겠습니까?
          </p>

          <div class="modal-footer col-group">
            <button class="modal-footer-btn submit-btn" @click="update">
              예
            </button>
            <button class="modal-footer-btn close-btn" @click.prevent="isStore=false">
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>

</template>

<style>
.maps{
    padding: 0 !important;
}
.maps .map-wrap{
    height: 100% !important;
}
</style>
<script>
import Form from "@/utils/Form";

export default {
    middleware: ["user"],

    data() {
        return {
            form: new Form(this.$axios, {
                email: this.$auth.user.data.email,
                page: 1,
                county_id: this.$auth.user.data.activeCounty ? this.$auth.user.data.activeCounty.id : "",

                city: "",
                county: "",
                town: "",
                village: "",
                lat: "",
                lon: "",
            }),
            isLocationCurrent: false,
            active_county : this.$auth.user.data.activeCounty ? this.$auth.user.data.activeCounty.title:"",
            active_city : this.$auth.user.data.activeCounty ? this.$auth.user.data.activeCounty.city.title:"",
            isNullLocate: false,
            activeCities:false,
            showMap:false,
            getlat:"",
            getlon:"",
          isStore:false,
        };

    },

    methods: {

        check() {
            this.activeCities = true;
        },
        changeLocation(county){
            this.active_county = county.title;
            this.active_city = county.city.title;
            this.form.county_id = county.id;
        },
        update() {
            if(!this.form.county_id){
                this.isNullLocate=true;
                return;
            }

            this.$store.commit("setLoading", true);
            this.form.set({
                ...this.form.data(),
                ...this.location
            });

            console.log(this.form.data());


            this.form.patch("/api/users/updateAccount").then(response => {
                this.$auth.fetchUser();
                this.$router.back();
            })
        },
        defaultLocation() {
            console.log(this.location);
            console.log(this.isLocationCurrent);
            if (this.isLocationCurrent) {
                if (this.location.city) {
                    this.active_country = this.location.country;
                    this.active_city = this.location.city;
                    this.active_county = this.location.county;
                    this.form.county_id = this.user.county.id;
                    console.log(this.active_county,'카운티')
                    console.log(this.active_city,'시티')
                    console.log(this.form.county_id)
                } else {
                    alert('위치정보제공 동의를 하지않아 현재위치를 불러 올 수 없습니다.\n위치제공정보에 동의해주세요.');
                    this.isLocationCurrent = false;
                    $('.form-checkbox').prop('checked', false); // 체크 해제
                }
            } else {
                this.active_city = "";
                this.active_county = "";
                this.form.county_id="";
                console.log(this.form.county_id)
                console.log(this.active_county,'카운티');
                console.log(this.active_city,'시티');
            }

        },

        async getMap() {
            this.showMap=true
               this.getlat = this.location.lat;
                this.getlon = this.location.lon;

            // Wait for Google Maps API to be ready
            await new Promise((resolve) => {
                const checkReady = setInterval(() => {
                    if (typeof google === 'object' && typeof google.maps === 'object') {
                        clearInterval(checkReady);
                        resolve();
                    }
                }, 100);

            });

            // Initialize and add the map
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: {lat: this.getlat , lng:this.getlon},
                mapId: "DEMO_MAP_ID",
                disableDefaultUI: true,
            });

            // Add a marker
            new google.maps.Marker({
                position: {lat: this.getlat, lng: this.getlon},
                map:map,
                title: "Marker Title",
            });
        },
        console(){
            console.log(this.user);
        }

    },

    computed: {
        user() {
            return this.$auth.user.data;
        },
        location(){
            return this.$store.state.location;
        },

    },
    watch: {
        isNullLocate(newVal) {
            if (newVal === true) {
                // 예를 들어, 3초 뒤에 isEmpty를 false로 변경
                setTimeout(() => {
                    this.isNullLocate = false;
                }, 1000); // 3초 후에 실행
            }
        }
    },
    mounted() {
console.log(this.$auth.user.data);
    }
}
</script>