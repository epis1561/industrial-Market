<template>
    <div class="m-input-month-wrap">
        <div class="m-input">
            <input type="text" readonly @click="toggle" placeholder="연도-월" :value="formatValue">

            <i class="xi-calendar-check" @click="toggle"></i>
        </div>

        <div class="m-input-month type01" v-if="active">
            <div class="year">
                <button class="btn" @click="prev">
                    <i class="xi-angle-left"></i>
                </button>
                <h3 class="title">{{year}}</h3>
                <button class="btn" @click="next">
                    <i class="xi-angle-right"></i>
                </button>
            </div>

            <div class="months">
                <div class="month-wrap" v-for="month in months" :key="month">
                    <div :class="monthClass(month)" @click="select(month)">{{month}}월</div>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
.m-input-month-wrap {
    position:relative;
}
.m-input-month-wrap .m-input {
    width:195px;
    position:relative;
}
.m-input-month-wrap .m-input i {
    position:absolute; right:10px; top:50%; transform: translateY(-50%);
    cursor:pointer;
}
.m-input-month-wrap .m-input input {
    width:100%; height: 52px;
    border: 2px solid #d8d8d8;
    border-radius: 4px;
    padding: 0 16px;
    font-size: 16px;
    color: #333;
    cursor:pointer;
}

.m-input-month.type01 {
    width:300px; padding:35px;
    position: absolute; top:calc(100% + 10px); left:0;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    background-color:#fff;
    z-index:2;
}

.m-input-month.type01 .year {
    display: flex; align-content: center; justify-content: space-between;
    padding-bottom:12px; margin-bottom:12px;
    border-bottom:1px solid #707070;
}
.m-input-month.type01 .year i {
    font-size:18px;
    color:#AEAEAE;
}
.m-input-month.type01 .year .title {
    font-size:14px; font-weight:bold;
}
.m-input-month.type01 .months {
    display: flex; flex-wrap:wrap;
    margin:-14px -4px;
}
.m-input-month.type01 .month-wrap {
    width:33.33%;
    padding:14px 4px;
}
.m-input-month.type01 .month {
    padding:10px 0;
    font-size:14px; font-weight:500; text-align: center;
    color:#000;
    cursor:pointer;
    transition: all .3s; border-radius:3px;
}
.m-input-month.type01 .month.active {
    background-color:#0091F0; color:#fff;
}
.m-input-month.type01 .month:hover {
    background-color:#0091F0; color:#fff;
}
.m-input-month.type01 .month.disabled {
    color:#ccc; cursor:default;
}
.m-input-month.type01 .month.disabled:hover {
    color:#ccc; background-color:#fff;
}

@media screen and (max-width: 1024px){
    .m-input-month-wrap .m-input input {
        height: 40px;
        border: 1px solid #d8d8d8;
        padding: 0 8px;
        font-size: 14px;
    }

}
</style>
<script>
export default {
    props: {
        default: {
            default: null
        },
        min: {
            default: ""
        },
        max: {
            default: ""
        },
        disables: {
            default() {
                return [];
            }
        },
        needFromToEnd: {
            default : false,
        },
    },

    data(){
        return {
            year: (new Date()).getFullYear(),
            month: "",
            active: false,
            value: "",
        }
    },

    methods: {
        prev(){
            this.year -= 1;
        },

        next(){
            this.year += 1;
        },

        select(month){
            if(this.canSelect(month)){
                this.month = month;

                this.value = `${this.year}-${this.month < 10 ? '0' + this.month : this.month}-01`;

                this.$emit("change", this.value);

                this.active = false;
            }
        },

        monthClass(month){
            let className = "month";
            let date = this.getDate(month);

            if(this.value === date)
                className += " active";

            if(this.canSelect(month) === false)
                className += " disabled";

            return className
        },

        canSelect(month){
            let date = this.getDate(month);

            return this.canSelectDates.includes(date);
        },

        getDate(month){
            return this.year + '-' + (month < 10 ? '0' + month : month) + '-01';
        },

        getFormatDate(date){
            let year = date.getFullYear();
            let month = date.getMonth() + 1;

            if(month < 10)
                month = "0" + month;

            let day = "01";

            return `${year}-${month}-${day}`;
        },

        toggle(){
            if(this.needFromToEnd && !this.min)
                return alert("시작일자를 먼저 선택해주세요.");

            this.active = !this.active;
        },

    },

    computed: {
        hasLimit(){
            return this.min && this.max;
        },

        canSelectDates(){
            let current = new Date(this.min);
            let finish = new Date(this.max);
            let disable = null;
            let items = [];

            // 상시모집이라면 일단 1월 ~ 12월 다 열기
            if(!this.hasLimit){
                if(!this.min) {
                    current = new Date();
                    current.setFullYear(this.year);
                    current.setMonth(0);
                }

                finish = new Date();
                finish.setFullYear(this.year);
                finish.setMonth(11);

                console.log(this.getFormatDate(finish));
            }

            if(this.needFromToEnd && this.disables.length > 0) {
                current.setDate(1);

                disable = this.disables.find(disableData => {
                    disable = new Date(disableData);
                    disable.setDate(1);

                    if(current <= disable)
                        return true;

                    return false;
                });

                if(!disable)
                    disable = finish;

                disable = new Date(disable);

                disable.setDate(1);

                finish = disable;
            }

            finish.setDate(1);
            current.setDate(1);

            while (this.getFormatDate(current) <= this.getFormatDate(finish)){
                items.push(new Date(current));

                current.setMonth(current.getMonth() + 1);
            }

            return items.map(item => this.getFormatDate(item)).filter(item => this.disables.includes(item) === false);
        },

        months(){
            let items = [];

            for(let i = 1; i <= 12; i++){
                items.push(i);
            }

            return items;
        },

        formatValue(){
            if(!this.value)
                return "";

            return this.value.slice(0, 7);
        }
    },

    watch: {
        min(){
            if(this.needFromToEnd)
                this.value = "";
        }
    },

    mounted() {
        if(this.default){
            let date = new Date(this.default);

            this.value = this.default;
            this.year = date.getFullYear();
            this.month = date.getMonth();
        }
    }
}
</script>
