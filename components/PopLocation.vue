<template>
    <div class="modal-container local_select_2">
        <div class="modal-select-wrap modal-wrap">
            <i class="close-btn"></i>
            <div class="modal-title-wrap center">
                <h3 class="modal-title">지역</h3>
            </div>

            <div class="modal-scroll-wrap">
                <div class="form-label-wrap row-group">
                    <label :for="'type_' + item.id":item="item" v-for="item in locations.data" :key="item.id">
                        <input type="radio" class="form-radio" :value="item.id" id="type_locations.id" name="type">
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
                <button class="modal-footer-btn submit-btn close-btn">
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


            locations:{
                data:[],
            },
        }
    },

    methods: {
        getLocations() {
            this.$axios.get("/api/locations", {

            }).then(response => {
                return this.locations = response.data;
            })
        },
    },

    computed: {

    },

    mounted() {
        this.getLocations()
    }
}
</script>
