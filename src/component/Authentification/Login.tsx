import React, {useEffect, useRef} from "react";
import './login.css'
import {AuthLogin} from "../../store/modules/Auth/authService";
import {useDispatch} from "react-redux";
// @ts-ignore
import photo from '../../assets/e-learning-mfc-min.jpg'
const Login=()=>{
	const loginFormRef = useRef<{ [key: string]: string | number }>({})

	const formLogin = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		loginFormRef.current[name] = event.target.value.trim();
		Object.keys(loginFormRef.current).forEach((key) => {
			if (loginFormRef.current[key] === null || loginFormRef.current[key]?.toString()?.trim() === '') {
				loginFormRef.current[key] = ''
			}
		})
	}
	const login=(data:any)=>{
		AuthLogin({mail:data.current.mail,password:data.current.password}).then((res:any)=>{
			localStorage.setItem('token',JSON.stringify(res.token))
		})
	}
	const dispatch=useDispatch()

	return(
		<div className={'login'} >
			<div className={'formLogin'}>
				<span className={'title'}> Sign in to Website </span>
				<input className={'loginInput'} placeholder={'البريد الالكتروني'} type={'text'} name={'mail'}

					   onChange={(e) => formLogin(e, 'mail')}


				/>
				<input className={'loginInput'} placeholder={' كلمة السر'} type={'password'} name={'password'}

					   onChange={(e) => formLogin(e, 'password')}

				/>
				<p className={'details'}>
					يرجى ادخال البريد الألكتروني و كلمة المرور الخاصة بك و ان كنت غير مسجل فالرجاء النقر على تسجيل الحساب لتنضم الينا
				</p>
			     <div className={'button'}>
					 <button className={'btn-login'} style={{width:"100%",height:'100%'}}
							 onClick={() => login(loginFormRef)}> دخول
					 </button>
					 <button className={'btn-login'}  style={{width:"100%",height:'100%'}}
							 onClick={() => login(loginFormRef)}> تسجيل حساب
					 </button>
				 </div>
			</div>
			<div className={'photoBloc'}>
				<img className={'photoE'} alt={''} src={photo}/>
			</div>

		</div>
	)

}
export default Login