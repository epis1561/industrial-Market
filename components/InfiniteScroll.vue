<template>
    <div>

    </div>
</template>
<script>
import Form from "../utils/Form";
export default {
    props: ["loading", "meta", "targetContents", "targetScroll"],
    data(){
        return {
            page:1,
        }
    },

    methods: {
        loadMore() {
            let scrollTop = $(this.targetScroll).scrollTop();

            let innerHeight = $(this.targetScroll).innerHeight();

            let scrollHeight = $(this.targetScroll).prop('scrollHeight');

            let scrollEnd = scrollTop + innerHeight >= scrollHeight;

            let self = this;

            console.log(scrollEnd);

            if (this.page < this.meta.last_page) {
                if (scrollEnd && !this.loading) {
                    this.page += 1;

                    this.$emit("paginate", this.page);
                }

                setTimeout(function () {
                    self.loadMore();
                }, 500);
            }
        },
    },

    computed: {

    },

    watch: {

    },

    mounted() {
        // 맨처음 한번만 불러오는 부분이다.
        // 즉, 1페이지 정보가 너무 적게 들어오고 다음페이지넘어가는 수순밟기전에 이미끝인가싶을까봐
        // 2페이지분량을 뿌려주는느낌!

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.page += 1;

                    this.$emit("paginate", this.page);
                }
            });
        });

        const scrollListElement = document.querySelector(this.targetContents);


            observer.observe(scrollListElement);


        this.loadMore();
    }
}
</script>
