$(document).ready(function(){
    $('#gnb').load('/components/gnb.html');
    $('#search').load('/components/search.html'), function(){
        $('.prev-btn').click(function(){
            $('#search').removeClass('active');
        });
    };
    $('#pagination').load('/components/pagination.html');
    $('#footer').load('/components/footer.html');

    //header - search
    $('#header .search-btn').click(function(){
        $('#search').addClass('active');
    });
})