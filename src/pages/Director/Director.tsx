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
import Swal from 'sweetalert2'

import ModalComp from "../../component/Modal/modalComp";
import {setSelectedDirector} from "../../store/modules/Director/directorModule";
import {deleteProf, updateProf} from "../../store/modules/Prof/profService";
import {sendMail, setUserToHistory, signUpUser} from "../../store/modules/Auth/authService";
import {getStudentWithStatus} from "../../store/modules/Student/studentService";
import {stat} from "fs";
import moment from "moment";
import {notification} from "antd";
import {setUserLogged} from "../../store/modules/Auth/AuthModule";

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
				const swalWithBootstrapButtons = Swal.mixin({
					customClass: {
						confirmButton: 'btn btn-success',
						cancelButton: 'btn btn-error'
					},
					buttonsStyling: false
				})

				swalWithBootstrapButtons.fire({
					title: 'هل انت متأكد؟',
					text: "هل تريد حظر المستخدم ",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'نعم',
					cancelButtonText: 'لا',
					reverseButtons: true
				}).then((result) => {
					if (result.isConfirmed) {
						deleteProf({_id: listDirector[data.index]._id}).then(() => setUserToHistory({
							date: moment().format('MMMM Do YYYY, h:mm:ss a'),
							adminID: user.user._id,
							userId: listDirector[data.index]._id,
							data: listDirector[data.index],
							type: 'delete'
						}).then(() => {
							GetDirector().then(()=>{
								sendMail({
									from: 'ihebbouraoui1234@gmail.com',
									to: listDirector[data.index].mail,
									subject: 'confirmation',
									html:'لقد تم حضر حسابك',
									text:'لقد تم حضر حسابك'
								}).then()
							})
						}))
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'لقد تم الحظر',
							showConfirmButton: false,
							timer: 1500
						})

					} else if (
						/* Read more about handling dismissals below */
						result.dismiss === Swal.DismissReason.cancel
					) {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'تم الغاء الحظر',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})


				break;
		}
	}
	const openModel = () => {
		setModal(true)
	}
	const closeEvent = () => {
		setModal(false)
	}
	const EmailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const PhoneRegex=/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
	const updateForm = useRef<{ [key: string]: string | number }>({})
	const onSubmit = (data: { [key: string]: string | number }) => {
		if (!data.name ||!data.username ||!data.tel){
			Swal.fire({
				icon: 'error',
				title: 'المعلومات غير كافية',
				text: 'يجب عليك تعمير كل المعلومات',
			})		}else if(!PhoneRegex.test(data.tel.toString())) {
			Swal.fire({
				icon: 'error',
				title: 'يجب ان يكون رقم من السعودية',
				text: 'رقم الهاتف الجوال خاطئ',
			})		}else{
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-error'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'هل انت متأكد؟',
				text: "هل تريد تغير معلومات المدير ",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'نعم',
				cancelButtonText: 'لا',
				reverseButtons: true
			}).then((result) => {
				if (result.isConfirmed) {
					updateDirectorWithMail({...data,mail:selected.mail}).then((res: any) => {
						GetDirector().then(() => setModal(false))
					})
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'لقد تم تغير المعلومات ',
						showConfirmButton: false,
						timer: 1000
					})

				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'تم الغاء التغير',
						showConfirmButton: false,
						timer: 1000
					})
				}
			})

		}

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
					<label> البريد الالكتروني: </label> <input readOnly={true} type={'text'} defaultValue={selected.mail}
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
			<button onClick={navigate} className={'btn-success'}
					style={{ backgroundColor: 'rgb(76 95 142 / 29%)', margin: '0 20px',fontStyle:'italic'}}
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