import React, {useRef, useState} from "react";
import '../Director/director.css'
// @ts-ignore
import BackImage from '../../assets/arrow-forward-svgrepo-com.svg'
import {useNavigate} from "react-router-dom";
import {PrivilegeAdmin, transalte} from "../Director/addNewDirector";
import {setUserToHistory, signUpUser} from "../../store/modules/Auth/authService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

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
			alert('يجب عليك كاتبة كل الخانات')
		} else if (!EmailRegex.test(data.mail.toString()) || !PhoneRegex.test(data.tel.toString())) {
			alert('الرجاء التحقق من البريد الالكرتروني او الهاتف الجوال')
		} else {
			signUpUser({
				...data,
				role: 'prof',
				status: 'true',
				photo: 'data:image/jpeg;base64,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'
			}).then(() =>
				setUserToHistory({
					date: "2012:10:12",
					mailUser: data.mail,
					adminID: user.user._id,
					data: data,
					type: 'add'
				}).then()
			)
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

					</div>

					<hr style={{marginTop: '20px'}}/>
					<button className={'btn-success'} onClick={() => onSubmit(addProfForm.current)}> انتهاء</button>

				</div>


			</div>
		</div>
	)
}
export default AddProf