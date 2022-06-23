import React, {useEffect, useRef, useState} from "react";
import '../mainPageProf/mainPageProf.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {toBase64} from "../../../component/Const/const";
import {deleteProf, updateProf} from "../../../store/modules/Prof/profService";
import '../../Prof/sideBarProf.css'
import {setUserLogged} from "../../../store/modules/Auth/AuthModule";

// @ts-ignore
import rename from "../../../assets/rename-svgrepo-com.svg"
import {getUserById} from "../../../store/modules/Director/directorService";
import {setUserToHistory, upload} from "../../../store/modules/Auth/authService";
import {notification} from "antd";
import Swal from "sweetalert2";
import moment from "moment/moment";
import {getStudentWithStatus} from "../../../store/modules/Student/studentService";


const MainPageProf = () => {
	let UserLogged = useSelector((state: RootState) => state.auth.userLogged)
	const dispatch = useDispatch()
	const [isModal, setModal] = useState(false)
	const openModel = () => {
		setModal(true)
	}
	const closeEvent = () => {
		setModal(false)
	}
	let existing = localStorage.getItem('user');

	const handleUploadImage = (e: any) => {
		const f = new FormData();
		f.append('file', e.target.files[0])
		upload(f).then((res) => {
			updateProf({photo: res}, UserLogged?.user?._id).then(() => {
				dispatch(setUserLogged({...UserLogged, photo: res}))
			})
		})
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
	const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const PhoneRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
	const onSubmit = (data: { [key: string]: string | number }) => {
		if ( !data.tel) {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-error'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'هل انت متأكد؟',
				text: "هل تريد تغير معلوماتك ",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'نعم',
				cancelButtonText: 'لا',
				reverseButtons: true
			}).then((result) => {
				if (result.isConfirmed) {
					updateProf(data, UserLogged?.user?._id).then((res: any) => {
						// localStorage.setItem('user',JSON.stringify({...res.user}))
						dispatch((setUserLogged({user: res})))
						localStorage.setItem('user', JSON.stringify(res))
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


		} else {
			Swal.fire({
				icon: 'error',
				title: 'رقم الهاتف الجوال غير صحيح',
				text: 'الرجاء التثبت من رقم الهاتف الجوال',
			})		}

	}

	return (
		<div className={'profil'}>
			<div className={'photoSide'}>
				<img src={UserLogged.user.photo} className={'photo'}/>
				<input style={{display: 'none'}} id={'file'} type={'file'} multiple={true}
					   onChange={handleUploadImage}/>
				<label style={{cursor: 'pointer'}} htmlFor={'file'}> انقر هنا لتنزيل صورة جديدة</label>
			</div>
			<div className={'detailSide'}>
				<label htmlFor={'name'}> الاسم:<input id={'name'}
													  style={{
														  // border: '1px solid black',
														  height: '80%',
														  width: '80%',
														  position: 'relative',
														  right: '76px'
													  }}
													  type={'text'} defaultValue={UserLogged?.user?.name}
													  placeholder={'الاسم'} onChange={(e) => formSubmit(e, 'name')}

				/>
				</label>
				<label htmlFor={'name'}> الاسم المستخدم:<input
					style={{
						height: '80%',
						width: '80%',
						position: 'relative',
						right: '20px'
					}} type={'text'}
					defaultValue={UserLogged?.user?.username}
					placeholder={'الاسم المستخدم'} onChange={(e) => formSubmit(e, 'username')}/> </label>
				<label htmlFor={'name'}> البريد الألكتوني:<input
					style={{
						height: '80%',
						width: '80%',
						position: 'relative',
						right: '23px'
					}} type={'text'}
					defaultValue={UserLogged?.user?.mail}
					readOnly={true}
					placeholder={'البريد الالكتروني'} onChange={(e) => formSubmit(e, 'mail')}/> </label>
				<label htmlFor={'name'}> رقم الهاتف:<input
					style={{
						height: '80%',
						width: '80%',
						position: 'relative',
						right: '48px'
					}} type={'text'}
					defaultValue={UserLogged?.user?.tel}
					placeholder={'رقم الهاتف'} onChange={(e) => formSubmit(e, 'tel')}/> </label>
				{UserLogged.user.role==='prof' &&
                <label htmlFor={'name'}> الاختصاص:<input
                    style={{
						height: '80%',
						width: '80%',
						position: 'relative',
						right: '48px'
					}} type={'text'}
                    value={UserLogged?.user?.specialite}
                    placeholder={'الاختصاص'} onChange={(e) => formSubmit(e, 'specialite')}/> </label>
				}
				{
					UserLogged.user.role==='student' &&
                    <label htmlFor={'name'}>المستوى:<input
                        style={{
							height: '80%',
							width: '80%',
							position: 'relative',
							right: '48px'
						}} type={'text'}
						readOnly={true}
                        value={UserLogged?.user?.niveaux}
                        placeholder={'المستوى'} onChange={(e) => formSubmit(e, 'niveaux')}/> </label>
				}
				{
					UserLogged.user.role==='student' &&
                    <label htmlFor={'name'}> رقم التسجيل:<input
                        style={{
							height: '80%',
							width: '80%',
							position: 'relative',
							right: '48px'
						}} type={'text'}
                        value={UserLogged?.user?.matricule}
						readOnly={true}
                        placeholder={'رقم التسجيل'} onChange={(e) => formSubmit(e, 'matricule')}/> </label>
				}


				<button className={'btn-success'}
						style={{height: 50, fontWeight: 'bolder', color: 'white', width: '50%'}}
						onClick={() => onSubmit(updateForm.current)}> تاكيد
				</button>

			</div>

		</div>


	)
}
export default MainPageProf