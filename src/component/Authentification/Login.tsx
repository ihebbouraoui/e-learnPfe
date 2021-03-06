import React, {useRef, useState} from "react";
import './login.css'
import {AuthLogin} from "../../store/modules/Auth/authService";
import {useDispatch} from "react-redux";
// @ts-ignore
import photo from '../../assets/e-learning-mfc-min.jpg'
import {Alert} from 'antd';
import {notification} from 'antd';
import {useNavigate} from "react-router-dom";

export const Login = () => {
	const loginFormRef = useRef<{ [key: string]: string | number }>({})
	const formLogin = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		loginFormRef.current[name] = event.target.value.trim();
		Object.keys(loginFormRef.current).forEach((key) => {
			if (loginFormRef.current[key] === null || loginFormRef.current[key]?.toString()?.trim() === '') {
				loginFormRef.current[key] = ''
			}
		})
	}
	const login = (data: any) => {
		if (!data.current.mail || !data.current.password) {
			notification.open({
				message: 'تحذير',
				description: 'الرجاء ادخال الحساب',
				onClick: () => {
					console.log('Notification Clicked!');
				},
			});
		} else {
			AuthLogin({mail: data.current.mail, password: data.current.password}).then((res: any) => {
				localStorage.setItem('user', JSON.stringify(res.user))
			})
		}
	}
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const goTosignUp = () => {
		navigate('/signUp')
	}
	return (
		<div className={'login'}>
			<div className={'formLogin'}>
				<span className={'title'}> تسجيل الدخول</span>
				<input className={'loginInput'} placeholder={'البريد الالكتروني'} type={'text'} name={'mail'}

					   onChange={(e) => formLogin(e, 'mail')}


				/>
				<input className={'loginInput'} placeholder={' كلمة السر'} type={'password'} name={'password'}

					   onChange={(e) => formLogin(e, 'password')}

				/>
				<p className={'details'}>
					يرجى ادخال البريد الألكتروني و كلمة المرور الخاصة بك و ان كنت غير مسجل فالرجاء النقر على تسجيل
					الحساب لتنضم الينا
				</p>
				<div className={'button'}>
					<button className={'btn-login'}
							style={{width: "100%", height: '100%', margin: '20px', fontWeight: 'bold'}}
							onClick={() => login(loginFormRef)}> دخول
					</button>
					<button className={'btn-login'}
							style={{width: "100%", height: '100%', margin: '20px', fontWeight: 'bold'}}
							onClick={() => goTosignUp()}> تسجيل حساب
					</button>
				</div>
			</div>


		</div>
	)


}


export default Login