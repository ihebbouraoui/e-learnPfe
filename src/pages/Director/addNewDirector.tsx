import React, {useRef, useState} from "react";
import './director.css'
// @ts-ignore
import BackImage from '../../assets/arrow-forward-svgrepo-com.svg'
import {useNavigate} from "react-router-dom";
import { setUserToHistory, signUpUser} from "../../store/modules/Auth/authService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {notification} from "antd";
import Swal from "sweetalert2";
export const PrivilegeAdmin: {[key: string]: any} =
	{
		// director: {
		// 	add: "", update: "", delete: ""
		// },
		// prof: {
		// 	delete: ""
		// },
		// etudiant: {
		// 	delete: ""
		// },
		// abonnements: {},
		// transfer: {
		// 	update: ""
		// },
		// notification: {
		// 	send: ""
		// },
		// setting: {
		// 	update: ""
		// },
		// stat: {}
	}


export  const transalte:{[key:string]:string}={
	director: 'قائمة المديرين',
	prof:'قائمة الأساتذة',
	etudiant:'قائمة الطلبة',
	abonnements:'الاشتراكات' ,
	transfer:'العمليات المالية' ,
	notification:'الاشعارات' ,
	setting:'الاعدادات' ,
	stat: 'احصائيات',
	delete:'حذف',
	update:'تعديل',
	add:'اضافة',
	send:'ارسال'

}

const AddNewDirector = () => {
	const user = useSelector((state: RootState) => state.auth.userLogged)

	const navi = useNavigate()
	const navigate = () => {
		navi(-1)
	}
	const EmailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const PhoneRegex=/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
	const [test,setTest]=useState<any>()
	const onSubmit = (data: { [key: string]: string | number }) => {
		if (!data.mail ||!data.name ||!data.password ||!data.tel) {
			Swal.fire({
				icon: 'error',
				title: 'المعلومات غير كافية',
				text: 'يجب عليك تعمير كل المعلومات',
			})		}else if(!EmailRegex.test(data.mail.toString() )|| !PhoneRegex.test(data.tel.toString())) {
			Swal.fire({
				icon: 'error',
				title: 'الايميل او رقم الهاتف خاطئان',
				text: 'يجب عليك كتابة اليميل او رقم الهاتف صحيحان',
			})
		}else{
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-error'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'هل انت متأكد؟',
				text: "هل تريداضافة مدير جديد ",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'نعم',
				cancelButtonText: 'لا',
				reverseButtons: true
			}).then((result) => {
				if (result.isConfirmed) {
					signUpUser({...data, role: 'admin', status: 'true',
						photo:'http://localhost:3002/uploads/765-default-avatar.png'
					})
					.then((res:any) =>

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
	const FiltreNewAdmin = useRef<{ [key: string]: string | number }>(PrivilegeAdmin)
	const formHasChanged = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		FiltreNewAdmin.current[name] = event.target.value;
		Object.keys(FiltreNewAdmin.current).forEach((key: any, el: any) => {
			if (FiltreNewAdmin.current[key] === null || FiltreNewAdmin.current[key]?.toString()?.trim() === '') {
				delete FiltreNewAdmin.current[key]
			}

		})
	}

	return (
		<div>
		<div className={'filterContainer'}>
			<div className={''}>
				<img alt={''} draggable={false} src={BackImage} onClick={navigate} style={{width:'40',height:40,paddingBottom:10,cursor:'pointer'}}/>

				<div className={'formAddDirector'}>
					<input type={'text'} onChange={(e:any)=>formHasChanged(e,'name')} placeholder={'الأسم'}/>
					<input type={'text'} onChange={(e:any)=>formHasChanged(e,'username')} placeholder={'اسم العاثلة'}/>
					<input type={'text'} onChange={(e:any)=>formHasChanged(e,'tel')} placeholder={'الهاتف الجواال'}/>
					<input type={'text'} onChange={(e:any)=>formHasChanged(e,'mail')} placeholder={'البريد الألكتروني'}/>
					<input type={'text'} onChange={(e:any)=>formHasChanged(e,'password')} placeholder={'كلمة السر'}/>
				</div>
				<hr style={{marginTop:'20px'}}/>
			</div>
			{/*{*/}
			{/*	Object.keys(PrivilegeAdmin).map((item: string) => {*/}
			{/*		return (*/}
			{/*			<div className={'permissionContainer'} >*/}
			{/*				<div className={'section'}>*/}
			{/*					<input  style={{minHeight:'unset'}} type={'checkbox'}  id={item} name={item}*/}
			{/*							onChange={(e) => formHasChanged(e, item)}*/}
			{/*					/>*/}
			{/*					<label htmlFor={item}> {transalte[item]}  </label>*/}
			{/*				</div>*/}
			{/*					<div className={'sectionItemContainer'}>*/}
			{/*					{*/}
			{/*						Object.keys(PrivilegeAdmin[item]).map((el: any,index:number) =>{*/}
			{/*							return(*/}
			{/*								<div className={'sectionItem'}>*/}
			{/*									<input  style={{minHeight:'unset'}} type={'checkbox'}  id={el+index+item} name={el}*/}
            {/*                                       onChange={(e)=>formHasChanged(e,el)}*/}
			{/*									/>*/}
			{/*									<label htmlFor={el+index+item}> {transalte[el]}</label>*/}
			{/*								</div>*/}
			{/*							)*/}
			{/*						})*/}
			{/*					}*/}
			{/*				</div>*/}

			{/*			</div>*/}
			{/*		)*/}
			{/*	})*/}
			{/*}*/}
			{/*<hr/>*/}
			<button className={'btn-success'} style={{fontSize:'20px'}} onClick={() => onSubmit(FiltreNewAdmin.current)}> حفظ</button>
		</div>
		</div>
	)

}
export default AddNewDirector