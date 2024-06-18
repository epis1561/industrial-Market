<template>
    <div class="modal-container local_select_1">
        <div class="modal-select-wrap modal-wrap">
            <i class="close-btn"></i>
            <div class="modal-title-wrap center">
                <h3 class="modal-title">지역</h3>
            </div>

            <div class="form-label-wrap row-group">
                <label for="type_all">
                    <input type="radio" class="form-radio" id="type_all" name="type_all">
                    <div class="checked-item col-group">
                        <div class="icon">
                            <i class="xi-check"></i>
                        </div>
                        <p class="txt">
                            전국
                        </p>
                    </div>
                </label>
<!--                <label for="type_2">-->
<!--                    <input type="radio" class="form-radio" value="1" id="type_2" name="type" v-model="this.location">-->
<!--                    <div class="checked-item col-group">-->
<!--                        <div class="icon">-->
<!--                            <i class="xi-check"></i>-->
<!--                        </div>-->
<!--                        <p class="txt">-->
<!--                            현 위치로 보기-->
<!--                        </p>-->
<!--                    </div>-->
<!--                </label>-->
<!--                <label for="type_3">-->
<!--                    <input type="radio" class="form-radio" value="3" id="type_3" name="type" v-model="this.form.location_id">-->
<!--                    <div class="checked-item col-group">-->
<!--                        <div class="icon">-->
<!--                            <i class="xi-check"></i>-->
<!--                        </div>-->
<!--                        <p class="txt">-->
<!--                            경기도-->
<!--                        </p>-->
<!--                    </div>-->
<!--                </label>-->

<!--                선호지역부분 나중에 처리해야함        -->
            </div>

            <div class="modal-footer col-group">
                <button class="modal-footer-btn local_select_btn_2">
                    지역선택
                </button>
                <button class="modal-footer-btn submit-btn" @click="sendLocate()">
                    상품보기
                </button>
            </div>
        </div>

    </div>
</template>
<style>

</style>
<script>
import Form from "@/utils/Form";

export default {

    head(){
        return {
            script: [
                {
                    src: '/js/filter.js',
                    defer: true
                },
            ],
        }
    },
    data(){
        return {
location:null,
        }
    },

    methods: {
sendLocate(){
    this.$emit("sendLocate", this.location);
}
    },

    computed: {

    },

    mounted() {

    }
}
</script>
