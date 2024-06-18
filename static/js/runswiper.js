//헤더 스크롤
$(document).scroll(function () {
    var headerHeight = $('#header').height();

    if ($(document).scrollTop() > 0) {
        $('#header').addClass('active');
    } else {
        $('#header').removeClass('active');
    }
});

//swiper
var swiper = new Swiper(".detail-img-slide", {
    loop: true,
    autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
        delay : 3000,   // 시간 설정
        disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
    },
    pagination: {
        el: '.detail-img-pagination',
    },
});

//swiper 내 이미지 클릭시 팝업 열림
$('.detail-img-slide .swiper-slide').click(function(){
    $('.modal_slide').addClass('active');
    var slide_popup = new Swiper(".slide_popup", {
        loop: true,
        pagination: {
            el: '.slide-popup-pagination',
        },
    });
});

//신고하기 버튼 클릭시 팝업 열림
$('.report-btn').click(function(){
    $('.modal_report').addClass('active');
});

//더보기,select 클릭 시 팝업 열림
$('.more-btn, .detail-status-select').click(function () {
    $('.modal_chat').addClass('active');
});

//거래중 변경 버튼 클릭시 팝업 열림
$('.trans-btn').click(function(){
    $('.modal_trans').addClass('active');
});

//modal 닫힘
$('.modal-container .close-btn').click(function () {
    $('.modal-container').removeClass('active');
});

$('.modal-container').click(function (e) {
    if (e.target === this) {
        $(".modal-container").removeClass('active');
    }
});