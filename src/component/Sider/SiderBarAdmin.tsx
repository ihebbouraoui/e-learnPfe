import React, {useState} from "react";
import './SideBar.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setUserLogged} from "../../store/modules/Auth/AuthModule";

const SiderBarAdmin = () => {
	const links = [
		{link: "المديرين"},
		{link: 'الاساتدة'},
		{link: 'الطلبة'},
		{link: 'معلوماتي'},
		{link: 'أثر'},
		{link: 'إحصائيات'},
		{link: 'الأبلاغ'}

	]
	const linksAdmin = [
		{link:'معلوماتي'},
		{link: 'الاساتدة'},
		{link: 'الطلبة'},
		{link: 'الشكاوي'},
		{link: 'إحصائيات'}
	]
	 const linksProf=[
		{link:"معلوماتي"},
		{link: 'اقسامي'},
		{link: 'مشاركاتي'},
		{link: 'دردشة'},
	]
	const linksStudent=[
		{link:"حسابي"},
		{link: ' اعدادت'},
		{link: 'مشاركاتي'},
		{link: 'دردشة'},
		{link: 'تواصل'},
		{link: 'خروج'},


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
		}

	}
	const navigator2 = (index: number) => {
		setSelected(index)
		switch (index) {

			case 0 :
				navigate('/profilProf')
				break;
			case 1:
				navigate('/myClass')
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
				navigate('/profilProf')
				break;
			case 1:
				navigate('/prof')
				break;
			case 2 :
				navigate('/etudiant')
				break;

			default :
				navigate('/profilProf')
				break;
		}

	}
	const dispatch=useDispatch()
	const navigator4=(index:any)=>{

		setSelected(index)
		switch (index) {

			case 0 :
				navigate('/profilProf')
				break;
			case 1:
				navigate('/prof')
				break;
			case 2 :
				navigate('/etudiant')
				break;
			case 3:
				navigate('/etudiant')
				break;
			case 4 :
				navigate('/social_media')
				break;
			case 5 :
				dispatch(setUserLogged(''))
				break;

			default :
				navigate('/profilProf')
				break;
		}

	}
	return (
		<div className={'siderBar'}>
			<div style={{height: '100px'}}/>

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

			{ userLoged?.user?.role==='prof'&& linksProf.map((item: any, index: number) => (
					<div className={`sidebarElement ${selected === index}`} onClick={() => navigator2(index)}>
						{item?.link}
					</div>
				)
			)}
			{ userLoged?.user?.role==='student'&& linksStudent.map((item: any, index: number) => (
					<div className={`sidebarElement ${selected === index}`} onClick={() => navigator4(index)}>
						{item?.link}
					</div>
				)
			)}

		</div>
	)
}
export default SiderBarAdmin
