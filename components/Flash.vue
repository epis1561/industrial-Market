<template>
    <div>
    <div class="modal-notice-txt" :class="{'active':isAdd}" v-if="isAdd">
        키워드 알림이 등록되었습니다.
    </div>
    <div class="modal-notice-txt" :class="{'active':isEnough}" v-if="isEnough">
        최대 50개까지만 등록 가능합니다.
    </div>
        <div class="modal-notice-txt" :class="{'active':isname}" v-if="isname">
            {{ name }}님이 차단 해제되었습니다.
        </div>
        <div class="modal-notice-txt" :class="{'active':isEmpty}" v-if="isEmpty">
            키워드를 입력해주세요.
        </div>
        <div class="modal-notice-txt" :class="{'active':isReportEmpty}" v-if="isReportEmpty">
            신고 사유를 선택해주세요.
        </div>
        <div class="modal-notice-txt" :class="{'active':isNullLocate}" v-if="isNullLocate">
            활동지역을 선택해주세요.
        </div>

    </div>
</template>
<style>

</style>
<script>
export default {
    props: ["isAdd","isEnough","name","isname","isEmpty","isReportEmpty","isNullLocate"],
    head(){
        return {
            link: [
                {rel: 'stylesheet', href: '/css/developer.css'},

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
        targetUser(){

            if(this.item.owner && this.item.owner.id == this.$auth.user.data.id){
                return this.item.asker;
            }
            else if(this.item.asker && this.item.asker.id == this.$auth.user.data.id){
                return this.item.owner;
            }
        },
    },

    mounted() {

    }
}
</script>
