<template>

</template>
<script>
import Form from "../utils/Form";
export default {
    data(){
        return {
            form: new Form(this.$axios, {
                word: "",
            }),

            alarms: {
                data: [],
                meta: {

                }
            },

        }
    },

    methods: {
        addEvents(){
            let self = this;

            $("#header .site_map_menu_wrap a, #header .btm-wrap a").unbind("click").bind("click", function (){
                self.closeSiteMap();
            });

            $('.gnb_toggle_btn, .gnb_search_btn').unbind("click").bind("click",function(){
                $('.site_map').addClass('active');

                $('#rental_popup .modal-scroll-wrap').scrollTop(0);

                var scrollPosition = window.scrollY; //스크롤 위치 저장
                $('body').data('scroll', scrollPosition);

                $('body').css('position', 'fixed');
                $('body').css('top', -scrollPosition + 'px');
            });

            $(".close-btn").unbind("click").bind("click",function(){
                self.closeSiteMap();
            });

            //모바일 site map gnb 열고 닫기
            $('.title.mb').unbind("click").bind("click", function(){
                $(this).toggleClass('active');

                if ($(this).hasClass('active')) {
                    $(this).next('.category_ul').stop().slideDown();
                } else {
                    $(this).next('.category_ul').stop().slideUp();
                }
            });
        },

        closeSiteMap(){
            $('.site_map').removeClass('active');

            var scrollPosition = $('body').data('scroll');

            $('body').css('position', '');
            $('body').css('top', '');

            // 스크롤 위치 복원
            window.scrollTo(0, scrollPosition);
        },

        search(){
            this.$router.push({
                path: "/campaigns",
                query: {
                    word: this.form.word
                }
            })
        },

        logout(){
            this.$store.commit("setPushToken", null);

            this.$auth.logout();
        }

    },

    computed: {

        categories() {
            return this.$store.state.categories;
        },

    },

    watch: {
        "$route": {
            deep: true,
            handler(){
                this.closeSiteMap();
            }
        },
    },

    mounted() {
        this.addEvents();
    }
}
</script>


