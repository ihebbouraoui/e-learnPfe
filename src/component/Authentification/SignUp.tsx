import React, {useRef} from "react";

const SignUp=()=>{
	const loginFormRef = useRef<{ [key: string]: string | number }>({})

	const formLogin = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		loginFormRef.current[name] = event.target.value.trim();
		Object.keys(loginFormRef.current).forEach((key) => {
			if (loginFormRef.current[key] === null || loginFormRef.current[key]?.toString()?.trim() === '') {
				loginFormRef.current[key] = ''
			}
		})
	}
	const signUp=(data:any)=>{

	}

	return(
		<div className={'signUp'}>
			<div className={'formLogin'}>
				<input className={'loginInput'} placeholder={' كلمة السر'} type={'text'} name={'name'}

					   onChange={(e) => formLogin(e, 'name')}
				/><input className={'loginInput'} placeholder={' كلمة السر'} type={'password'} name={'password'}

						 onChange={(e) => formLogin(e, 'password')}
			/>
				<input className={'loginInput'} placeholder={'البريد الالكتروني'} type={'text'} name={'mail'}

					   onChange={(e) => formLogin(e, 'mail')}
				/>
				<input className={'loginInput'} placeholder={' كلمة السر'} type={'text'} name={'tel'}

					   onChange={(e) => formLogin(e, 'tel')}
				/>
				<select className={'select'}>
					<option value={'prof'} selected={true}> استاذ</option>
					<option value={'student'}> تلميذ</option>
				</select>

				<button className={'btn-success'}
						onClick={() => signUp(loginFormRef)}> دخول
				</button>



			</div>
		</div>
	)
}
export default SignUp