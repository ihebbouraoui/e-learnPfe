import React, {useState} from "react";
import './SideBar.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setLoading, setLogged, setUserLogged} from "../../store/modules/Auth/AuthModule";
// @ts-ignore
import logo from '../../assets/Logo1024x1024.jpg'
const SiderBarAdmin = () => {
	const links = [
		{link: "المديرين"},
		{link: 'الاساتدة'},
		{link: 'الطلبة'},
		{link: 'معلوماتي'},
		{link: 'أثر'},
		{link: 'إحصائيات'},
		{link: 'الأبلاغ'},
		{link:'خروج'}


	]
	const linksAdmin = [
		{link: 'الاساتدة'},
		{link: 'الطلبة'},
		{link: 'معلوماتي'},
		{link: 'إحصائيات'},
		{link: 'الأبلاغ'},
		{link:'خروج'}

	]



	let navigate = useNavigate()
	const [selected, setSelected] = useState(0)
	const userLoged=useSelector((state:RootState)=>state.auth.userLogged)
	const navigator = (index: number) => {
		setSelected(index)
		switch (index) {

			case 0 :
				navigate('/director')
				break;
			case 1:
				navigate('/prof')
				break;
			case 2:
				navigate('/etudiant')
				break;
			case 3:
				navigate('/profilprof')
				break;
			case 4 :
				navigate('/history')
				break;
			case 5 :
				navigate('/stat')
				break;
			case 6:
				navigate('/siganl')
				break;
			case 7:
				localStorage.removeItem('user');
				dispatch(setUserLogged(''))
				dispatch(setLogged(false))
				dispatch(setLoading(false))
				break;
			default :
				navigate('/profilProf')
				break;
		}

	}
	const navigator3=(index:any)=>{

		setSelected(index)
		switch (index) {

			case 0 :
				navigate('/prof')
				break;
			case 1:
				navigate('/etudiant')
				break;
			case 2 :
				navigate('/profilProf')
				break;
			case 3 :
				navigate('/stat')
				break;
			case 4:
				navigate('/siganl')
				break;
			case 5:
				localStorage.removeItem('user');
				dispatch(setUserLogged(''))
				dispatch(setLogged(false))
				dispatch(setLoading(false))
				break;
			default :
				navigate('/profilProf')
				break;
		}

	}
	const dispatch=useDispatch()
	return (
		<div className={'siderBar'}>
			<div style={{height: '100px'}}/>
			<img alt={''} style={{position:'fixed',top:'10px',width:'100px'}} src={logo}/>
			{ userLoged?.user?.role==='admin'&& linksAdmin.map((item: any, index: number) => (
					<div className={`sidebarElement ${selected === index}`} onClick={() => navigator3(index)}>
						{item?.link}
					</div>
				)
			)}
			{ userLoged?.user?.role==='superAdmin'&& links.map((item: any, index: number) => (
					<div className={`sidebarElement ${selected === index}`} onClick={() => navigator(index)}>
						{item?.link}
					</div>
				)
			)}

		</div>
	)
}
export default SiderBarAdmin
