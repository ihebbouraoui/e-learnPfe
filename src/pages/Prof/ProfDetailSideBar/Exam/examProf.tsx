import React, {useEffect, useState} from "react";
import TabForm from "../../../../component/Tableau/tableauxForm";
import {examTabConst} from "./examProfConst";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {HomeWorkTab} from "../HomeWork/homeWorkConst";
import {getToDoProfExam, getToDoProfTest} from "../../../../store/modules/Prof/profService";
const ExamProf=()=>{
	const prof_Selected=useSelector((state:RootState)=>state.prof.selected_Prof)
	const [tableModel, setTableModel] = useState(examTabConst)
	useEffect(()=>{
		getToDoProfExam({id_Prof:prof_Selected._id}).then((res:any)=>{
			initTable(res)
		})
	},[])

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			title:item.title,
			name:item.subject?.title,
		}))
		setTableModel({...temp})
	}


	return(
		<div>
			<TabForm filterData={{...tableModel}}/>
		</div>
	)
}
export default ExamProf