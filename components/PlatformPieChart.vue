<template>
    <canvas :id="id" :class="className"></canvas>
</template>
<script>
export default {
    props: {
        blog: {
            default: 0,
        },
        instagram: {
            default: 0,
        },
        youtube: {
            default:0,
        },

        id: {
            default: "chart"
        },
        className: {
            default : "",
        }
    },

    data(){
        this.chart = null; // 이렇게 넣어야 에러 안남

        return {
            // chart: null, 이렇게 넣으면 에러나고
        }
    },

    watch:{
        blog: {
            handler(){
                this.draw();
            }
        },
        youtube: {
            handler(){
                this.draw();
            }
        },
        instagram: {
            handler(){
                this.draw();
            }
        },
    },

    methods:{
        draw(){
            const chart = document.getElementById(this.id);

            if(this.chart)
                this.chart.destroy();

            this.chart = new Chart(chart, {
                type: 'doughnut',
                data:{
                    labels: ['블로그', '인스타그램', '유튜브'],
                    datasets: [
                        {
                            label: '캠페인',
                            data: [
                                this.blog,
                                this.instagram,
                                this.youtube,
                            ],
                            borderWidth: 0,
                            backgroundColor: ['#00c13a', '#6742d3', '#e5211a',],
                        },
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        },
    },

    mounted() {
        this.draw();
    }
}
</script>