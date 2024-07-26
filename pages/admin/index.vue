<template>
    <div id="wrap">
        <div class="admin-container">


            <div class="admin-wrap">

                <div class="title-wrap col-group">
                    <div class="main-title-wrap col-group">
                        <h2 class="main-title">
                            산업마켓 관리자
                        </h2>
                    </div>
                </div>

                <div class="dashboard-wrap">
                    <div class="dashboard-group">
                        <div class="dashboard-item">
                            <div class="dashboard-title-wrap">
                                <h3 class="title">
                                    월별 가입자수
                                </h3>
                            </div>

                            <div class="dashboard-chart">
                                <canvas id="chart_1" style="min-height:350px;"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-group">
                        <div class="dashboard-item flex-2">
                            <div class="dashboard-title-wrap">
                                <h3 class="title">
                                    관심키워드 TOP 10
                                </h3>
                            </div>

                            <div class="dashboard-chart">
                                <canvas id="chart_2" style="min-height:350px;"></canvas>
                            </div>
                        </div>
                        <div class="dashboard-item flex-1">
                            <div class="dashboard-title-wrap">
                                <h3 class="title">
                                    등록상품수
                                </h3>
                            </div>

                            <div class="dashboard-chart">
                                <canvas id="chart_3"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <empty v-if="items.data.length === 0" />


    </div>
</template>

<style>
.admin-container .dashboard-group {
    display: flex; gap:40px;
    width: 100%;
    margin-bottom:40px;
}
.admin-container .dashboard-item {
    flex:1;
    padding:40px;
    border:1px solid #e1e1e1; border-radius:5px;
}
.admin-container .dashboard-item .title {
    margin-bottom:8px;
    font-size:24px; font-weight:bold;
}
.admin-container .flex-2 {
    flex:2 !important;
}
.admin-container .flex-1 {
    flex:1 !important;
}
</style>
<script>
import Form from "@/utils/Form";
export default {
    middleware: ["admin"],
    layout: "admin",

    components: {},

    data() {
        return {
            items: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1
                }
            },

            form: new Form(this.$axios, {
                page: 1,
                word: "",
                type: "",
            }),
        }
    },

    methods: {
        chart() {
            const chart_1 = document.getElementById('chart_1').getContext('2d');
            const labels = this.items.data.countUserByMonths.map(item => item.title);
            const data = this.items.data.countUserByMonths.map(item => item.count);
            new Chart(chart_1, {
                plugins: [ChartDataLabels],
                type: 'bar',

                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '가입자수',
                            backgroundColor: '#FFD500',
                            data:data,
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
            const keyword_labels = this.items.data.countKeywords.map(item => item.title);
            const keyword_data = this.items.data.countKeywords.map(item => item.count);
            new Chart(chart_2, {
                plugins: [ChartDataLabels],
                type: 'bar',
                data: {
                    labels: keyword_labels,
                    datasets: [
                        {
                            label: '키워드',
                            backgroundColor: '#2f83f7',
                            data: keyword_data,
                            datalabels: {
                                anchor: 'center',
                                align: 'center',
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
            const products_labels = this.items.data.countProducts.map(item => item.title);
            const products_data = this.items.data.countProducts.map(item => item.count);
            new Chart(chart_3, {
                plugins: [ChartDataLabels],
                type: 'pie',
                data: {
                    labels: products_labels,
                    datasets: [
                        {
                            label: ['상품수'],
                            backgroundColor: ['#484848','#2f83f7','#FFD500'],
                            data: products_data,
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
        },
        filter(){
            this.$axios.get("/api/admin/dashboard", {
                params: this.form.data()
            }).then(response => {
                this.items = response.data;
                this.chart();
                console.log(this.items);
            });
        },
    },


    computed: {


    },

    mounted() {
        this.filter();

    }
}
</script>
