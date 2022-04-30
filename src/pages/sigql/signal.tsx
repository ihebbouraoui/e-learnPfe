import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {historyTabConst} from "../history/historyTabConst";
import {
	blockDelete,
	deleteHistory,
	deleteWithMail,
	getHistory,
	getHistoryById
} from "../../store/modules/Director/directorService";
import TabForm, {btnInetrface} from "../../component/Tableau/tableauxForm";
import ModalComp from "../../component/Modal/modalComp";
import {getSignal} from "../../store/modules/Announce/announceService";
import {signalTabConst} from "./siganConst";

const Signal=()=>{
	const [tableModel, setTableModel] = useState(signalTabConst)
	useEffect(()=>{
		getSignal().then((res:any)=>{
			initTable(res)
		})
	},[])



	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			date: item?.date,
			SignalFrom: item?.SignalFrom?.name,
			userToSignal: item?.userToSignal.name,
			data:item?.data
		}))
		setTableModel({...temp})
	}
	return(
		<div className={'directorMain'}>
			<TabForm filterData={{...tableModel   }}/>

		</div>
	)
}
export default Signal