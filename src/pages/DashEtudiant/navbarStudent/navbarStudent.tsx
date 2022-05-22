import React from "react";
import {Header} from "antd/es/layout/layout";
import {NavLink} from "react-router-dom";
import {setLoading, setLogged, setUserLogged} from "../../../store/modules/Auth/AuthModule";
import {store} from "../../../store/store";
// @ts-ignore
import profil from '../../../assets/account-svgrepo-com.svg'
// @ts-ignore
import message from '../../../assets/message-svgrepo-com.svg'
// @ts-ignore
import {Button} from "antd";
// @ts-ignore
import mesMessage from '../../../assets/open-email-message-svgrepo-com.svg'
import "./navbarStudent.css"
import {useDispatch} from "react-redux";
const NavbarStudent=()=>{
	const dispatch=useDispatch()
	const logout=()=>{
		localStorage.removeItem('user');
		dispatch(setUserLogged(''))
		dispatch(setLogged(false))
		dispatch(setLoading(false))

	}
	return(
	// 	<Header>
    //     <div className={'navbar'}>
	// 		 <div className={'navigation'}>
	// 			 {/*<NavLink to={'/profilProf'}> <img*/}
	// 				{/* src={profil}*/}
	// 				{/* alt={''} style={{fontSize: '30px', width: 60, height: 40}}*/}
	// 				{/* className={'homeHome'}/>*/}
	// 			 {/*</NavLink>*/}
	// 			 <NavLink to={'/message'}> <img
	// 				 src={mesMessage}
	// 				 alt={''} style={{fontSize: '30px', width: 60, height: 40}}
	// 				 className={'myMessage'}/>
	// 			 </NavLink>
	// 			 <NavLink to={'/social_media'}>
	// 				 <img src={message} style={{fontSize: '30px', width: 60, height: 40}}  alt={''}/>
	// 			 </NavLink>
	// 		 </div>
	// 		<div className={'logout'}>
	// 			<Button type={'link'}  style={{color:"white",fontWeight:'bolder',fontSize:'20px',position:'relative',bottom:'10px'}} onClick={()=>logout()}> خروج </Button>
	// 		</div>
	// 		<NavLink to={'/chat'}> <img
	// 			src={profil}
	// 			alt={''} style={{fontSize: '30px', width: 60, height: 40}}
	// 			className={'homeHome'}/>
	// 		</NavLink>
	//
	// 	</div>
	// 	</Header>
	// )
<div>
	<Header style={{
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 99,
		width: '100vw',
		height: '70px',
		boxShadow: '0px 6px 20px 0px #d5d5d5'
	}}>
		<div className="menu">
			<li> <NavLink to={'/social_media'}> الرئيسية </NavLink> </li>
			<li><NavLink to={'/chat'}> دردشة </NavLink> </li>
			<li><NavLink to={'/social_media'}> تواصل </NavLink> </li>
			<li><NavLink to={'/home'}> من نحن </NavLink> </li>
			<li><NavLink to={'/message'}> message </NavLink> </li>

			<li className="services">
				<a href="/"><NavLink to={'/home'}> تعديل </NavLink> </a>
				<ul className="dropdown">
					<li> <NavLink to={'/profilProf'}> معلوماتي </NavLink> </li>
					<li onClick={()=>logout()}> <NavLink to={'/logout'}> تسجيل الخروج </NavLink>  </li></ul>
			</li>
		</div>
	</Header>

</div>
	)
}
export default NavbarStudent