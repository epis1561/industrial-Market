<template>
    <div id="top_menu">
        <button type="button" class="top-btn btn btn-up row-group">
            <i class="xi-arrow-up"></i>
        </button>
        <button type="button" class="top-btn btn btn-down row-group">
            <i class="xi-arrow-down"></i>
        </button>
    </div>
</template>
<style>
#top_menu {
    position:fixed; bottom:20px; right:20px;
}
#top_menu .top-btn {
    display: flex; align-items: center; justify-content: center;
    width:40px; height:40px; margin:8px 0;
    border-radius:5px;
    background-color:#ffc032;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
}
#top_menu .top-btn i {
    font-size:18px; font-weight:bold;
}
</style>
<script>
import Form from "@/utils/Form";

export default  {
    data(){
        return {


        }
    },

    methods: {

    },

    mounted() {
        $('.top-btn.btn-up').click(function(){
            $('html').scrollTop(0);
        });

        $('.top-btn.btn-down').click(function(){
            $('html').scrollTop(10000000);
        });
    }
}
</script>
