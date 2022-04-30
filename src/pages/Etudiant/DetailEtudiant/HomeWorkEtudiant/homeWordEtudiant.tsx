import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {getClassById, getToDoTest} from "../../../../store/modules/Student/studentService";
import {HomeWordEtudiantTab} from "./homeWorkEtudiantConst";
import TabForm from "../../../../component/Tableau/tableauxForm";
const HomeWordEtudiant=()=>{
	const select=useSelector((state:RootState)=>state.student.selected_user)
	const classUser=useSelector((state:RootState)=>state.student.class_user)
	const [tableModel, setTableModel] = useState(HomeWordEtudiantTab)
	useEffect(()=>{
		getClassById({_id:select._id}).then()
	},[])

	useEffect(()=>{
		getToDoTest({id_Class:classUser?._id}).then((res:any)=>{
			initTable(res)
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
export default HomeWordEtudiant