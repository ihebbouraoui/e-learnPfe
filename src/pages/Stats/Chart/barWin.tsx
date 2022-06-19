import React, {useEffect} from "react";
import {ChartItem} from "chart.js";
import {Chart, registerables} from 'chart.js'
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {setProfNumber, setStudentNumber} from "../../../store/modules/Director/directorModule";
import {getNumberProf, getNumberStudent} from "../../../store/modules/Auth/authService";
Chart.register(...registerables)

const BarWin=()=>{
	const profNumber = useSelector((state:RootState)=>state.director.profNumber)
	const studentNumber = useSelector((state:RootState)=>state.director.studentNumber)
	useEffect(() => {
		if (document.getElementById('myChartBar1')) {
			init()
		} else {
			setTimeout(() => {
				init()
			}, 1000)
		}

	}, [])
	useEffect(()=>{
		getNumberProf().then((res:any)=>setProfNumber(res))
		getNumberStudent().then((el:any)=>setStudentNumber(el))
	},[])
	const init = () => {
		let ctx = document.getElementById('myChartBar1');
		const data = {
			labels: [
				'عدد الاستاذة',
				'عدد الطلبة',
			],
			datasets: [{
				label: 'عدد المسجلين',
				data: [profNumber, studentNumber],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
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
			<div className={'chartPie'} style={{width:'40vw', height: 'fit-content'}}>  <canvas id="myChartBar1"/></div>

		</div>
	)
}
export default BarWin