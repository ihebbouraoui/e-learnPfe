import React, {useRef} from "react";
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
	const onSubmit = (data: { [key: string]: string | number }) => {
		signUpUser({...data, role: 'prof', status: 'true'}).then(() =>
			setUserToHistory({
				date: "2012:10:12",
				mailUser:data.mail,
				adminID: user.user._id,
				data: data,
				type: 'add'
			}).then()
		)
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