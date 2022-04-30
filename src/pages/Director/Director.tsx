import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import FilterForm from "../../component/Filter/filterForm";
import {DirectorFilterForm, DirectorTab} from "./directorConsts";
import TabForm, {btnInetrface} from "../../component/Tableau/tableauxForm";
import {useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";
import {RootState, store} from "../../store/store";
import {
	deleteDirector,
	GetDirector,
	updateDirectorWithMail
} from "../../store/modules/Director/directorService";
import ModalComp from "../../component/Modal/modalComp";
import {setSelectedDirector} from "../../store/modules/Director/directorModule";
import {deleteProf} from "../../store/modules/Prof/profService";
import {setUserToHistory} from "../../store/modules/Auth/authService";
import {getStudentWithStatus} from "../../store/modules/Student/studentService";
import {stat} from "fs";

const Director = () => {
	const navi = useNavigate()
	const selected = useSelector((state: RootState) => state.director.selected_director)
const user=useSelector((state:RootState)=>state.auth.userLogged)
	const receive = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				store.dispatch(setSelectedDirector(DirectorTab.data[data.index]))
				setModal(true)
				break;
			case 'delete':
				deleteProf({_id: listDirector[data.index]._id}).then(() => setUserToHistory({
					date: "10:12:200",
					adminID: user.user._id,
					userId: listDirector[data.index]._id,
					data: listDirector[data.index],
					type: 'delete'
				}).then(() => {
					GetDirector().then()
				}))

				break;
		}
	}
	const openModel = () => {
		setModal(true)
	}
	const closeEvent = () => {
		setModal(false)
	}
	const updateForm = useRef<{ [key: string]: string | number }>({})
	const onSubmit = (data: { [key: string]: string | number }) => {
		updateDirectorWithMail(data).then((res: any) => {
			GetDirector().then(() => setModal(false))
		})
	}
	const formSubmit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		updateForm.current[name] = event.target.value.trim();
		Object.keys(updateForm.current).forEach((key) => {
			if (updateForm.current[key] === null || updateForm.current[key]?.toString()?.trim() === '') {
				updateForm.current[key] = ''
			}
		})
	}
	useEffect(() => {
		updateForm.current = {
			name: selected?.name,
			username: selected?.username,
			mail: selected?.mail,
			tel: selected?.tel
		}
	}, [selected])
	const updateDirector = (selected: any) => {

		return (
			<div className={'filterContainer'}>
				<h2>  مدير</h2>
				<div className={'filterFormGrid'} style={{gridTemplateColumns: '1fr', width: '30vw'}}>
					<label> الاسم: </label> <input type={'text'} defaultValue={selected.name} key={selected.name}
												   onChange={(e) => formSubmit(e, 'name')}
				/>
					<label> الاسم المستخدم: </label> <input type={'text'} defaultValue={selected.username}
															onChange={(e) => formSubmit(e, 'username')}
															key={selected.username}/>
					<label> البريد الالكتروني: </label> <input type={'text'} defaultValue={selected.mail}
															   onChange={(e) => formSubmit(e, "mail")}
															   key={selected.mail}/>
					<label> رقم الهاتف الجوال: </label> <input type={'text'} defaultValue={selected.tel}
															   onChange={(e) => formSubmit(e, 'tel')}
															   key={selected.tel}/>
					<button className={'btn-success'}
							onClick={() => onSubmit(updateForm.current)}> تاكيد
					</button>
				</div>

			</div>


		)
	}
	const navigate = () => {
		navi('/ajout')
	}
	const [tableModel, setTableModel] = useState(DirectorTab)
	const listDirector = useSelector((state: RootState) => state.director.list_director)
	const [isModal, setModal] = useState(false)
	useEffect(() => {
		initTable(listDirector)
	}, [listDirector])

	useEffect(() => {
		GetDirector().then((res: any) => {
			initTable(res)
		})

	}, [])

	const initTable = (res: any) => {
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			name: item.name,
			username: item.username,
			mail: item.mail,
			tel: item.tel,
		}))
		setTableModel({...temp})
	}
	return (
		<div className={'directorMain'}>
			<FilterForm filterData={DirectorFilterForm}/>
			<button className={'btn-success'}
					style={{padding: 15, backgroundColor: 'rgb(76 95 142 / 29%)', width: '150px', margin: '0 20px',fontStyle:'italic',fontSize:'large'}}
					onClick={navigate}
			> اضافة
				مدير
			</button>
			{

				<TabForm filterData={{...tableModel, sendEventToParent: receive, openModel: openModel}}/>

			}
			{isModal && <ModalComp config={{element: updateDirector(selected), onCloseEvent: () => closeEvent()}}/>}

		</div>
	)

}
export default Director