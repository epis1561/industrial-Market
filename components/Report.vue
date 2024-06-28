<template>
    <div class="modal-container modal_report" :class="{'active':isReport}">
        <div class="modal-wrap">
            <i class="xi-close close-btn" @click="isReport=false"></i>
            <div class="modal-title-wrap border">
                <p class="modal-title">
                    신고하기
                </p>
                <p class="modal-sub-title">
                    아래의 목록에서 신고 사유를 선택해 주세요
                </p>
            </div>

            <div class="form-item row-group">
                <div class="form-label-wrap row-group">
                    <label :for="'type_'+reportCategory.id" v-for="reportCategory in reportCategories.data" :key="reportCategory.id">
                        <input type="radio" class="form-radio" :id="'type_'+reportCategory.id" :value="reportCategory.id" name="type" v-model="reportForm.report_category_id" @click="enable(reportCategory.id)">
                        <div class="checked-item col-group">
                            <div class="icon">
                                <i class="xi-check"></i>
                            </div>
                            <p class="txt">
                                {{ reportCategory.title }}
                            </p>
                        </div>
                        <div class="checked-item row-group" v-if="reportCategory.title=='기타'">
                            <input type="text"  class="form-input" :class="{ 'disable': isDisabled }" :disabled="isDisabled" placeholder="간단한 사유 입력" v-model="reportForm.description">
                        </div>
                    </label>

                </div>
            </div>

            <div class="modal-footer col-group">
                <button class="modal-footer-btn submit-btn" @click="submitReport()">
                    신고하기
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
props:["isReport","type","id"],


    data(){
        return {
            reportCategories:{
                data:[],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            reportForm : new Form(this.$axios,{
                reportable_id:this.id,
                reportable_type:this.type,
                report_category_id:"",
                description:"",
            }),
            isDisabled: true,
        }
    },

    methods: {
        getReportCategories(){
            this.$axios.get("/api/reportCategories", {
                params: this.reportForm.data(),
            }).then(response => {
                console.log(response.data);
                this.reportCategories = response.data;
            })
        },
        enable(num){
            if (num === 5) {
                this.isDisabled = false;  // 5번째 카테고리일 때만 입력 상자를 활성화
            } else {
                this.isDisabled = true;   // 그 외의 경우에는 입력 상자를 비활성화
            }
        },
        submitReport(){
            this.$store.commit("setLoading",true);
            this.reportForm.post("/api/reports").then(response => {

this.$emit("created");
            })
        },
    },

    computed: {

    },

    mounted() {
            this.getReportCategories();
    }
}
</script>
