import React, {useEffect, useState} from "react";
import FilterForm from "../../../component/Filter/filterForm";

import {chapterTab, SeasonFormConst} from "./ChapterConsst";
import TabForm, {btnInetrface} from "../../../component/Tableau/tableauxForm";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getClass} from "../../../store/modules/Setting/settingService";

const Chapters = () => {

	const deleteChap = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				console.log('DETAIL')
				console.log(chapterTab.data[data.index])
				break;
			case 'delete':
				console.log('qsd')
				break;
		}
	}


	const list_Class=useSelector((state:RootState)=>state.setting.list_Class)
	const [tableModel, setTableModel] = useState(chapterTab)

	useEffect(()=>{
		getClass().then((res:any)=>{
			initTable(res)
		})

	},[])
	useEffect(()=>{
		initTable(list_Class)
	},[list_Class])

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item:any) => ({
			title:item.title,
		}))
		setTableModel({...temp})
	}
	return (
		<div className={'qsd'}>
			<FilterForm filterData={SeasonFormConst}/>
			<TabForm filterData={{...tableModel, sendEventToParent: deleteChap}}/>
		</div>
	)

}
export default Chapters