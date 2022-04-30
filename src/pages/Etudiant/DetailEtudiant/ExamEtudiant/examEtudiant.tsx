import React, {useEffect, useState} from "react";
import TabForm from "../../../../component/Tableau/tableauxForm";
import {examEtudiantTab} from "./examEtudiantConst";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {getClassById, getToDoExam, getToDoTest} from "../../../../store/modules/Student/studentService";
import {HomeWordEtudiantTab} from "../HomeWorkEtudiant/homeWorkEtudiantConst";
const ExamEtudiant=()=>{
	const select=useSelector((state:RootState)=>state.student.selected_user)
	const classUser=useSelector((state:RootState)=>state.student.class_user)
	const [tableModel, setTableModel] = useState(HomeWordEtudiantTab)
	useEffect(()=>{
		getClassById({_id:select._id}).then()
	},[])

	useEffect(()=>{
		getToDoExam({id_Class:classUser?._id}).then((res:any)=>{
			initTable(res)
			console.log(res)
		})
	},[])
	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			title:item.title,
			name:item.idProf?.name,
			subject:item.subject?.title
		}))
		setTableModel({...temp})
	}

	return(
		<div>
			<TabForm filterData={{...tableModel}}/>

		</div>
	)
}
export default ExamEtudiant