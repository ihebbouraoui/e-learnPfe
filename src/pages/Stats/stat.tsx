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
		<div className={'stat'} style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
			<BarWin/>
			<Pie/>
		</div>
	)

}

export default Stat