<template>
    <div>

    </div>
</template>
<script>
import Form from "../utils/Form";

export default {
    props: ["form", "loading", "meta", "targetContents", "targetScroll"],
    data() {
        return {
            page: 1,
            finish: false,
            currentForm: this.form.data(),
            prevForm: this.form.data(),
        }
    },

    methods: {
        loadMore() {
            let scrollTop = $(this.targetScroll).scrollTop();

            let innerHeight = $(this.targetScroll).innerHeight();

            let scrollHeight = $(this.targetScroll).prop('scrollHeight');

            let scrollEnd = scrollTop + innerHeight >= scrollHeight;

            let self = this;

            if (!this.finish) {
                if(!this.loading){
                    if (this.page >= this.meta.last_page)
                        return this.finish = true;

                    if (scrollEnd) {
                        this.page += 1;

                        this.$emit("paginate", this.page);
                    }
                }

                setTimeout(function () {
                    self.loadMore();
                }, 500);
            }
        },
      detect(){


        if(this.meta.current_page==1){
          console.log('이거발동')
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
          }
          }

    },

    computed: {},

    watch: {
        "form": {
            deep: true,
            handler() {

                let prev = {
                    ...this.prevForm,
                    page: null
                }

                let current = {
                    ...this.currentForm,
                    page: null
                }

                this.prevForm = this.form.data();

                if (this.finish && prev != current) {
                    this.page = 1;

                    this.finish = false;

                    // this.loadMore();
                }
            }
        },
      meta: {
        handler(newMeta) {
          if (newMeta.current_page === 1 && newMeta.last_page > 1) {
            this.$nextTick(() => {
              this.detect();
            });
          } else if (this.observer) {
            // 조건에 맞지 않으면 기존 observer 제거
            this.observer.disconnect();
            this.observer = null;
          }
        },
        deep: true,
        immediate: true
      }
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

        $(this.targetScroll).scroll(this.loadMore);

    }
}
</script>
