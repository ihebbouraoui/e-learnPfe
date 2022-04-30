import React, {useEffect, useState} from "react";
import FilterForm from "../../../component/Filter/filterForm";
import {RessourceFormConst, ressourceTab} from "./RessourceConst";
import TabForm, {btnInetrface} from "../../../component/Tableau/tableauxForm";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {deleteSubject, getSubject} from "../../../store/modules/Setting/settingService";
import {chapterTab} from "../Chapter/ChapterConsst";


const Ressources = () => {
	const deleteRes = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				console.log('DETAIL')
				console.log(chapterTab.data[data.index])
				break;
			case 'delete':
				deleteSubject(list_Subject[data.index]._id).then((res:any)=>{
					getSubject().then((res:any)=>{
						initTable(res)
					})
				})
				break;
		}
	}
	const list_Subject=useSelector((state:RootState)=>state.setting.list_Subject)
	const [tableModel, setTableModel] = useState(ressourceTab)

	useEffect(()=>{
		getSubject().then((res:any)=>{
			initTable(res)
		})

	},[])
	useEffect(()=>{
		initTable(list_Subject)
	},[list_Subject])

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item:any) => ({
			title:item.title,
		}))
		setTableModel({...temp})
	}
	return (
		<div className={'directorMain'}>
			<FilterForm filterData={RessourceFormConst}/>
			<TabForm filterData={{...tableModel, sendEventToParent: deleteRes}}/>
		</div>
	)

}
export default Ressources