import React, {useEffect, useRef, useState} from "react";
import '../mainPageProf/mainPageProf.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {toBase64} from "../../../component/Const/const";
import {updateProf} from "../../../store/modules/Prof/profService";
import '../../Prof/sideBarProf.css'
import {setUserLogged} from "../../../store/modules/Auth/AuthModule";

// @ts-ignore
import rename from "../../../assets/rename-svgrepo-com.svg"
import {getUserById} from "../../../store/modules/Director/directorService";
import {upload} from "../../../store/modules/Auth/authService";


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

	const handleUploadImage = (e:any) => {
		const f = new FormData();
		f.append('file', e.target.files[0])
		upload(f).then((res) => {
			updateProf({photo: res}, UserLogged?.user?._id).then(() => {
				dispatch(setUserLogged({...UserLogged, photo: res}))
			})
		} )
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
	const onSubmit = (data: { [key: string]: string | number }) => {
		updateProf(data, UserLogged?.user?._id).then((res: any) => {
			// localStorage.setItem('user',JSON.stringify({...res.user}))
			dispatch((setUserLogged({user: res})))
			localStorage.setItem('user', JSON.stringify(res))
		})
	}

	return (
		<div className={'profil'}>
			<div className={'photoSide'}>
				<img  src={UserLogged.user.photo} className={'photo'} />
				<input type={'file'} multiple={true} onChange={handleUploadImage}/>
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
													  placeholder={'name'} onChange={(e) => formSubmit(e, 'name')}

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
					placeholder={'username'} onChange={(e) => formSubmit(e, 'username')}/> </label>
				<label htmlFor={'name'}> البريد الألكتوني:<input
					style={{
						height: '80%',
						width: '80%',
						position: 'relative',
						right: '23px'
					}} type={'text'}
					defaultValue={UserLogged?.user?.mail}
					placeholder={'email'} onChange={(e) => formSubmit(e, 'mail')}/> </label>
				<label htmlFor={'name'}> رقم الهاتف:<input
					style={{
						height: '80%',
						width: '80%',
						position: 'relative',
						right: '48px'
					}} type={'text'}
					defaultValue={UserLogged?.user?.tel}
					placeholder={'telephone'} onChange={(e) => formSubmit(e, 'tel')}/> </label>


				<button className={'btn-success'}
						style={{height: 50, fontWeight: 'bolder', color: 'white',width:'50%'}}
						onClick={() => onSubmit(updateForm.current)}> تاكيد
				</button>

			</div>
			<div className={'achivmentSide'}>
				azeazeazeaze
			</div>

		</div>


	)
}
export default MainPageProf