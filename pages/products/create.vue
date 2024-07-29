<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    등록하기
                </h2>
            </div>
        </header>
        <!-- header End -->

        <main class="subpage create">
            <div class="container">
                <div class="form-wrap row-group">
                    <div class="form-item">
                        <div class="item-user">
                            <div class="file-upload-wrap col-group">
                                <label class="file-upload-btn" for="imgs" @click="activeFiles=true">
                                    <i class="icon"></i>
                                    {{ form.imgs.length }}/10
                                </label>
                                <!--                <error :form="form" name="imgs" v-if="form.imgs.length==0"/>-->
                                <div class="file-preview-scroll-wrap">
                                    <div class="file-preview-wrap col-group">
                                        <input-images :multiple="true" @change="(data) => {form.imgs = data;}"
                                                      @removed="(data) => {form.imgs_remove_ids = data}"
                                                      v-if="activeFiles" :default="product ? product.imgs:[]"
                                                      @updateTotalCount="updateTotalImagesCount" @max="isMax=true"/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            카테고리
                        </div>
                        <div class="categorybuttons" v-if="productCategories">
                            <button class="category" :class="{'active':form.product_category_id == productCategory.id}"
                                    v-for="productCategory in productCategories.data" :key="productCategory.id"
                                    @click="form.product_category_id = productCategory.id;">
                                {{ productCategory.title }}
                            </button>
                        </div>
                        <div class="m-input-error" v-if="nullCategory">중고기계,부품,공구,기타 중 하나를 선택해 주세요.</div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            제목
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" maxlength="100" placeholder="제목을 입력해주세요"
                                   v-model="form.title">
                            <div class="m-input-error" v-if="form.title.length==100"> 제목은 100자를 초과해 입력할 수 없습니다.</div>
                            <div class="m-input-error" v-if="isTitleNull"> 제목을 입력해 주세요.</div>

                            <p class="sticker-title">
                                <span>{{ form.title.length }}</span> / 100
                            </p>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            가격
                        </div>
                        <div class="categorybuttons">
                            <button class="category" :class="{'active':form.type == 0}"
                                    @click="form.type=0,form.offer_price=0">판매
                            </button>
                            <button class="category" :class="{'active':form.type == 1}"
                                    @click="form.type=1, price=0, isOffer=true,form.offer_price=1">찾습니다
                            </button>
                            <button class="category" :class="{'active':form.type == 2}"
                                    @click="form.type=2, price=0, isOffer=false, form.price=0">
                                나눔
                            </button>
                        </div>
                        <div class="item-user row-group">
                            <div class="form-input-wrap col-group">
                                <input type="number" class="form-input" placeholder="가격을 입력해주세요" v-model="price"
                                       v-if="form.offer_price == 1 && (form.type !=2 && form.type !=1)" disabled
                                       @wheel="preventScroll">
                                <input type="number" class="form-input" placeholder="가격을 입력해주세요" v-model="price"
                                       v-if="form.offer_price == 0 && (form.type==0)" @wheel="preventScroll">
                                <p class="sticker" v-if="form.type !== 2 && form.type !== 1">원</p>
                            </div>
                            <div class="m-input-checkbox type01" v-if="form.type!=2">
                                <input type="checkbox" id="check1" v-model="form.offer_price">
                                <label for="check1" @click.prevent="offer">가격협의&nbsp;<span class="guide-txt"
                                                                                           style="font-size:12px;">체크 시, 가격은 표시되지 않고 가격협의로만 노출됩니다.</span>
                                </label>
                            </div>
                            <div class="m-input-error"
                                 v-if="!form.price && nullPrice && this.form.type !=2 && form.offer_price==0">가격을
                                입력해주세요.
                            </div>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            제품설명
                        </div>
                        <div class="item-user">
                            <div class="form-textarea-wrap">
                                <textarea name="" id="" maxlength="2000" class="form-textarea" placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요.
작성된 문의 내용은 검색 포털에 노출됩니다.
개인 정보는 작성 내용에 기재하시면 안됩니다." v-model="form.description" @input="changeDescription"></textarea>
                                <p class="sticker">
                                    <span>{{ description.length }}</span> / 2000
                                </p>
                                <error :form="form" name="description"/>
                            </div>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default" @click="console">
                            거래 희망 장소
                        </div>
                        <div class="item-user">
                            <div class="form-input-wrap relative">

                                <input type="text" id="inputId" class="form-input modal_addr_btn" :placeholder="addressPlaceholder" readonly @click="isMapOpen">
                                <!--                                <div class="m-input-error" v-if="!fullAddress && nullLocation">희망장소를 선택해주세요.</div>-->
                                <i class="sticker" @click="isMapOpen"></i>
                            </div>
                            <div class="m-input-error" v-if="nullLocation==true">
                                거래희망장소 입력은 필수입니다.
                            </div>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            <span>키워드(<span style="color:red;">선택</span>) </span>&nbsp;<span class="guide-txt" style="display:inline-block;">등록 시, 검색 노출에 도움이 됩니다.</span>
                            <p class="guide-txt">
                                키워드가 2개 이상인 경우 컴마(,)로 구분하여 입력해 주세요. <br>
                                예) 각가공, 밀링, 머시닝가공, 백색 아노다이
                            </p>
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="컴마(,)로 구분 / 최대 15자 / 5개까지 등록가능" v-model="form.keywords_origin" @input="checkKeywordValidity">
                        </div>

                    </div>
                    <div class="form-footer col-group">
                        <button class="form-footer-btn submit-btn" :class="{'disable':!checkInputAll}" :disabled="ongoing==true" @click="store">
                            <!-- 필수 입력란 모두 입력시 disable 클래스 삭제 -->
                            상품 등록
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- 거래희망장소 클릭 시 나타나는 팝업 -->
        <div class="modal-container modal_addr" :class="{'active':isMap}">
            <div class="modal-wrap">
                <i class="xi-close close-btn" @click="isMap=false"></i>
                <div class="modal-title-wrap">
                    <p class="modal-title">
                        거래 희망 장소
                    </p>
                    <p class="modal-sub-title">
                        지도를 움직여 장소를 선택하세요
                    </p>
                </div>

                <div class="map-wrap">
                    <div id="map" class="root_daum_roughmap root_daum_roughmap_landing"></div> <!-- 구글지도 변경 필요 -->
                </div>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn" @click="submitMap">
                        선택 완료
                    </button>
                </div>

            </div>
            <div class="modal-container modal_trans" :class="{'active':mapNull}">
                <div class="modal-wrap modal-alert">
                    <div class="modal-title-wrap" style="padding-bottom:0px !important;">
                        <i class="icon blue"></i>
                    </div>
                    <p class="modal-alert-txt" style="margin-bottom: 10px !important;">
                        찾을수 없는 주소입니다.<br>
                        다시 선택해주세요.
                    </p>

                    <div class="modal-footer col-group map-modal">
                        <button class="modal-footer-btn submit-btn " @click="mapNull=false">
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- //거래희망장소 클릭 시 나타나는 팝업 -->

        <!-- 선택 완료 시 나타나는 select -->
        <div class="modal-container modal_addr_select" :class="{'active':detailMap}">
            <div class="modal-select-wrap modal-wrap">
                <div class="modal-title-wrap">
                    <h3 class="modal-title">선택한 곳의 장소명을 입력해주세요</h3>
                    <p class="modal-sub-title">
                        예) 강남역 1번 출구, 교보타워 앞
                    </p>
                </div>

                <input type="text" class="form-input" placeholder="예) 강남역 1번 출구, 교보타워 앞" v-model="form.address_detail">

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn close-btn" @click="closeMap">
                        거래 장소 등록
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-container modal_alert" :class="{'active':isMax}">
            <div class="modal-wrap modal-alert">

                <p class="modal-alert-txt">
                    등록 가능한 사진은 최대 10장 입니다.
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isMax=false">
                        확인
                    </button>
                </div>
            </div>
        </div>
        <!-- //선택 완료 시 나타나는 select -->
    </div>
    <div class="modal-container modal_leave" :class="{'active':isSuccess}">
        <div class="modal-wrap modal-alert">
            <div class="modal-title-wrap">
                <i class="icon red"></i>
                <h3 class="modal-title">
                    상품등록
                </h3>
            </div>
            <p class="modal-alert-txt">
                등록이 완료되었습니다.
            </p>

            <div class="modal-footer col-group">
                <button class="modal-footer-btn submit-btn" @click="out">
                    확인
                </button>

            </div>
        </div>
    </div>
    </body>
</template>
<style>
.m-input-images.type01 .m-files {
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: auto;
}

.m-input-images.type01 .m-file-wrap {
    position: relative;
    padding: 0;
    flex: 0 0 auto;
}

.m-input-images.type01 .m-file {
    background-size: cover;
    width: 95px !important;
    height: 95px !important;
    border-radius: 10px !important;
    flex: 0 0 auto;
}

.file-preview-wrap .xi-close {
    border-radius: 4px;
    width: 16px;
    top: 3px;
}

.file-preview-wrap::-webkit-scrollbar {
    display: none;
}

.m-file-wrap:first-child .file-preview-label {
    display: block;
}

.file-preview-label {
    border-radius: 2px;
    top: 1px;
    left: 2px;
    z-index: 9999;
}

.file-upload-wrap {
    align-items: center;
}

.file-preview-scroll-wrap {
    height: 95px;
}

.file-preview-wrap {
    height: 95px;
}

.file-preview-label {
    top: 4px;
}

</style>
<script>

import Form from "@/utils/Form";

export default {

    middleware: ["user"],

    toggleBtn() {
        $('.categorybuttons .category').on('click', function () {
            // 현재 활성화된 버튼에서 active 클래스 제거
            $('.categorybuttons .category.active').removeClass('active');
            // 클릭된 버튼에 active 클래스 추가
            $(this).addClass('active');
        });
    },
    load: false,
    data() {
        return {
            form: new Form(this.$axios, {
                imgs: [],
                imgs_remove_ids: [],
                country: "",
                city: "",
                county: "",
                town: "",
                village: "",
                address_detail: "",
                product_category_id: "",
                title: "",
                type: 0,
                description: "",
                price: "",
                keywords_origin: "",
                lat: "",
                lon: "",

                offer_price: 0,
            }),
            isSuccess: false,
            isMax: false,
            mapNull: false,
            isMap: false,
            detailMap: false,
            activeFiles: false,
            activeCategory: null,
            getCity: "",
            getCounty: "",
            getTown: "",
            getTown2: "",
            getCountry: "",
            product: null,
            load: false,
            nullPrice: "",
            nullCategory: "",
            nullLocation: "",
            nullType: "",
            price: "",
            keywordsError: false,
            keywords: '',
            isOffer: false,
            description: "",
            title: "",
            ongoing: false,
            maxKeywords: 5,
            maxKeywordLength: 15,
            isTitle: false,
            isTitleNull: false,
        }

    },

    methods: {
        console() {
        },
        changeTitle(e) {
            this.title = e.target.value;
        },
        changeDescription(e) {
            this.description = e.target.value;
        },

        async getMap() {
            if (this.$route.query.id) {
                var getlat = this.product.lat;
                var getlon = this.product.lon;
                this.form.lat = this.product.lat;
                this.form.lon = this.product.lon;

            } else if (this.$auth.user.data.latestProduct) {
                var getlat = this.$auth.user.data.latestProduct.lat;
                var getlon = this.$auth.user.data.latestProduct.lon;

                this.form.lat = getlat;
                this.form.lon = getlon;
            } else {
                if (!this.coords || (!this.coords.x && !this.coords.y)) {
                    var getlat = 37.49855955;
                    var getlon = 127.0444754;
                    // 그냥 lat lon이 빌수밖에없음 real
                    this.form.lat = 37.49855955;
                    this.form.lon = 127.0444754;

                } else {
                    var getlat = this.$store.state.coords.y;
                    var getlon = this.$store.state.coords.x;
                    this.form.lat = this.$store.state.coords.y;
                    this.form.lon = this.$store.state.coords.x;
                }
            }


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
                zoom: 10,
                center: {lat: getlat, lng: getlon}, // Initial position
                mapId: "DEMO_MAP_ID",
                disableDefaultUI: true,
            });

            // Add a marker
            const marker = new google.maps.Marker({
                position: map.getCenter(),
                map,
                title: "Marker Title",
                draggable: true,
            });
            const geocodeResult2 = await reverseGeocode(getlat, getlon);


            this.address = geocodeResult2.address_components;
            if (!this.coords || (!this.coords.x && !this.coords.y)) {
                this.address.forEach(component => {
                    const types = component.types;
                    if (types.includes("administrative_area_level_1")) {
                        // this.form.real_city = component.long_name;
                        this.getCity = component.long_name;
                    } else if (types.includes("locality") || types.includes("sublocality_level_1")) {
                        // this.form.real_county = component.long_name;
                        this.getCounty = component.long_name;
                    } else if (types.includes("sublocality_level_2")) {
                        // this.form.real_town = component.long_name;
                        this.getTown = component.long_name;
                    } else if (types.includes("sublocality_level_3") || types.includes("sublocality_level_4")) {
                        // this.form.real_town2 = component.long_name;
                        this.getTown2 = component.long_name;
                    } else if (types.includes("country")) {
                        // this.form.real_country = component.short_name.toUpperCase();
                        this.getCountry = component.short_name.toUpperCase();
                    }
                });
            }


            map.addListener('drag', async () => {
                marker.setPosition(map.getCenter());
                const newLat = marker.getPosition().lat();
                const newLng = marker.getPosition().lng();
                const geocodeResult = await reverseGeocode(newLat, newLng);
                getlat = newLat;
                getlon = newLng;

                this.form.lat = getlat;
                this.form.lon = getlon;
                // Extract address components
                this.address = geocodeResult.address_components;
                this.address.forEach(component => {
                    const types = component.types;
                    if (types.includes("administrative_area_level_1")) {
                        this.getCity = component.long_name;
                    } else if (types.includes("locality") || types.includes("sublocality_level_1")) {
                        this.getCounty = component.long_name;
                    } else if (types.includes("sublocality_level_2")) {
                        this.getTown = component.long_name;
                    } else if (types.includes("sublocality_level_3") || types.includes("sublocality_level_4")) {
                        this.getTown2 = component.long_name;
                    } else if (types.includes("country")) {
                        this.getCountry = component.short_name.toUpperCase();
                    }
                });
            });


            const geocodeResult = await reverseGeocode(getlat, getlon);

            this.address = geocodeResult.address_components;

            this.address.forEach(component => {
                const types = component.types;
                if (types.includes("administrative_area_level_1")) {
                    this.getCity = component.long_name;
                } else if (types.includes("locality") || types.includes("sublocality_level_1")) {

                    this.getCounty = component.long_name;
                } else if (types.includes("sublocality_level_2")) {

                    this.getTown = component.long_name;
                } else if (types.includes("sublocality_level_3") || types.includes("sublocality_level_4")) {

                    this.getTown2 = component.long_name;
                } else if (types.includes("country")) {

                    this.getCountry = component.short_name.toUpperCase();
                }
            });
            // Add event listener for marker dragend
            marker.addListener("dragend", async () => {
                const newLat = marker.getPosition().lat();
                const newLng = marker.getPosition().lng();
                this.form.lat = marker.getPosition().lat();
                this.form.lon = marker.getPosition().lng();
                // Perform reverse geocoding
                const geocodeResult = await reverseGeocode(newLat, newLng);

                // Extract address components
                this.address = geocodeResult.address_components;

                // Iterate through address components to extract city, county, and town
            });


            const geocodeResult1 = await reverseGeocode(getlat, getlon);

            this.address = geocodeResult1.address_components;
            this.address.forEach(component => {
                const types = component.types;
                if (types.includes("administrative_area_level_1")) {

                    this.getCity = component.long_name;
                } else if (types.includes("locality") || types.includes("sublocality_level_1")) {

                    this.getCounty = component.long_name;
                } else if (types.includes("sublocality_level_2")) {

                    this.getTown = component.long_name;
                } else if (types.includes("sublocality_level_3") || types.includes("sublocality_level_4")) {

                    this.getTown2 = component.long_name;
                } else if (types.includes("country")) {

                    this.getCountry = component.short_name.toUpperCase();
                }
            });

            function reverseGeocode(latitude, longitude) {
                return new Promise((resolve, reject) => {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
                        if (status === "OK") {
                            if (results[0]) {
                                resolve(results[0]);
                            } else {
                                reject("No results found");
                            }
                        } else {
                            reject("Geocoder failed due to: " + status);
                        }
                    });
                });
            }
        },
        submitMap() {

            let country = "";
            let city = "";
            let county = "";
            let town = "";
            let town2 = "";

            this.address.forEach(component => {
                const types = component.types;
                if (types.includes("administrative_area_level_1")) {
                    city = component.long_name; // 시/도
                } else if (types.includes("locality") || types.includes("sublocality_level_1")) {
                    county = component.long_name; // 시/군/구
                } else if (types.includes("sublocality_level_2")) {
                    town = component.long_name; // 읍/면/동
                } else if (types.includes("sublocality_level_3") || types.includes("sublocality_level_4")) {
                    town2 = component.long_name;
                } else if (types.includes("country")) {
                    country = component.short_name.toUpperCase();
                }
            });
            // Use the extracted address components
            if (!country && !city && !county && !town && !town2) {
                this.mapNull = true;
                this.form.city = "";
                this.form.county = "";
                this.form.town = "";
                this.form.village = "";
                this.form.country = "";
            } else {
                this.form.city = city;
                this.form.county = county;
                this.form.town = town;
                this.form.village = town2;
                this.form.country = country;


                this.detailMap = true;
            }

        },
        closeMap() {
            this.isMap = false;
            this.detailMap = false;

        },
        getProduct() {
            this.$store.commit("setLoading", true);

            this.$axios.get("api/products/" + this.$route.query.id, {})
                    .then(response => {
                        this.product = response.data.data;

                        this.form.offer_price = this.product.offer_price;
                        this.form.title = this.product.title;
                        this.form.product_category_id = this.product.product_category_id;
                        this.form.type = this.product.type;
                        this.form.price = this.product.price;
                        this.price = this.product.price;
                        if (this.form.offer_price == 1) {
                            this.price = "";
                        }
                        this.form.description = this.product.description;
                        this.description = this.product.description;
                        this.form.address_detail = this.product.address_detail;
                        this.form.keywords_origin = this.product.keywords_origin;
                        this.form.city = this.product.city.title;
                        this.form.county = this.product.county.title;
                        this.form.town = this.product.town.title;
                        this.form.village = this.product.village.title;
                        this.form.country = this.product.country;
                        this.form.imgs = this.product.imgs;
                        this.form.real_county = this.product.realCounty.title;
                        this.form.real_country = this.product.real_country.title;
                        this.form.real_city = this.product.real_city
                        this.getMap();
                        this.load = true;
                        this.activeFiles = true;
                    })
        },
        store() {
            this.ongoing = true;
            if (!this.form.title)
                this.isTitleNull = true;
            if (this.ongoing == true) {
                if (this.$route.query.id) {

                    this.$store.commit("setLoading", true);
                    return this.form.patch("/api/products/" + this.$route.query.id)

                            .then(response => {
                                this.isSuccess = true;
                                this.ongoing = false;
                                this.$auth.fetchUser();


                            }).catch(error => {
                                this.isError();
                                this.ongoing = false;
                            });
                } else {


                    this.$store.commit("setLoading", true);
                    this.form.post("/api/products").then(response => {
                        this.isSuccess = true;
                    }).then(response => {
                        this.$auth.fetchUser();
                        this.ongoing = false;
                    }).catch(error => {
                        this.ongoing = false;
                        this.isError();
                    });
                }
            }

        },
        offer() {
            this.form.offer_price = this.form.offer_price ? 0 : 1;
            if (this.form.offer_price === 1) {
                this.price = "";
                this.isOffer = true;
                this.form.price = 0;
            } else {
                this.isOffer = false;
            }
        },
        isError() {
            let isNullCategory = !this.form.product_category_id;
            let isNullPrice = !this.price;
            let isNullLocation = !this.form.address_detail;
            let isNullType = !this.form.type;
            let isFullTitle = this.form.title;

            if (isNullCategory) {
                this.nullCategory = true;
            }
            if (isNullPrice) {
                this.nullPrice = true;
            }
            if (isNullLocation) {
                this.nullLocation = true;
            }
            if (isNullType) {
                this.nullType = true;
            }
            if (isFullTitle.length > 100) {
                this.isTitle = true;

            }
        },
        //     현재 위치권한 없을 시 지도 안보이게 하는 부분
        isMapOpen() {
            // 현재위치가없을때
            this.isMap = true;
            history.pushState(null, '', '');
            window.addEventListener('popstate', this.closeModalOnPopState);
        },
        closeImg() {
            this.isMap = false;
            this.detailMap = false;
            window.removeEventListener('popstate', this.closeModalOnPopState);
        },
        closeModalOnPopState() {
            this.closeImg();
        },
        preventScroll(event) {
            if (event.deltaY !== 0) {
                event.preventDefault();
            }
        },
        updateTotalImagesCount(count) {
            this.totalImagesCount = count;
        },
        checkKeywordValidity() {
            // 입력된 키워드를 콤마(,)로 나눔
            let keywords = this.form.keywords_origin.split(',').map(keyword => keyword.trim());

            // 키워드 개수 및 각 키워드의 길이를 검사
            let validKeywords = [];
            let tooLongKeywords = false; // 15자를 초과한 키워드가 있는지 여부

            for (let keyword of keywords) {
                if (keyword.length > 0) {
                    if (keyword.length > this.maxKeywordLength) {
                        tooLongKeywords = true;
                        this.form.keywords_origin = validKeywords.join(', ');
                    } else {
                        validKeywords.push(keyword);
                    }
                }
            }

            // 키워드 길이가 15자를 초과한 경우 경고 표시
            if (tooLongKeywords) {
                alert(`각 키워드는 최대 ${this.maxKeywordLength}자를 초과할 수 없습니다.`);

            }

            // 유효한 키워드 개수가 최대 허용 개수를 초과한 경우
            if (validKeywords.length > this.maxKeywords) {
                alert(`키워드는 최대 ${this.maxKeywords}개까지 입력 가능합니다.`);
                validKeywords = validKeywords.slice(0, this.maxKeywords);
                this.form.keywords_origin = validKeywords.join(', ');// 초과된 부분을 제거
            }

            // 유효한 키워드를 다시 문자열로 조합하여 form 데이터에 저장

        },
        out() {
            this.$router.push('/products');
        }

    },

    beforeUnmount() {
        window.removeEventListener('popstate', this.closeModalOnPopState);
    },
    computed: {
        addressPlaceholder() {
            const location = this.form.town || this.form.county || '';
            const detail = this.form.address_detail || '';
            return (location + ' ' + detail) || '지역선택';
        },

        checkInputAll() {
            let exceptColumns
            if (this.isOffer == 1) {
                exceptColumns = ["town", "village", "keywords_origin", "imgs", "imgs_remove_ids", "price"];
            } else {
                exceptColumns = ["town", "village", "keywords_origin", "imgs", "imgs_remove_ids"];
            }

            let keys = Object.keys(this.form.data());

            let result = true;

            keys.some(key => {
                if (exceptColumns.includes(key))
                    return false;

                if (Array.isArray(this.form[key]) && this.form[key].length === 0) {
                    result = false;
                    return true;
                }

                if (this.form[key] === "") {

                    result = false;
                    return true;
                }

                return false;
            });

            return result;

        },

        coords() {
            return this.$store.state.coords;
        },

        productCategories() {
            return this.$store.state.productCategories;
        },


        fullAddress() {
            let result = "";

            if (this.form.city || this.form.county || this.form.town || this.form.village) {
                if (this.form.city)
                    result += this.form.city;

                if (this.form.county)
                    result += ` ${this.form.county}`;

                if (this.form.town)
                    result += ` ${this.form.town}`;

                if (this.form.village)
                    result += ` ${this.form.village}`;

                return result;
            }

            return result;
        },


    },

    watch: {
        "form.type": {
            handler() {
                if (this.form.type == 2) {
                    this.price = 0;
                    this.form.offer_price = 0;
                }
            }
        },
        "price": {
            handler() {

                this.form.price = this.price;

                // 값이 정수형인지 판단 후 정수형이면 * 10000
                // getproduct쪽에서 price를 parseInt로 해서 정수형으로 변환해주기. 숫자인지를 확실히 하는것.

            },
            'form.product_category_id': {
                handler(newValue, oldValue) {
                    if (newValue !== null) {
                        this.isNullCategory = false; // form.product_category_id가 null이 아닐 때
                    }
                },
                immediate: true // 초기 값으로도 즉시 실행
            },
            'form.title': {
                handler(newValue, oldValue) {
                    if (newValue !== null && newValue.trim() !== '') {
                        this.isTitleNull = false; // form.title이 null이 아니고 공백이 아닐 때
                    } else {
                        this.isTitleNull = true; // form.title이 null이거나 공백일 때
                    }
                },
                immediate: true // 초기 값으로도 즉시 실행
            }
        },

    },


    mounted() {
        let self = this;

        setTimeout(function () {
            self.getMap();
        }, 2000)
        if (this.$route.query.id) {
            return this.getProduct();

        } else if (this.$auth.user.data.latestProduct) {
            this.form.country = this.$auth.user.data.latestProduct.country;
            this.form.city = this.$auth.user.data.latestProduct.city.title;
            this.form.county = this.$auth.user.data.latestProduct.county.title;
            this.form.town = this.$auth.user.data.latestProduct.town.title;
            this.form.address_detail = this.$auth.user.data.latestProduct.address_detail;
        }
        console.log(this.$auth.user.data);
    },

};
</script>
