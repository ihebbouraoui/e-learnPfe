import React, {useEffect, useState} from "react";
import FilterForm from "../../component/Filter/filterForm";
import {EtudiantFormConsts, EtudiantTab} from "./etudiantConsts";
import TabForm, {btnInetrface} from "../../component/Tableau/tableauxForm";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store";
import {
	deleteStudent,
	getStudent, getStudentWithStatus
} from "../../store/modules/Student/studentService";
import {setSelectedUser} from "../../store/modules/Student/studentModule";
import {deleteProf, getProfWithStatus} from "../../store/modules/Prof/profService";
import {setUserToHistory} from "../../store/modules/Auth/authService";


const Etudiant = () => {
	const [tableModel, setTableModel] = useState(EtudiantTab)
	const listStudent = useSelector((state: RootState) => state.student.list_student)
	const navigate = useNavigate()
	const user=useSelector((state:RootState)=>state.auth.userLogged)
	const receive = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				store.dispatch(setSelectedUser(listStudent[data.index]))
				navigate('/etudiant/detail/:id')
				// console.log(listStudent[data.index])
				break;
			case 'delete':
				deleteProf({_id: listStudent[data.index]._id}).then(() => setUserToHistory({
					date: "10:12:200",
					adminID: user.user._id,
					userId: listStudent[data.index]._id,
					data: listStudent[data.index],
					type: 'delete'
				}).then(() => {
					getStudentWithStatus().then()
				}))
				break;
		}
	}


	//get all student
	useEffect(() => {
		getStudentWithStatus().then((res: any) => {
			initTable(res)
		})
	}, [])

	// get Filtered Student
	useEffect(() => {
		initTable(listStudent)
	}, [listStudent])

//set student in table
	const initTable = (res: any) => {
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			name: item.name,
			mail: item.mail,
			tel: item.tel,
		}))
		setTableModel({...temp})
	}


	return (
		<div className={'directorMain'}>
			<FilterForm filterData={EtudiantFormConsts}/>
			<TabForm filterData={{...tableModel, sendEventToParent: receive}}/>
		</div>
	)
}
export default Etudiant