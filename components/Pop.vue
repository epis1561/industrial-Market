<template>
    <div class="m-pop type01 modal-container" v-if="pop" style="display: block; z-index: 999999999;">
        <div class="modal-wrap" style="max-width:calc(100% - 40px); width:560px;">
<!--            <div class="title-wrap">
                <h3 class="title" v-if="pop.title">
                    {{ pop.title }}
                </h3>
            </div>-->
            <p class="txt" v-html="pop.description ? pop.description : '성공적으로 처리되었습니다.'"></p>

            <div class="btn-wrap">
                <button class="m-btn type01 bg-primary type-middle" @click.prevent="close">
                    확인
                </button>
            </div>
        </div>
    </div>
</template>
<style>
.m-pop.type01 {
    width:100%; height:100%;
    position: fixed; top:0; left:0;
    z-index:10;
    background-color:rgba(0,0,0,0.3);
    opacity:1; visibility: unset;
}
.m-pop.type01 .modal-container {
    display: block; height: 100vh; width: 100%;
    position: fixed; top: 0; right: 0; left: 0; bottom: 0;
    background: rgba(0,0,0,0.2);
}
.m-pop.type01 .modal-wrap {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 100%; max-width: 560px; height:auto;
    background: #fff; padding: 30px 30px;
    padding-bottom:24px; text-align: center; border-radius: 24px; box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
}
.m-pop.type01 .modal-wrap .title-wrap { padding-bottom: 32px; border-bottom: 1px solid #ccc; margin-bottom: 32px; }
.m-pop.type01 .modal-wrap .title-wrap i { font-size: 40px; color: #0091f0; display: inline-block; margin-bottom: 16px; }
.m-pop.type01 .modal-wrap .title-wrap .title { font-size: 40px; color: #0097ff; }
.m-pop.type01 .modal-wrap .title-wrap.warning i, .modal-wrap .title-wrap.warning .title { color: #ff0000; }
.m-pop.type01 .modal-wrap .txt {
    margin-bottom: 24px; word-break: keep-all;
    font-size: 18px; font-weight:500; line-height:24px;
}
.m-pop.type01 .modal-wrap .btn-wrap { display: flex; justify-content: center; gap: 16px; }
.m-pop.type01 .modal-wrap .btn-wrap .m-btn {
    display: flex; align-items: center; justify-content: center; width: 168px; height: 40px; background: #2f83f7; text-align: center; line-height: 56px; border-radius: 4px; font-size: 17px; font-weight: bold; color: #fff;
}
.m-pop.type01 .modal-wrap .btn-wrap .cancel-btn { background: #8a8a8a; }


.m-pop.type01 .modal-box {transition:all ease 0.5s; opacity:0; display:none; position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(23,5,46,0.7);}
.m-pop.type01 .modal-box > .box {box-shadow:0 0 10px rgba(0,0,0,0.5); padding:67px 25px 48px; border:1px solid #E4E4E4; border-radius:24px; background:#fff; max-width:640px; width:100%; position:absolute; left:50%; top:45%; transform:translate(-50%,-50%);}
.m-pop.type01 .modal-box > .box h2 {word-break:keep-all; font-size:32px; line-height:1.3; font-weight:bold; color:#202020; text-align:center; margin:0 0 20px;}
.m-pop.type01 .modal-box > .box div {word-break:keep-all; font-size:16px; line-height:1.4; color:#303030; text-align:center;}
.m-pop.type01 .modal-box > .box .button-box {max-width:400px; margin:55px auto 0;}
.m-pop.type01 .modal-box.fixed {display:block; opacity:1;}
.m-pop.type01 .modal-box > .box.fixed {animation-name:modalOpen; animation-duration:0.5s; animation-fill-mode:forwards;}
.m-pop.type01 .modal-box > .box.nofixed {animation-name:modalClose; animation-duration:0.5s; animation-fill-mode:forwards;}

@media (max-width:991px){
    .m-pop.type01 .modal-box > .box {width:calc(100% - 30px); padding:50px 15px;}
    .m-pop.type01 .modal-box > .box h2 {font-size:25px; margin:0 0 10px;}
    .m-pop.type01 .modal-box > .box p {font-size:15px;}
    .m-pop.type01 .modal-box > .box .button-box {margin:40px auto 0;}
}
</style>
<script>
export default {
    computed: {
        pop(){
            return this.$store.state.pop;
        },
    },

    methods: {
        close(){
            this.$store.commit("setPop", null);
        }
    },

}
</script>
