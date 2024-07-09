<template>
    <div class="modal-container align_select" :class="{'active':active}">
        <div class="modal-select-wrap modal-wrap">
            <i class="close-btn"></i>
            <div class="modal-title-wrap center">
                <h3 class="modal-title">정렬</h3>
            </div>

            <div class="modal-scroll-wrap">
                <div class="form-label-wrap row-group">
                    <label for="type_create">
                        <input type="radio" class="form-radio" id="type_create" name="type_order" value="created_at"v-model="order_by">
                        <div class="checked-item col-group">
                            <div class="icon">
                                <i class="xi-check"></i>
                            </div>
                            <p class="txt">
                                최신순
                            </p>
                        </div>
                    </label>
                    <label for="type_like">
                        <input type="radio" class="form-radio" id="type_like" name="type_order" value="count_like"v-model="order_by">
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
                <button class="modal-footer-btn submit-btn close-btn" @click="sendOrder()">
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
props:["active"],

    data(){
        return {
order_by:null,
        }
    },

    methods: {
        sendOrder(){
            this.$emit("change",this.order_by);
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
