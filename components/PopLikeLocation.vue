<template>
    <div class="modal-container local_select_1" :class="{'active': active}">
        <div class="modal-select-wrap modal-wrap">
            <i class="close-btn" @click="close"></i>
            <div class="modal-title-wrap center">
                <h3 class="modal-title" @click="console">지역</h3>
            </div>

            <div class="form-label-wrap row-group">
                <label for="type_all">
                    <input type="radio" class="form-radio" id="type_all" value="전국" name="city" v-model="selectedLocation">
                    <div class="checked-item col-group">
                        <div class="icon">
                            <i class="xi-check"></i>
                        </div>
                        <p class="txt">
                            전국
                        </p>
                    </div>
                </label>
                <label for="type_my">
                    <input type="radio" class="form-radio" id="type_my" value="내위치" name="city" v-model="selectedLocation">
                    <div class="checked-item col-group">
                        <div class="icon">
                            <i class="xi-check"></i>
                        </div>
                        <p class="txt">
                            현 위치로 보기
                        </p>
                    </div>
                </label>
                <label for="type_prefer">
                    <input type="radio" class="form-radio" id="type_prefer"  value="선호지역" name="city" v-model="selectedLocation">
                    <div class="checked-item col-group">
                        <div class="icon">
                            <i class="xi-check"></i>
                        </div>
                        <p class="txt">
                         {{ this.$auth.user.data.activeCounty.title}}
                        </p>
                    </div>
                </label>

<!--                선호지역부분 나중에 처리해야함        -->
            </div>

            <div class="modal-footer col-group">
                <button class="modal-footer-btn local_select_btn_2" @click="detail">
                    지역선택
                </button>
                <button class="modal-footer-btn submit-btn close-btn" @click="show">
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
props:["active"],

    data(){
        return {
            selectedLocation:"",

        }
    },

    methods: {
        show(){
            if(this.selectedLocation=== "전국"){
                this.$emit('showAll');
            }
            else if(this.selectedLocation === "내위치"){

                this.$emit('showReal');
            }
            else if(this.selectedLocation === "선호지역"){

                this.$emit('showPrefer');
            }
        },
        detail(){
       this.selectedLocation = "";
       this.$emit('detail');

        },
        close(){
          this.$emit('close');
        },
        console(){
        }


    },

    computed: {
            user(){
               return this.$auth.user.data;
            }
    },

    mounted() {

    }
}
</script>
