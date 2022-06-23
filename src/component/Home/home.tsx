import React, {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import './homeComp.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getAnnounceByIdProf, getCategory} from "../../store/modules/Announce/announceService";
import {Card, Modal, notification} from "antd";
import {AuthLogin, checkMail, sendMail, setUserToHistory, signUpUser} from "../../store/modules/Auth/authService";
// @ts-ignore
import logo from "../../assets/Logo1024x1024.jpg"
import Swal from "sweetalert2";

const HomeTest = () => {
	const nav = useNavigate()
	const listCategory = useSelector((state: RootState) => state.announce.category)
	useEffect(() => {
		getCategory().then((res: any) => {
			console.log(res)
		})
	}, [])
	const [open1, setOpen1] = useState(false)
	const [open2, setOpen2] = useState(false)
	const [open3, setOpen3] = useState(false)
	const [verif, setVerif] = useState(false)
	const [random, setRandom] = useState<any>()
	useEffect(() => {
		const min = 1;
		const max = 100;
		const rand = min + Math.random() * (max - min);
		setRandom(rand.toString().slice(0, 2))
	}, [])
	const loginFormRef = useRef<{ [key: string]: string | number }>({})
	const verifCode = useRef<{ [key: string]: string | number }>({})
	const verifForm = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		verifCode.current[name] = event.target.value.trim();
	}
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
			Swal.fire({
				icon: 'error',
				title: 'البريد الالكتروني او كلمة المرور ',
				text: 'يجب تعمير كل الخانات',
			})

		} else {
			AuthLogin({mail: data.current.mail, password: data.current.password}).then((res: any) => {
				localStorage.setItem('user', JSON.stringify(res.user))
			}).catch((res: any) => {
				Swal.fire({
					icon: 'error',
					title: 'البريد الالكتروني و كلمة المرور ',
					text: 'البريد الاكتروني او كلمة مرور خاطئة',
				})
			
			});
		}

	}
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const goTosignUp = () => {
		setOpen1(false)
		setOpen2(true)

	}
	const openVerification = (data: any) => {
		if(data.mail && data.password && data.tel && data.username)
		{
			sendMail({
				from: 'ihebbouraoui1234@gmail.com',
				to: data.mail,
				subject: 'confirmation code',
				html: `  المعرف:${random} `,
				text: `المعرف :${random} `
			}).then(() => {
				Swal.fire({
					icon: 'success',
					title: 'تاكيد التسجيل ',
					text: '   لقد تم ارسال المعرف الى الايميل',
				})
			})
			setOpen2(false)
			setOpen3(true)
		}else
		{
			Swal.fire({
				icon: 'error',
				title: 'خطاء في المعلومات  ',
				text: ' كل الخانات مطلوبة',
			})
		}

	}
	const finalConfirmation = () => {
		setOpen3(false)
		Swal.fire({
			icon: 'success',
			title: 'نجاح التسجيل ',
			text: 'لقد تم التسجيل بنجاح مرحبا بك !!!',
		})
	}
	const signUp = (data: any) => {
		if (data === random) {
			setVerif(true)
		} else {

			setVerif(false)
		}

	}
	const signUp2 = (data: any) => {
		if (verifCode.current.code === random) {
			signUpUser({
				...data,
				role: 'student',
				status: 'true',
				photo:'http://localhost:3002/uploads/765-default-avatar.png'
			}).then(() => {
				finalConfirmation()
			}).catch(
				(err:any)=>(notification.open({
					message:'الايميل او رقم الهاتف الجوال مستعمل مسبقا'
				}))
			)
		} else {
			notification.open({
				message: 'تنبيه',
				description: 'الرجاء التثبت من المعرف'
			});
		}
	}
	return (

		<div className={'homeComponent'}>
			<Modal footer={null} visible={open1} onCancel={() => setOpen1(false)}>
				<div className={''}>
					<span className={'title'} style={{right: "150px"}}> تسجيل الدخول</span>
					<input className={'loginInput'} placeholder={'البريد الالكتروني'} type={'text'} name={'mail'}

						   onChange={(e) => formLogin(e, 'mail')}


					/>
					<input className={'loginInput'} placeholder={' كلمة السر'} type={'password'} name={'password'}

						   onChange={(e) => formLogin(e, 'password')}

					/>
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
			</Modal>
			<Modal footer={null} visible={open2}    bodyStyle={{height: 550}}
				   onCancel={() => setOpen2(false)}>
				<div className={'signUp'} >
					<div className={''} style={{textAlign:'center'}}>
						<p style={{fontSize:'20px',fontWeight:'bold'}}> مرحبا بك </p>
						<input required={true} className={'loginInput'} placeholder={' الاسم'} type={'text'}
							   name={'name'}

							   onChange={(e) => formLogin(e, 'name')}
						/><input required={true} className={'loginInput'} placeholder={' اسم المستخدم'} type={'text'}
								 name={'password'}

								 onChange={(e) => formLogin(e, 'username')}
					/>
						<input required={true} className={'loginInput'} placeholder={'البريد الالكتروني'} type={'text'}
							   name={'mail'}

							   onChange={(e) => formLogin(e, 'mail')}
						/>
						<input required={true} className={'loginInput'} placeholder={' كلمة السر'} type={'password'}
							   name={'tel'}

							   onChange={(e) => formLogin(e, 'password')}
						/>
						<input required={true} className={'loginInput'} placeholder={'  رقم الهاتف'} type={'text'}
							   name={'tel'}

							   onChange={(e) => formLogin(e, 'tel')}
						/>
						<input required={true} className={'loginInput'} placeholder={'  المستوى'} type={'text'}
							   name={'niveaux'}
							   onChange={(e) => formLogin(e, 'niveaux')}
						/>



						<button className={'btn-success'}
								onClick={() => openVerification(loginFormRef.current)}> تسجيل حساب
						</button>


					</div>
				</div>
			</Modal>
			<Modal footer={null} visible={open3} onCancel={() => setOpen3(false)}>
				<h2> الرجاء الدخال المعرف </h2>
				<input placeholder={'المعرف'} onChange={(e) => verifForm(e, 'code')}/>
				<button className={'btn-success'}
						onClick={() => signUp2(loginFormRef.current)}>تاكيد
				</button>

			</Modal>
			<div style={{width: '30%', margin: 10, padding: 10}}>
				<img alt={''} className={'logoHome'} src={logo}/>
			</div>


			<h1 style={{fontSize: '18px', color: 'black',fontWeight:'bold'}} className={'title'}> مجالاتنا
			</h1>
			<div className={'category'}>

				{listCategory.map((item: any) => {
					return (

						<div className={'cardCategory'}>
							<img  className={'categoryImage'} src={item.icon}/>
							<p style={{color: "black", fontWeight: 'bold',position:'relative',top:'15px'}}> {item.title}</p>
						</div>

					)
				})}

			</div>
			<div className={'category2'}>
				<div className={''}>
					<p>انقر هنا لدخول  </p>
					<button onClick={() => setOpen1(true)}> دخول</button>
				</div>
				<div className={''}>
					<p> انقر هنا لتسجيل حساب جديد </p>
					<button onClick={() => setOpen2(true)}> تسجيل حساب</button>
				</div>
				<div className={''}>
					<p> اتصل بنا</p>
					<p> رقم الهاتف : 059566458+</p>
					<p> البريد الالكتروني: plateformeKef@gmail.com </p>

				</div>

			</div>


		</div>
	)
}
export default HomeTest