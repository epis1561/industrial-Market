<template>
    <pagination :meta="items.meta" @paginate="(page) => {form.page = page; filter()}" />
</template>
<script>
import Form from "../../utils/Form";
export default {

    data(){
        return {
            form: new Form(this.$axios, {
                page: 1,
                word: this.$route.query.word || "",
            }),

            items: {
                data: [],
                meta: {
                    current_page:1,
                    last_page:1
                }
            },

        }
    },

    methods: {
        filter(loadMore = false){
            this.form.page = loadMore ?  this.form.page + 1 : 1;

            this.$axios.get("/api/notices", {
                params: this.form.data()
            }).then(response => {
                if(loadMore)
                    return this.items = {
                        ...response.data,
                        data: [
                                ...this.items.data,
                                ...response.data.data,
                        ]
                    };

                this.items = response.data;
            });
        },
    },

    computed: {

    },
    watch: {
        "$store.state.language": {
            deep: true,
            handler(){
                this.filter();
            }
        }
    },
    mounted() {
        console.log(this.$route.query.word);
        this.filter();
    }
}
</script>