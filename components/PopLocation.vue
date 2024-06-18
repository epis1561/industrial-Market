<template>
    <div class="modal-container local_select_2">
        <div class="modal-select-wrap modal-wrap">
            <i class="close-btn"></i>
            <div class="modal-title-wrap center">

                <h3 class="modal-title">지역</h3>
            </div>

            <div class="modal-scroll-wrap">
                <div class="form-label-wrap row-group">
                    <label :for="'type_' + item.id" v-for="item in location" :key="item.id">
                        <input type="radio" class="form-radio" :value="item.id" :id="'type_' + item.id" name="type" v-model="selectedLocation" @click="getTitle(item.title)">
                        <div class="checked-item col-group">
                            <div class="icon">
                                <i class="xi-check"></i>
                            </div>
                            <p class="txt">
                                {{ item.title }}
                            </p>
                        </div>
                    </label>
                </div>
            </div>


            <div class="modal-footer col-group">
                <button class="modal-footer-btn submit-btn close-btn" @click="sendLocation()">
                    지역선택
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
    props:["location"],
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
    selectedLocation:null,
    selectedLocationTitle:null,

        }
    },

    methods: {

        sendLocation(){
            this.$emit("sendLocate",this.selectedLocation);
        },
        getTitle(title){
            this.selectedLocationTitle = title;
            this.$emit("sendLocateTitle",this.selectedLocationTitle);
        }
    },

    computed: {

    },

    mounted() {

    }
}
</script>
