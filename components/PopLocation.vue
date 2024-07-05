<template>
    <div>
        <div class="modal-container local_select_2" :class="{'active': active}">
            <div class="modal-select-wrap modal-wrap">
                <i class="close-btn" @click="isclose"></i>
                <div class="modal-title-wrap center">
                    <h3 class="modal-title">지역</h3>
                </div>

                <div class="modal-scroll-container col-group">
                    <div class="modal-scroll-wrap local-select-group-1">
                        <div class="form-label-wrap row-group">
                            <label :for="`type_${city.id}`" v-for="city in cities.data" :key="city.id">
                                <input type="radio" class="form-radio" :value="city.id" :id="`type_${city.id}`" name="type" @click="selectCity(city)">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        {{ city.title }}
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="modal-scroll-wrap local-select-group-2" v-if="selectedCity">
                        <div class="form-label-wrap row-group">
                            <label :for="`county_${county.id}`" v-for="county in selectedCity.counties" :key="county.id">
                                <input type="radio" class="form-radio" :value="county.id" :id="`county_${county.id}`" name="county" @click="selectCounty(county)">
                                <div class="checked-item col-group">
                                    <div class="icon">
                                        <i class="xi-check"></i>
                                    </div>
                                    <p class="txt">
                                        {{ county.title }}
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn submit-btn close-btn" @click="send">
                        지역선택
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
<style>

</style>
<script>
import Form from "@/utils/Form";

export default {
    props: ["active"],
    head() {
        return {
            script: [
                {
                    src: '/js/filter.js',
                    defer: true
                },
            ],

        }
    },
    data() {
        return {
            selectedCity:null,
            selectCityName:"",
            countyId:"",
            countyName:"",
        }
    },

    methods: {
        isclose() {
            this.$emit('close');
        },
        send() {
            this.$emit('close');
        },
        selectCity(city){
            this.selectedCity = city;
        },
        selectCounty(county){
            this.$emit("change", county);
        }
    },

    computed: {
        cities() {
            return this.$store.state.cities;
        },

    },

    mounted() {

    }
}
</script>
