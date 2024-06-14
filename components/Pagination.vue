<template>
    <div id="pagination">
        <div class="pagination col-group">
            <a href="" class="page-btn" @click.prevent="prev">
                <i class="xi-angle-left-min"></i>
            </a>
            <a href="#" @click.prevent="paginate(page)" :class="pageClass(page)" v-for="page in pages" :key="page">
                {{page}}
            </a>
            <a href="" class="page-btn" @click.prevent="next">
                <i class="xi-angle-right-min"></i>
            </a>
        </div>
    </div>
</template>
<style>
.paging-box {
    margin-top: 40px;
}

.paging-box ul {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.paging-box li a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
}

.paging-box li.active a {
    background-color: black;
    color: #fff;
}
</style>
<script>
export default {
    props: ["meta"],

    data() {
        return {
            pageSections: []
        }
    },

    computed: {
        pages() {
            return this.pageSections.find(pageSection => {
                if (pageSection.includes(this.meta.current_page))
                    return true;
            })
        },
    },

    mounted() {
        this.setPages();
    },

    methods: {
        pageClass(page) {
            return this.meta.current_page == page
                    ? "page-btn active"
                    : "page-btn";
        },

        paginate(page) {
            this.$emit("paginate", page);

            $("html, body").scrollTop(0);
        },

        first() {
            this.paginate(1);
        },

        prev() {
            if (this.meta.current_page > 1)
                this.paginate(parseInt(this.meta.current_page) - 1);
        },

        next() {
            if (this.meta.current_page < this.meta.last_page)
                this.paginate(parseInt(this.meta.current_page) + 1);
        },

        last() {
            this.paginate(this.meta.last_page);
        },

        setPages() {
            let unit = 10;

            let items = [];

            this.pageSections = [];

            for (let i = 1; i <= this.meta.last_page; i++) {
                items.push(i);

                if (items.length >= unit || i == this.meta.last_page) {
                    this.pageSections.push(items);
                    items = [];
                }
            }
        }
    },

    watch: {
        'meta': {
            deep: true,
            handler() {
                this.setPages();
            }
        },

    }
}
</script>
