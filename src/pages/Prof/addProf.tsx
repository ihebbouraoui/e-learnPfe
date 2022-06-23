import React, {useRef, useState} from "react";
import '../Director/director.css'
// @ts-ignore
import BackImage from '../../assets/arrow-forward-svgrepo-com.svg'
import {useNavigate} from "react-router-dom";
import {PrivilegeAdmin, transalte} from "../Director/addNewDirector";
import {setUserToHistory, signUpUser} from "../../store/modules/Auth/authService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Swal from "sweetalert2";
import {GetDirector, updateDirectorWithMail} from "../../store/modules/Director/directorService";

const AddProf = () => {
	const user = useSelector((state: RootState) => state.auth.userLogged)
	const navi = useNavigate()
	const navigate = () => {
		navi(-1)
	}
	const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const PhoneRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
	const onSubmit = (data: { [key: string]: string | number }) => {
		if (!data.mail || !data.name || !data.password || !data.tel) {
			Swal.fire({
				icon: 'error',
				title: 'المعلومات غير كافية',
				text: 'يجب عليك تعمير كل المعلومات',
			})
		} else if (!EmailRegex.test(data.mail.toString()) || !PhoneRegex.test(data.tel.toString())) {
			Swal.fire({
				icon: 'error',
				title: 'الايميل او رقم الهاتف خاطئان',
				text: 'يجب عليك كتابة اليميل او رقم الهاتف صحيحان',
			})
		} else {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-error'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'هل انت متأكد؟',
				text: "هل تريداضافة استاذ جديد ",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'نعم',
				cancelButtonText: 'لا',
				reverseButtons: true
			}).then((result) => {
				if (result.isConfirmed) {
					signUpUser({
						...data,
						role: 'prof',
						status: 'true',
						photo:'http://localhost:3002/uploads/765-default-avatar.png'
					}).then(() =>
						setUserToHistory({
							date: "2012:10:12",
							mailUser: data.mail,
							adminID: user.user._id,
							data: data,
							type: 'add'
						}).then()
					)
					.catch(() => {
						Swal.fire({
							icon: 'error',
							title: 'الايميل او رقم الهاتف موجودان',
							text: 'يجب عليك تغير الايميل او رقم الهاتف',
						})
					})
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'لقد تمت الاضافة بنجاح ',
						showConfirmButton: false,
						timer: 1000
					}).then(()=>{
						navi(-1)
					})

				}
			})
		}
	}
	const addProfForm = useRef<{ [key: string]: string | number }>({})

	const formAdd = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		addProfForm.current[name] = event.target.value.trim();
		Object.keys(addProfForm.current).forEach((key) => {
			if (addProfForm.current[key] === null || addProfForm.current[key]?.toString()?.trim() === '') {
				addProfForm.current[key] = ''
			}
		})
	}

	return (
		<div>
			<div className={'filterContainer'}>
				<div className={''}>
					<img alt={''} draggable={false} src={BackImage} onClick={navigate}
						 style={{width: '40', height: 40, paddingBottom: 10, cursor: 'pointer'}}/>

					<div className={'formAddDirector'}>
						<input type={'text'} placeholder={'الأسم'} onChange={(e) => formAdd(e, 'name')}/>
						<input type={'number'} placeholder={'الهاتف الجواال'} onChange={(e) => formAdd(e, 'tel')}/>
						<input type={'email'} placeholder={'البريد الألكتروني'} onChange={(e) => formAdd(e, 'mail')}/>
						<input type={'password'} placeholder={'كلمة السر'} onChange={(e) => formAdd(e, 'password')}/>
						<input type={'text'} placeholder={'الاختصاص'} onChange={(e) => formAdd(e, 'specialite')}/>
					</div>

					<hr style={{marginTop: '20px'}}/>
					<button className={'btn-success'} onClick={() => onSubmit(addProfForm.current)}> انتهاء</button>

				</div>


			</div>
		</div>
	)
}
export default AddProf