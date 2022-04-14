<template>
  <div class="chart-container">
    <div class="line-chart-1" style="width: 800px; height: 400px">
      <canvas ref="line1" width="800" height="400"></canvas>
    </div>
    <div class="bar-chart-1" style="width: 800px; height: 400px">
      <canvas ref="bar1" width="800" height="400"></canvas>
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
  SubTitle,
} from "chart.js";
import "chartjs-adapter-luxon";
import * as Utils from "@/utils/chartUtils";
import { fontString } from "chart.js/helpers";

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
    this.drawBar1();
  },
  methods: {
    drawLine1() {
      const ctx = this.$refs.line1;
      const DATA_COUNT = 12;
      const labels = [];
      for (let i = 0; i < DATA_COUNT; ++i) {
        labels.push(i.toString());
      }
      const datapoints = [
        0,
        20,
        20,
        60,
        60,
        120,
        NaN,
        180,
        120,
        125,
        105,
        110,
        170,
      ];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Cubic interpolation (monotone)",
            data: datapoints,
            borderColor: Utils.CHART_COLORS.red,
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          },
          {
            label: "Cubic interpolation",
            data: datapoints,
            borderColor: Utils.CHART_COLORS.blue,
            fill: false,
            tension: 0.4,
          },
          {
            label: "Linear interpolation (default)",
            data: datapoints,
            borderColor: Utils.CHART_COLORS.green,
            fill: false,
          },
        ],
      };
      this.line1 = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Chart.js Line Chart - Cubic interpolation mode",
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Value",
              },
              suggestedMin: -10,
              suggestedMax: 200,
            },
          },
          hover: {
            animationDuration: 0, // 防止鼠标移上去，数字闪烁
          },
          transitions: {
            active: {
              animation: {
                duration: 0,
              },
            },
          },
          animation: {
            onProgress: function ({ chart, currentStep, initial, numSteps }) {
              const ctx = chart.ctx;
              // 以下属于canvas的属性(font、fillStyle、textAlign...)
              ctx.font = fontString(
                Chart.defaults.font.size,
                Chart.defaults.font.style,
                Chart.defaults.font.family
              );
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              this.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                meta.data.forEach(function (d, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, d.x, d.y - 5);
                });
              });
            },
            onComplete: function ({ chart, currentStep, initial, numSteps }) {
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
            },
          },
        },
      });
    },
    drawBar1() {
      const ctx = this.$refs.bar1;
      const s = [
        { name: 2, count: 5 },
        { name: 29, count: 5 },
        { name: 40, count: 5 },
        { name: 3, count: 4 },
        { name: 21, count: 4 },
        { name: 41, count: 4 },
        { name: 6, count: 3 },
        { name: 10, count: 3 },
        { name: 11, count: 3 },
        { name: 12, count: 3 },
        { name: 13, count: 3 },
        { name: 14, count: 3 },
        { name: 32, count: 3 },
        { name: 35, count: 3 },
        { name: 36, count: 3 },
        { name: 39, count: 3 },
        { name: 45, count: 3 },
        { name: 47, count: 3 },
        { name: 1, count: 2 },
        { name: 7, count: 2 },
        { name: 15, count: 2 },
        { name: 16, count: 2 },
        { name: 17, count: 2 },
        { name: 19, count: 2 },
        { name: 20, count: 2 },
        { name: 23, count: 2 },
        { name: 27, count: 2 },
        { name: 30, count: 2 },
        { name: 34, count: 2 },
        { name: 46, count: 2 },
        { name: 49, count: 2 },
        { name: 18, count: 1 },
        { name: 22, count: 1 },
        { name: 25, count: 1 },
        { name: 26, count: 1 },
        { name: 28, count: 1 },
        { name: 31, count: 1 },
        { name: 33, count: 1 },
        { name: 42, count: 1 },
        { name: 43, count: 1 },
        { name: 44, count: 1 },
        { name: 48, count: 1 },
        { name: 4, count: 0 },
        { name: 5, count: 0 },
        { name: 8, count: 0 },
        { name: 9, count: 0 },
        { name: 24, count: 0 },
        { name: 37, count: 0 },
        { name: 38, count: 0 },
      ];
      const labels = s.map((d) => d.name);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Dataset 1",
            data: s.map((d) => d.count),
            borderColor: Utils.CHART_COLORS.red,
            backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          },
        ],
      };

      this.bar1 = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Chart.js Bar Chart",
            },
          },
          scales: {
            x: {
                display: true,
                ticks: {
                  autoSkip: false,
                },
            }
          },
          transitions: {
            active: {
              animation: {
                duration: 0,
              },
            },
          },
          animation: {
            onProgress: function ({ chart, currentStep, initial, numSteps }) {
              const ctx = chart.ctx;
              // 以下属于canvas的属性(font、fillStyle、textAlign...)
              ctx.font = fontString(
                Chart.defaults.font.size,
                Chart.defaults.font.style,
                Chart.defaults.font.family
              );
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              this.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                meta.data.forEach(function (d, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, d.x, data >= 0 ? d.y - 5 : d.y + 15);
                });
              });
            },
          },
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>