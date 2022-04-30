import React, {useEffect} from "react";
import {ChartItem} from "chart.js";
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)
const Pie = () => {

	useEffect(() => {
		if (document.getElementById('myChart')) {
			init()
		} else {
			setTimeout(() => {
				init()
			}, 1000)
		}

	}, [])

	const init = () => {
		let ctx = document.getElementById('myChart');
		const data = {
			labels: [
				'Red',
				'Blue',
				'Yellow'
			],
			datasets: [{
				label: 'My First Dataset',
				data: [300, 50, 100],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)'
				],
				hoverOffset: 4
			}],
		};
		new Chart(ctx as ChartItem, {
			type: 'pie',
			data: data,
			options: {

			}
		});
	}
	return (
		<div className={'stats'}>
		<div className={'chartPie'} style={{width:'30vw',height:'30vw'}}>  <canvas id="myChart"/></div>

		</div>
	)
}
export default Pie