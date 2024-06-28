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

                                <div class="file-preview-scroll-wrap">
                                    <div class="file-preview-wrap col-group">
                                        <input-images :multiple="true" @change="(data) => {form.imgs = data;}" v-if="activeFiles"/>
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
                            <button class="category":class="{'active':form.product_category_id == productCategory.id}"  v-for="productCategory in productCategories.data" :key="productCategory.id" @click="form.product_category_id = productCategory.id;">
                                {{ productCategory.title }}
                            </button>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            제목
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="제목을 입력해주세요" v-model="form.title">
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            가격
                        </div>
                        <div class="categorybuttons">
                            <button class="category" :class="{'active':form.type == 0}" @click="form.type=0">팝니다</button>
                            <button class="category" :class="{'active':form.type == 1}" @click="form.type=1">찾습니다</button>
                            <button class="category" :class="{'active':form.type == 2}" @click="form.type=2">나눔합니다</button>
                        </div>
                        <div class="item-user row-group">
                            <div class="form-input-wrap col-group">
                                <input type="number" class="form-input" placeholder="가격을 입력해주세요" v-model="form.price" v-if="form.type == 2" disabled>
                                <input type="number" class="form-input" placeholder="가격을 입력해주세요" v-model="form.price" v-else>
                                <p class="sticker">만원</p>
                            </div>

                            <div class="m-input-checkbox type01" v-if="form.type!=2">
                                <input type="checkbox" id="check1">
                                <label for="check1" @click="offer" >가격 제안 받기</label>
                            </div>

                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            상품설명
                        </div>
                        <div class="item-user">
                            <div class="form-textarea-wrap">
                                <textarea name="" id=""  maxlength="2000" class="form-textarea" placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요. 작성된 문의 내용은 검색 포털에 노출됩니다.개인 정보는 작성 내용에 기재하시면 안됩니다." v-model="form.description"> </textarea>
                                <p class="sticker">
                                    <span>{{ form.description.length }}</span> / 2000
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            거래 희망 장소
                        </div>
                        <div class="item-user">
                            <div class="form-input-wrap relative">
                                <input type="text" class="form-input modal_addr_btn" placeholder="위치 선택" readonly
                                       @click="isMap=true" :value="fullAddress">
                                <i class="sticker" @click="isMap=true"></i>
                            </div>
                        </div>
                    </div>
                    <div class="form-item row-group">
                        <div class="item-default">
                            키워드(선택)
                            <p class="guide-txt">
                                키워드가 2개 이상인 경우 컴마(,)로 구분하여 입력해 주세요. <br>
                                예) 각가공, 밀링, 머시닝가공, 백색 아노다이
                            </p>
                        </div>
                        <div class="item-user">
                            <input type="text" class="form-input" placeholder="컴마(,)로 구분 / 최대 15자 / 5개까지 등록가능" v-model="form.keywords_origin">
                        </div>
                    </div>
                    <div class="form-footer col-group">
                        <button class="form-footer-btn submit-btn" :class="{'disable':!checkInputAll}" @click="store"> <!-- 필수 입력란 모두 입력시 disable 클래스 삭제 -->
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
                    <button class="modal-footer-btn submit-btn close-btn" @click="closeMap" >
                        거래 장소 등록
                    </button>
                </div>
            </div>

        </div>
        <!-- //선택 완료 시 나타나는 select -->
    </div>
    </body>
</template>
<style>
.m-input-images.type01 .m-files{
    flex-wrap:nowrap;
    gap: 8px;
}
.m-input-images.type01 .m-file-wrap{
    position: relative;
    padding: 0;
}
.m-input-images.type01 .m-file{
    background-size:cover;

}
.m-input-images.type01 .m-file{
    width: 95px !important;
    height: 95px !important;
    border-radius: 10px !important;
}
.file-preview-wrap .xi-close{
    border-radius: 4px;
    top: 3px;
}
.m-file-wrap:first-child .file-preview-label { display: block; }
.file-preview-label{
    border-radius: 2px;
    top: 1px;
    left: 1px;
    z-index: 9999;
}
.file-upload-wrap{
    align-items: center;
}
</style>
<script>

import Form from "@/utils/Form";

export default {
    toggleBtn(){
        $('.categorybuttons .category').on('click', function() {
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

            }),

        }

    },

    methods: {

    },

    computed: {


    },

    watch: {

    },



    mounted() {

    },

};
</script>
