import React, {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import './homeComp.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getAnnounceByIdProf, getCategory} from "../../store/modules/Announce/announceService";
import {Card, Modal, notification} from "antd";
import {AuthLogin, sendMail, setUserToHistory, signUpUser} from "../../store/modules/Auth/authService";
// @ts-ignore
import logo from "../../assets/Logo1024x1024.jpg"

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
			}).catch((res: any) => {
				console.log(res.msg)
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
		sendMail({
			from: 'ihebbouraoui1234@gmail.com',
			to: data.mail,
			subject: 'confirmation code',
			html: `  المعرف:${random} `,
			text: `المعرف :${random} `
		}).then(() => {
			notification.open({
				message: 'تنبيه',
				description: 'لقد تم ارسال المعرف الى الايمايل الخاص بك'
			});
		})
		setOpen2(false)
		setOpen3(true)
	}
	const finalConfirmation = () => {
		setOpen3(false)
		notification.open({
			message: 'نجاح',
			description: 'لقد تم انشاء الحساب'
		});
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
				photo: 'data:image/jpeg;base64,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'
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
			</Modal>
			<Modal footer={null} visible={open2} onCancel={() => setOpen2(false)}>
				<div className={'signUp'}>
					<div className={''}>
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
			{/*<button onClick={()=>{nav('/login')}}> log</button>*/}
			{/*<button onClick={()=>{nav('/signUp')}}> signu</button>*/}
			<div className={'us'}>
				<p style={{color: 'red', fontWeight: 'bolder', fontSize: '40px'}} className={'text'}>
					مرحبا بك في منصة كاف المتطورة
				</p>


			</div>
			<div style={{width: '30%', margin: 10, padding: 10}}>
				<img alt={''} className={'logoHome'} src={logo}/>
			</div>

			<div className={'auth'}>
				<p>انقر هنا للدخول لحسابك </p>
				<button onClick={() => setOpen1(true)}> دخول</button>
			</div>
			<div className={'auth2'}>
				<p> انفر هنا لتسجيل حساب جديد </p>
				<button onClick={() => setOpen2(true)}> دخول</button>
			</div>
			<div className={'auth3'}>
				<p> اتصل بنا</p>
				<p> رقم الهاتف : 059566458+</p>
				<p> البريد الالكتروني: plateformeKef@gmail.com </p>

			</div>
			<h1 style={{fontSize: '30px', color: 'black'}} className={'title'}> مجالاتنا
			</h1>
			<div className={'category'}>
				{listCategory.map((item: any) => {
					return (

						<div className={'cardCategory'}>
							<img className={'categoryImage'} src={item.icon}/>
							<p style={{color: "black", fontWeight: 'bold'}}> {item.title}</p>
						</div>

					)
				})}
			</div>


		</div>
	)
}
export default HomeTest