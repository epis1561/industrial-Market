<template>
    <div class="modal-container align_select">
        <div class="modal-select-wrap modal-wrap">
            <i class="close-btn"></i>
            <div class="modal-title-wrap center">
                <h3 class="modal-title">정렬</h3>
            </div>

            <div class="modal-scroll-wrap">
                <div class="form-label-wrap row-group">
                    <label for="type_1">
                        <input type="radio" class="form-radio" id="type_1" name="type">
                        <div class="checked-item col-group">
                            <div class="icon">
                                <i class="xi-check"></i>
                            </div>
                            <p class="txt">
                                최신순
                            </p>
                        </div>
                    </label>
                    <label for="type_2">
                        <input type="radio" class="form-radio" id="type_2" name="type">
                        <div class="checked-item col-group">
                            <div class="icon">
                                <i class="xi-check"></i>
                            </div>
                            <p class="txt">
                                인기순
                            </p>
                        </div>
                    </label>
                </div>
            </div>


            <div class="modal-footer col-group">
                <button class="modal-footer-btn submit-btn close-btn">
                    상품보기
                </button>
            </div>
        </div>

    </div>
</template>
<style>

</style>
<script>
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

        }
    },

    methods: {

    },

    computed: {

    },

    mounted() {

    }
}
</script>
