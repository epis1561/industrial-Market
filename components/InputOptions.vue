<template>
    <div class="m-table-wrap">
        <table class="m-table type01">
            <colgroup>
                <col style="width:28.66%;">
                <col style="width:28.66%;">
                <col style="width:28.66%;">
                <col style="width:14%;">
            </colgroup>
            <thead>
            <tr>
                <th>이름</th>
                <th>가격</th>
                <th>재고수</th>
                <th>
                    <button v-if="items.length === 0" type="button" class="btn btn-add" @click="add">
                        <i class="xi-plus"></i>
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in items" :key="item.id">
                <td>
                    <input type="text" placeholder="이름" v-model="items[index].title">
                </td>
                <td>
                    <input type="number" placeholder="가격" v-model="items[index].price">
                </td>
                <td>
                    <input type="number" placeholder="재고수" v-model="items[index].count">
                </td>
                <td>
                    <div class="btns">
                        <button type="button" class="btn btn-remove" @click="remove(index)">
                            <i class="xi-close"></i>
                        </button>

                        <button type="button" class="btn btn-add" @click="add">
                            <i class="xi-plus"></i>
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</template>
<style>
.m-table.type01 {
    width:100%;
}
.m-table.type01 th {
    padding:12px 12px;
    font-weight:400;
    background-color:#AEAEAE; color:#fff;
    border-left:4px solid white;
}
.m-table.type01 th:first-child {
    border-left:none;
}
.m-table.type01 th:last-child {
    background-color:transparent;
}
.m-table.type01 td {

    font-weight:400;
    background-color:#E4E4E4;
    border-top:4px solid white;
    border-left:4px solid white;
}
.m-table.type01 td:first-child {
    border-left:none;
}
.m-table.type01 td:last-child {
    background-color:#fff;
}
.m-table.type01 input {
    width:100%; height:100%;
    padding:12px 12px;
}
.m-table.type01 .btns {
    display: flex; gap:4px;
}
.m-table.type01 .btn {
    display: flex; align-items: center; justify-content: center;
    width:40px; height:40px;
    border:1px solid #e1e1e1;
}
.m-table.type01 .btn-remove {
    border-color:red; color:red;
}
.m-table.type01 .btn-remove i {
    color:red;
}
.m-table.type01 .btn-add {
    border-color:#007aff; color:#007aff;
}
.m-table.type01 .btn-add i {
    color:#007aff;
}
</style>
<script>
export default {
    props: {
        default: {
            default:() => {
                return [];
            }
        },
    },

    data(){
        return {
            items: this.default,
            remove_ids: [],
        }
    },

    methods: {
        add(){
            this.items.push({
                title: "",
                price: "",
                count: 99999999
            });
        },

        remove(index){
            if(this.items[index].id) {
                this.remove_ids.push(this.items[index].id);

                this.$emit("removed", this.remove_ids);
            }

            this.items.splice(index,1);
        }
    },

    watch:{
        items: {
            deep: true,
            handler(){
                this.$emit("change", this.items);
            }
        }
    },

    mounted() {

    }
}
</script>
