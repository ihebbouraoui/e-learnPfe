import React, {useEffect} from "react";
import {ChartItem} from "chart.js";
import {Chart, registerables} from 'chart.js'
Chart.register(...registerables)

const BarAbon=()=>{

	useEffect(() => {
		if (document.getElementById('myChartBar3')) {
			init()
		} else {
			setTimeout(() => {
				init()
			}, 1000)
		}

	}, [])
	const init = () => {
		let ctx = document.getElementById('myChartBar3');
		const data = {
			labels: [
				'Red',
				'Blue',
				'Yellow'
			],
			datasets: [{
				label: 'احصائيات الاشتراكات',
				data: [456, 456, 123],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)'
				],
				hoverOffset: 4
			}],
		};
		new Chart(ctx as ChartItem, {
			type: 'bar',
			data: data,
			options: {

			}
		});
	}
	return (
		<div className={'stats'}>
			<div className={'chartPie'} style={{maxWidth:'25vw', height: 'fit-content'}}>  <canvas id="myChartBar3"/></div>

		</div>
	)

}
export default BarAbon