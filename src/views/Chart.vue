<template>
    <div class="chart-container">
        <div class="line-chart-1" style="width: 800px;height: 400px;">
            <canvas ref="line1" width="800" height="400"></canvas>
        </div>
    </div>
</template>
<script>
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import 'chartjs-adapter-luxon';
import * as Utils from '@/utils/chartUtils';
import { fontString } from 'chart.js/helpers';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

export default {
    mounted() {
        this.drawLine1();
    },
    methods: {
        drawLine1() {
            const ctx = this.$refs.line1;
            const DATA_COUNT = 12;
            const labels = [];
            for (let i = 0; i < DATA_COUNT; ++i) {
                labels.push(i.toString());
            }
            const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
            const data = {
                labels: labels,
                datasets: [
                    {
                    label: 'Cubic interpolation (monotone)',
                    data: datapoints,
                    borderColor: Utils.CHART_COLORS.red,
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                    }, {
                    label: 'Cubic interpolation',
                    data: datapoints,
                    borderColor: Utils.CHART_COLORS.blue,
                    fill: false,
                    tension: 0.4
                    }, {
                    label: 'Linear interpolation (default)',
                    data: datapoints,
                    borderColor: Utils.CHART_COLORS.green,
                    fill: false
                    }
                ]
            };
            this.line1 =  new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart - Cubic interpolation mode'
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Value'
                            },
                            suggestedMin: -10,
                            suggestedMax: 200
                        }
                    },
                    hover: {
                        animationDuration: 0 // 防止鼠标移上去，数字闪烁
                    },
                    transitions: {
                        active: {
                            animation: {
                                duration: 0
                            }
                        },
                    },
                    animation: {
                        onProgress: function({ chart, currentStep, initial, numSteps}) {
                            const ctx = chart.ctx;
                            // 以下属于canvas的属性(font、fillStyle、textAlign...)
                            ctx.font = fontString(
                                Chart.defaults.font.size, 
                                Chart.defaults.font.style, 
                                Chart.defaults.font.family
                            );
                            ctx.fillStyle = "black";
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chart.getDatasetMeta(i);
                                meta.data.forEach(function (d, index) {
                                    var data = dataset.data[index];
                                    ctx.fillText(data, d.x, d.y-5);
                                });
                            })
                        },
                        onComplete: function({ chart, currentStep, initial, numSteps}) {
                            // const ctx = chart.ctx;
                            // // 以下属于canvas的属性(font、fillStyle、textAlign...)
                            // ctx.font = fontString(
                            //     Chart.defaults.font.size, 
                            //     Chart.defaults.font.style, 
                            //     Chart.defaults.font.family
                            // );
                            // ctx.fillStyle = "black";
                            // ctx.textAlign = 'center';
                            // ctx.textBaseline = 'bottom';
                            // this.data.datasets.forEach(function (dataset, i) {
                            //     var meta = chart.getDatasetMeta(i);
                            //     meta.data.forEach(function (d, index) {
                            //         var data = dataset.data[index];
                            //         ctx.fillText(data, d.x, d.y-5);
                            //     });
                            // })
                        }
                    },
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
</style>