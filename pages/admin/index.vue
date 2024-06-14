<template>
    <div class="admin-wrap">

    </div>

</template>

<script>
import Form from "@/utils/Form";
export default {
    middleware: ["admin"],

    layout: "admin",

    data(){
        return {
            counts : {
                deliveries : [],
                categories : {
                    count_quick : 0,
                    count_truck: 0,
                },
                orders: [],
            }
        }
    },
    methods: {
        getDashboard(){
            this.$axios.get("/api/admin/dashboard")
                .then(response => {
                    this.counts = response.data.data;

                    this.drawChart();
                })
        },

        drawChart(){
            const chart_1 = document.getElementById('chart_1').getContext('2d');

            new Chart(chart_1, {
                plugins: [ChartDataLabels],
                type: 'bar',
                data: {
                    labels: this.counts.deliveries.map(delivery => delivery.month),
                    datasets: [
                        {
                            label: '화물',
                            backgroundColor: '#E94F35',
                            data: this.counts.deliveries.map(delivery => delivery.count_truck),
                            datalabels: {
                                anchor: 'center',
                                align: 'center',
                            }
                        },
                        {
                            label: '퀵',
                            backgroundColor: '#231D4C',
                            data: this.counts.deliveries.map(delivery => delivery.count_quick),
                            datalabels: {
                                align: 'center',
                                anchor: 'center'
                            }
                        },
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function (value, context) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 17,
                                    family: 'Pretendard'
                                },
                                boxWidth: 22,
                                boxHeight: 22,
                            },
                            position: 'top',

                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 16,
                                    family: 'Pretendard'
                                },
                            }

                        },
                        y: {
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 16,
                                    family: 'Pretendard'
                                },
                                stepSize: 25000,
                            }
                        }
                    },
                },
            });

            const chart_2 = document.getElementById('chart_2').getContext('2d');

            new Chart(chart_2, {
                plugins: [ChartDataLabels],
                type: 'bar',
                data: {
                    labels: this.counts.orders.map(order => order.month),
                    datasets: [
                        {
                            label: '월결제',
                            backgroundColor: '#E94F35',
                            data: this.counts.orders.map(order => order.count_calculate),
                            datalabels: {
                                anchor: 'center',
                                align: 'center',
                            }
                        },
                        {
                            label: '선결제',
                            backgroundColor: '#231D4C',
                            data: this.counts.orders.map(order => order.count_uncalculate),
                            datalabels: {
                                align: 'center',
                                anchor: 'center'
                            }
                        },
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: 'white',
                            display: function (context) {
                                return context.dataset.data[context.dataIndex] > 15;
                            },
                            font: {
                                weight: 'bold'
                            },
                            formatter: function (value, context) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 17,
                                    family: 'Pretendard'
                                },
                                boxWidth: 22,
                                boxHeight: 22,
                            },
                            position: 'top'
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 16,
                                    family: 'Pretendard'
                                },
                            }

                        },
                        y: {
                            stacked: true,
                            ticks: {
                                font: {
                                    size: 16,
                                    family: 'Pretendard'
                                },
                                stepSize: 25000,
                            }
                        }
                    },
                },
            });

            const chart_3 = document.getElementById('chart_3').getContext('2d');

            new Chart(chart_3, {
                plugins: [ChartDataLabels],
                type: 'pie',
                data: {
                    labels: ['화물', '퀵'],
                    datasets: [
                        {
                            label: ['배송요청 건'],
                            backgroundColor: ['#E94F35', '#231D4C'],
                            data: [this.counts.categories.count_truck, this.counts.categories.count_quick],
                            datalabels: {
                                anchor: 'center',
                                align: 'center',
                            },
                            borderWidth: 0,
                        },
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold',
                                size: 20,
                            },
                            formatter: function (value, context) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 17,
                                    family: 'Pretendard'
                                },
                                boxWidth: 22,
                                boxHeight: 22,
                            },
                            position: 'bottom'
                        },
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            display: false,
                        }
                    },
                },
            });

        }
    },

    mounted() {

        // this.getDashboard();

    }
}
</script>
