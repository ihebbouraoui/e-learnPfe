import React, {useEffect, useState} from "react";
import TabForm from "../../../../component/Tableau/tableauxForm";
import {HomeWorkTab} from "./homeWorkConst";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {HomeWordEtudiantTab} from "../../../Etudiant/DetailEtudiant/HomeWorkEtudiant/homeWorkEtudiantConst";
import {getClassById, getToDoTest} from "../../../../store/modules/Student/studentService";
import {getToDoProfTest} from "../../../../store/modules/Prof/profService";
const HomeWork=()=>{
	const prof_Selected=useSelector((state:RootState)=>state.prof.selected_Prof)
	const [tableModel, setTableModel] = useState(HomeWorkTab)
	useEffect(()=>{
		getToDoProfTest({id_Prof:prof_Selected._id}).then((res:any)=>{
			initTable(res)
		})
	},[])

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			title:item.title,
			name:item.subject?.title,
			class:item.class?.title
		}))
		setTableModel({...temp})
	}



	return(
		<div className={''}>
          <TabForm filterData={{...tableModel}}/>
		</div>
	)
}
export default HomeWork