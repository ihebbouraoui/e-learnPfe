import React, {useEffect} from "react";
import { EtudiantClickedFilterForm} from "../etudiantConsts";
import SideBarEtudiant from "./SideBarEtudiant";
import FilterForm from "../../../component/Filter/filterForm";
import './detailEtudiant.css'
import {useNavigate} from "react-router-dom";
// @ts-ignore
import BackImage from '../../../assets/arrow-forward-svgrepo-com.svg'
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getClassById} from "../../../store/modules/Student/studentService";

export interface etudiantData {
	nom: string,
	class: string,
	cin: string
}

export interface etudiantClicked {
	data: Array<etudiantData>
}

const DetailEtudiant = () => {
	const selected = useSelector((state: RootState) => state.student.selected_user)
	 const classUser=useSelector((state:RootState)=>state.student.class_user)
	// useEffect(()=>{
	// 	getClassById({_id:selected._id}).then()
	// },[])
	const navi = useNavigate()
	const navigate = () => {
		navi(-1)
	}
	useEffect(()=>{
		getClassById({_id:selected._id}).then()
	},[])
	return (
		<div className={'detailEtudiant'}>
			<div className={'detailEtudiantHaut'}>


				<div className={'infoEtudiant'}>


					<div className={'infoProf'}>
						<img alt={''} draggable={false} src={BackImage} onClick={navigate}
							 style={{width: '40', height: 40, paddingBottom: 10, cursor: 'pointer'}}/>

						<p>
							الاسم: {selected?.name}
						</p>
						<p>
							 الفصل: {classUser?.title}
						</p>

						<p>
							البريد الالكتروني: {selected?.mail}
						</p>
					</div>


				</div>
				<div className={'etudiantClickedForm'}>
					<FilterForm filterData={EtudiantClickedFilterForm}/>
				</div>

			</div>
			<SideBarEtudiant/>
		</div>
	)
}
export default DetailEtudiant