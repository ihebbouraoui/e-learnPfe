import React, {useEffect} from "react";
import './stats.css'
import {ChartItem} from "chart.js";
import {Chart, registerables} from 'chart.js'
import Pie from "./Chart/Pie";
import BarWin from "./Chart/barWin";
import BarSell from "./Chart/BarSell";
import BarAbon from "./Chart/BarAbon";
import './stats.css'

Chart.register(...registerables)
const Stat = () => {
	return (
		<div className={'stat'}>
			<div className={'bar'}>
				<div><BarWin/></div>
				<div><BarSell/></div>
				<div><BarAbon/></div>
			</div>

			<Pie/>

		</div>
	)

}

export default Stat