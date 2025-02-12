<template>
    <div class="container">
        <h1>哮喘疾病数据可视化分析</h1>

        <div class="chart-container">
            <h2>年度发病率趋势（2018-2023）</h2>
            <div ref="lineChart" class="chart"></div>
        </div>

        <div class="chart-container">
            <h2>地区发病率分布</h2>
            <div ref="barChart" class="chart"></div>
        </div>

        <div class="chart-container">
            <h2>患者年龄分布</h2>
            <div ref="pieChart" class="chart"></div>
        </div>

        <div class="chart-container">
            <h2>哮喘发作诱因分析</h2>
            <div ref="scatterChart" class="chart"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const lineChart = ref(null);
const barChart = ref(null);
const pieChart = ref(null);
const scatterChart = ref(null);

// 生成模拟数据
const generateData = () => ({
    // 发病率趋势数据
    incidenceTrend: {
        years: [2018, 2019, 2020, 2021, 2022, 2023],
        rates: [4.2, 4.5, 4.8, 5.1, 5.3, 5.6]
    },

    // 地区分布数据
    regionalDistribution: [
        { name: '华北', value: 35 },
        { name: '华东', value: 28 },
        { name: '华南', value: 20 },
        { name: '华中', value: 15 },
        { name: '西部', value: 12 }
    ],

    // 年龄分布数据
    ageDistribution: [
        { value: 18, name: '0-12岁' },
        { value: 25, name: '13-18岁' },
        { value: 32, name: '19-30岁' },
        { value: 28, name: '31-50岁' },
        { value: 22, name: '51岁以上' }
    ],

    // 诱因数据
    triggers: [
        { name: '粉尘', value: 45 },
        { name: '花粉', value: 30 },
        { name: '冷空气', value: 25 },
        { name: '运动', value: 20 },
        { name: '压力', value: 18 }
    ]
});

// 初始化折线图
const initLineChart = () => {
    const data = generateData();
    const chart = echarts.init(lineChart.value);
    chart.setOption({
        xAxis: {
            type: 'category',
            data: data.incidenceTrend.years
        },
        yAxis: { type: 'value' },
        series: [{
            data: data.incidenceTrend.rates,
            type: 'line',
            smooth: true,
            areaStyle: {},
            name: '发病率 (%)'
        }],
        tooltip: { trigger: 'axis' }
    });
};

// 初始化柱状图
const initBarChart = () => {
    const data = generateData();
    const chart = echarts.init(barChart.value);
    chart.setOption({
        xAxis: {
            type: 'category',
            data: data.regionalDistribution.map(item => item.name)
        },
        yAxis: { type: 'value' },
        series: [{
            data: data.regionalDistribution.map(item => item.value),
            type: 'bar',
            itemStyle: { color: '#5470c6' }
        }]
    });
};

// 初始化饼图
const initPieChart = () => {
    const data = generateData();
    const chart = echarts.init(pieChart.value);
    chart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: '50%',
            data: data.ageDistribution,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
};

// 初始化散点图
const initScatterChart = () => {
    const data = generateData();
    console.log("散点图数据:", data.triggers); // 调试数据

    const chart = echarts.init(scatterChart.value);
    chart.setOption({
        xAxis: { 
            type: 'value', 
            name: '诱因强度' 
        },
        yAxis: { 
            type: 'value',
            name: '诱因影响值' 
        },
        series: [{
            symbolSize: value => value[1] * 3,
            data: data.triggers.map((item, index) => ({
                value: [index, item.value],
                name: item.name
            })),
            type: 'scatter'
        }],
        tooltip: {
            trigger: 'item',
            formatter: params => {
                return `${params.name}: ${params.value[1]}`;
            }
        }
    });
};

onMounted(() => {
    initLineChart();
    initBarChart();
    initPieChart();
    initScatterChart();

    // 响应式调整
    window.addEventListener('resize', () => {
        echarts.getInstanceByDom(lineChart.value)?.resize();
        echarts.getInstanceByDom(barChart.value)?.resize();
        echarts.getInstanceByDom(pieChart.value)?.resize();
        echarts.getInstanceByDom(scatterChart.value)?.resize();
    });
});


</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 40px;
}

.chart-container {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 30px;
}

.chart-container h2 {
    color: #666;
    margin-bottom: 15px;
    font-size: 1.2em;
}

.chart {
    height: 400px;
}

@media (max-width: 768px) {
    .chart {
        height: 300px;
    }
}
</style>