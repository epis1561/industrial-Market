<template>
    <div class="pop-parent" id="popParent" v-if="activePop && pops.data.length > 0">
        <div class="pop">
            <div class="swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <a :href="pop.url ? pop.url : '#'" class="swiper-slide" v-for="pop in pops.data" :key="pop.id">
                            <div class="m-ratioBox-wrap">
                                <div class="m-ratioBox" :style="`background-image:url(${pop.img ? pop.img.url : ''}); background-size:cover; background-position:center;`"></div>
                            </div>
                        </a>
                    </div>

                    <div class="swiper-control">
                        <div class="swiper-pagination"></div>
                    </div>
                </div>

                <div class="pop-btns">
                    <!-- <a href="#a" id="popupToday" class="btnDivPopClose"><span class="icon"></span> 오늘하루 보지 않기</a> -->
                    <input type="checkbox" name="oneday" id="oneday_check" @click="closeToday()">
                    <label for="oneday_check" @click="closeToday()">
                        <span class="icon"></span> 오늘하루 보지 않기
                    </label>


                    <!-- <input type="checkbox" id="popupToday"> <label for="popupToday">오늘하루 열지않음</label> -->
                    <button class="btn-toggle">
                        <i class="xi-angle-up" style="color:#fff;"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.pop-parent {
    position: fixed;
    top: 200px;
    right: 0;
    z-index: 99;
    transition: all .2s;
}

.pop-parent .m-ratioBox-wrap {width:100%; padding-top:100%; position:relative; overflow:hidden;}
.pop-parent .m-ratioBox-wrap .m-ratioBox {position:absolute; top:0; left:0; right:0; bottom:0;}
/*
.m-ratioBox-wrap .m-ratioBox:after {content:""; width:83px; height:28px; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:url("../img/logo.png") no-repeat; background-size:100%; opacity:0.4;}
 */
.pop-parent .m-ratioBox-wrap img {display:block; width:100%; position:absolute; left:50%; top:50%; transform:translateY(-50%) translateX(-50%); z-index:1;}
.pop-parent .m-ratioBox-wrap iframe {width:105%; position:absolute; left:50%; top:50%; transform:translateY(-50%) translateX(-50%); z-index:1;}

.pop-parent .swiper {
    overflow:visible;
}
.pop-parent .swiper-container {
    overflow:hidden;
}
.pop-parent .swiper-pagination {
    display:flex;
}
.pop-parent .pop {width:400px; position:relative;}
.pop-parent .pop .btn-toggle {width:40px; height:40px; position:relative; background-color:black;
    cursor:pointer;
    transform:rotate(90deg);
}
.pop-parent .pop .btn-toggle img {
    width:auto;
    position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-90deg);
    transition:all .3s;
}
.pop-parent .pop-btns {
    display:flex; position:absolute; top:100%; right:0; left:auto; transform:none;
    background-color:#3c3c3c; opacity:1;

}
.pop-parent .pop-btns a {color: #fff; padding: 7px 14px;}
.pop-parent .pop-btns #oneday_check {position: absolute; clip: rect(0,0,0,0);}
.pop-parent .pop-btns #oneday_check + label {display:flex; align-items:center; padding:0 10px; font-size:14px; color:#fff; cursor:pointer;}
.pop-parent .pop-btns #oneday_check + label:before {content:""; display:inline-block; width:12px; height:12px; margin-right:10px;  border:1px solid #fff;}
.pop-parent .pop-btns #oneday_check:checked + label .icon {position:absolute; left:7px; top:7px; display:inline-block; width:20px; height:20px; background:url('/img/check_checked.png') no-repeat center center}

.pop-parent .pop .swiper-btn-control {width:8px; height:11px; margin-left:16px; position:relative; top:2px;}
.pop-parent .swiper-control {display:flex; align-items:center; position:absolute; top:21px; right:20px; z-index:2;}
.pop-parent .swiper-control .swiper-pagination {position:static;}
.pop-parent .swiper-pagination-bullet {flex:0 0 auto; width:10px; height:10px; margin:0 5px; border-radius:0; border:1px solid white; opacity:0.5; background-color:transparent;}
.pop-parent .swiper-pagination-bullet-active {background-color:#fff; opacity:1;}
.pop-parent.active {right:-400px;}
.pop-parent.active .btn-toggle {transform:rotate(180deg);}

@media screen and (max-width:1200px) {
    .pop-parent .pop {width:310px;}
    .pop-parent.active {
        right:-310px;
    }
}

</style>
<script>
export default {
    data() {
        return {
            pops: {
                data: [],
            },
            activePop: true,
        }
    },

    methods: {
        closeToday() {
            window.localStorage.setItem("closed_at", JSON.stringify(new Date()));

            this.activePop = false;
        },

        closePop() {
            this.activePop = false;
        },

        checkToday(date){
            let today = new Date();

            if(date.getFullYear() !== today.getFullYear())
                return false;

            if(date.getMonth() !== today.getMonth())
                return false;

            if(date.getDate() !== today.getDate())
                return false;

            return true;
        },

        getPops(){
            this.$axios.get("/api/pops")
                .then(response => {
                    this.pops = response.data;

                    setTimeout(function(){
                        $(".pop-parent .btn-toggle").click(function () {
                            $(".pop-parent").toggleClass("active");
                        });

                        new Swiper('.pop-parent .swiper-container', {
                            autoplay: {
                                delay: 3000,
                            },
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            loop:true,
                        });
                    }, 50);
                });
        }
    },

    computed: {

    },

    mounted() {
        this.getPops();

        let closedAt = window.localStorage.getItem("closed_at");

        if(closedAt && this.checkToday(new Date(JSON.parse(closedAt))))
            this.activePop = false;


    }
}
</script>
