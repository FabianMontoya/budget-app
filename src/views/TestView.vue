<script setup lang="ts">
import { ref } from 'vue';

const seriesChart1 = ref([
	{
		name: 'series-1',
		data: [30, 40, 45, 50, 49, 60, 70, 91]
	}
]);
const optionsChart1 = ref({
	xaxis: {
		categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
	}
});

const seriesChart2 = ref([
	{
		name: 'TEAM A',
		type: 'column',
		data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
	},
	{
		name: 'TEAM B',
		type: 'area',
		data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
	},
	{
		name: 'TEAM C',
		type: 'line',
		data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
	}
]);

const optionsChart2 = ref({
	chart: {
		height: 350,
		type: 'line',
		stacked: false
	},
	stroke: {
		width: [0, 2, 5],
		curve: 'smooth'
	},
	plotOptions: {
		bar: {
			columnWidth: '50%'
		}
	},

	fill: {
		opacity: [0.85, 0.25, 1],
		gradient: {
			inverseColors: false,
			shade: 'light',
			type: 'vertical',
			opacityFrom: 0.85,
			opacityTo: 0.55,
			stops: [0, 100, 100, 100]
		}
	},
	labels: [
		'01/01/2003',
		'02/01/2003',
		'03/01/2003',
		'04/01/2003',
		'05/01/2003',
		'06/01/2003',
		'07/01/2003',
		'08/01/2003',
		'09/01/2003',
		'10/01/2003',
		'11/01/2003'
	],
	markers: {
		size: 0
	},
	xaxis: {
		type: 'datetime'
	},
	yaxis: {
		title: {
			text: 'Points'
		},
		min: 0
	},
	tooltip: {
		shared: true,
		intersect: false,
		y: {
			formatter: function (y: any) {
				if (typeof y !== 'undefined') {
					return y.toFixed(0) + ' points';
				}
				return y;
			}
		}
	}
});

const seriesChart3 = ref([
	{
		name: 'series1',
		data: [31, 40, 28, 51, 42, 109, 100]
	},
	{
		name: 'series2',
		data: [11, 32, 45, 32, 34, 52, 41]
	}
]);

const optionsChart3 = ref({
	chart: {
		height: 350,
		type: 'area'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
		type: 'datetime',
		categories: [
			'2018-09-19T00:00:00.000Z',
			'2018-09-19T01:30:00.000Z',
			'2018-09-19T02:30:00.000Z',
			'2018-09-19T03:30:00.000Z',
			'2018-09-19T04:30:00.000Z',
			'2018-09-19T05:30:00.000Z',
			'2018-09-19T06:30:00.000Z'
		]
	},
	tooltip: {
		x: {
			format: 'dd/MM/yy HH:mm'
		}
	}
});
</script>

<template>
	<section>
		<h1>This is the test page</h1>

		<el-divider></el-divider>

		<RouterLink :to="{ name: 'login' }"><span>Go to Login</span></RouterLink>

		<el-divider></el-divider>

		<div class="mb-5 mt-5 flex flex-col gap-10">
			<div>
				<apexchart type="bar" width="500" :options="optionsChart1" :series="seriesChart1"></apexchart>
			</div>

			<div>
				<apexchart type="line" height="350" :options="optionsChart2" :series="seriesChart2"></apexchart>
			</div>

			<div class="max-w-xl">
				<apexchart type="area" height="350" :options="optionsChart3" :series="seriesChart3"></apexchart>
			</div>
		</div>
	</section>
</template>
