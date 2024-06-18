//상단 왼쪽 select 클릭 시 팝업 열림
$('.local_select_btn').click(function () {
    $('.local_select_1').addClass('active');
});

//팝업 내 '지역선택' 클릭 시 팝업 열림
$('.local_select_btn_2').click(function () {
    $('.local_select_1').removeClass('active');
    $('.local_select_2').addClass('active');
});

//상단 오른쪽 select 클릭 시 팝업 열림
$('.align_select_btn').click(function () {
    $('.align_select').addClass('active');
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