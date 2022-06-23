import React, {useEffect, useRef, useState} from "react";
import FilterForm from "../../component/Filter/filterForm";
import {ProfFilterForm, profTab} from "./profConsts";
import TabForm, {btnInetrface} from "../../component/Tableau/tableauxForm";
import {deleteProf, getProfWithStatus} from "../../store/modules/Prof/profService";
import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {sendMail, setUserToHistory} from "../../store/modules/Auth/authService";
import moment from "moment";
import {GetDirector, updateDirectorWithMail} from "../../store/modules/Director/directorService";
import ModalComp from "../../component/Modal/modalComp";
import {setSelectedDirector} from "../../store/modules/Director/directorModule";
import Swal from "sweetalert2";

export interface detailProf {
	name: string,
	mail: string,
	tel: string
}

export interface labelProf {
	label: string
}

export interface profClicked {
	data: Array<detailProf>
	label: Array<labelProf>
}

const Prof = () => {
	const [tableModel, setTableModel] = useState(profTab)
	const selected = useSelector((state: RootState) => state.director.selected_director)

	let listProf = useSelector((state: RootState) => state.prof.list_Prof)
	const user = useSelector((state: RootState) => state.auth.userLogged)
	useEffect(() => {
		getProfWithStatus().then((res: any) => {
			initTable(res)
		})
	}, [])

	useEffect(() => {
		initTable(listProf)
	}, [listProf])


	const navigate = useNavigate()
	const receive = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				store.dispatch(setSelectedDirector(profTab.data[data.index]))
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
						deleteProf({_id: listProf[data.index]._id}).then(() => setUserToHistory({
							date: moment().format('MMMM Do YYYY, h:mm:ss a'),
							adminID: user.user._id,
							userId: listProf[data.index]._id,
							data: listProf[data.index],
							type: 'delete'
						}).then(() => {
							getProfWithStatus().then(()=>{
								sendMail({
									from: 'ihebbouraoui1234@gmail.com',
									to: listProf[data.index].mail,
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
	const closeEvent = () => {
		setModal(false)
	}
	const updateForm = useRef<{ [key: string]: string | number }>({})
	const formSubmit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		updateForm.current[name] = event.target.value.trim();
		Object.keys(updateForm.current).forEach((key) => {
			if (updateForm.current[key] === null || updateForm.current[key]?.toString()?.trim() === '') {
				updateForm.current[key] = ''
			}
		})
	}
	const [isModal, setModal] = useState(false)
	const PhoneRegex=/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
	const onSubmit = (data: { [key: string]: string | number }) => {
		if (!data.name  ||!data.tel){
			Swal.fire({
				icon: 'error',
				title: 'المعلومات غير كافية',
				text: 'يجب عليك تعمير كل المعلومات',
			})			}else if(!PhoneRegex.test(data.tel.toString())) {
			Swal.fire({
				icon: 'error',
				title: 'يجب ان يكون رقم من السعودية',
				text: 'رقم الهاتف الجوال خاطئ',
			})			}else{
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-error'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'هل انت متأكد؟',
				text: "هل تريد تغير معلومات الأستاذ ",
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
						position: 'top-end',
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
						position: 'top-end',
						icon: 'error',
						title: 'تم الغاء التغير',
						showConfirmButton: false,
						timer: 1000
					})
				}
			})

		}

	}
	const updateDirector = (selected: any) => {
		return (
			<div className={'filterContainer'}>
				<h2>  مدير</h2>
				<div className={'filterFormGrid'} style={{gridTemplateColumns: '1fr', width: '30vw'}}>
					<label> الاسم: </label> <input type={'text'} defaultValue={selected.name} key={selected.name}
												   onChange={(e) => formSubmit(e, 'name')}
				/>
					<label> البريد الالكتروني: </label> <input readOnly={true} type={'text'} value={selected.mail}
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

	const initTable = (res: any) => {
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			name: item.name,
			mail: item.mail,
			tel: item.tel,
			spec:item?.specialite
		}))
		setTableModel({...temp})
	}

	return (
		<div className={'directorMain'}>
			<FilterForm filterData={ProfFilterForm}/>
			<button className={'btn-success'}
					style={{ backgroundColor: 'rgb(76 95 142 / 29%)', margin: '0 20px'}}
					onClick={() => navigate('/addprof')}
			> اضافة
				استاذ
			</button>
			<TabForm filterData={{...tableModel, sendEventToParent: receive}}/>
			{isModal && <ModalComp config={{element: updateDirector(selected), onCloseEvent: () => closeEvent()}}/>}

		</div>
	)
}

export default Prof