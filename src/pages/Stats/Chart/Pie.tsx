import React, {useEffect} from "react";
import {ChartItem} from "chart.js";
import {Chart, registerables} from 'chart.js'
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {
	getNumberAnnounce,
	getNumberFormation,
	getNumberProf,
	getNumberStudent
} from "../../../store/modules/Auth/authService";
import {
	setAnnounceNumber,
	setFormationNumber,
	setProfNumber,
	setStudentNumber
} from "../../../store/modules/Director/directorModule";

Chart.register(...registerables)
const Pie = () => {
	const formationNumber = useSelector((state:RootState)=>state.director.formationNumber)
	const announceNumber = useSelector((state:RootState)=>state.director.announceNumber)
	useEffect(() => {
		if (document.getElementById('myChart')) {
			init()
		} else {
			setTimeout(() => {
				init()
			}, 1000)
		}

	}, [])
	useEffect(()=>{
		getNumberFormation().then((res:any)=>setFormationNumber(res))
		getNumberAnnounce().then((el:any)=>setAnnounceNumber(el))
	},[])
	const init = () => {
		let ctx = document.getElementById('myChart');
		const data = {
			labels: [
				'عدد الاعلانات',
				'عدد التكوين',
			],
			datasets: [{
				label: 'الأعلانات',
				data: [formationNumber ,announceNumber ],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
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
		<div className={'chartPie'} style={{width:'40vw',height:'30vw'}}>  <canvas id="myChart"/></div>

		</div>
	)
}
export default Pie