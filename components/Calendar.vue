<template>
    <div :id="id"></div>
</template>
<script>
export default {
    props: {
        default: {
            required: false,
        },
        id: {
            required: false,
            default: "datepicker"
        },
        maxDate:{
            default: () => {
                return null;
            }
        }
    },

    methods: {
        parse(date){
            return {
                year: date.getFullYear(),
                month : date.getMonth(),
                date: date.getDate()
            };
        },
    },

    watch: {
        "default" : {
            deep: true,
            handler(value){
                if(value) {
                    let parsedDate = this.parse(new Date(value));
                    $(`#${this.id} .datepicker--cell-day`).removeClass("-selected-");
                    $(`#${this.id} .datepicker--cell-day[data-date='${parsedDate.date}'][data-month='${parsedDate.month}'][data-year='${parsedDate.year}']`).addClass("-selected-");
                }
            }
        }
    },

    mounted() {
        let self = this;

        $('#' + this.id).datepicker({
            minDate: new Date(), // 현재 날짜 이전의 날짜를 선택할 수 없게 함
            maxDate: this.maxDate,
            beforeShowDay: function(date) {
                // 이전 날짜는 비활성화하여 회색으로 표시
                return [date.getTime() >= new Date().getTime(), ''];
            },
            onSelect: function (dateText, inst) {
                self.$emit("change", dateText);
                if(inst){
                    // self.setDateEl(inst);

                    // self.getSchedules(inst);
                }
            },
            onRenderCell: function (date, cellType) {

            },
            onChangeMonth: function(month, year){

            },
            defaultValue: self.default
        });

        if(this.default) {
            let parsedDate = this.parse(new Date(this.default));

            $(`#${this.id} .datepicker--cell-day[data-date='${parsedDate.date}'][data-month='${parsedDate.month}'][data-year='${parsedDate.year}']`).addClass("-selected-");
        }

    },

}
</script>