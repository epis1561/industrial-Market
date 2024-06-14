<template>
    <div :class="`select-box input-type modal-line info-add-select-box ${active ? 'open' : ''}`">
        <button type="button" :class="`${value ? 'btn_select active' : 'btn_select'}`" @click="active = true">
            <p>{{selectedOption ? selectedOption.title : placeholder}}</p>
            <i class="xi-angle-down"></i>
        </button>
        <ul class="list_member">
            <li v-for="(option, index) in options" @click="select(option)" :key="index">
                <p>{{ option.title }}</p>
            </li>
        </ul>
    </div>
</template>
<script>


export default {
    props: {
        default: {
            default: ""
        },
        placeholder: {
            required: true,
        },
        options: {
            required: true,
            default() {
                return [];
            }
        }
    },
    data(){
        return {
            value: this.default,
            active: false,
        }
    },

    methods: {
        select(option){
            this.value = option.value;

            this.active = false;

            this.$emit("change", option.value);
        },
    },

    computed: {
        selectedOption(){
            return this.options.find(option => option.value === this.value);
        }
    },

    mounted() {


    }
}
</script>
