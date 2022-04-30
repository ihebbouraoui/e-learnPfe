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
const NavbarStudent=()=>{
	const logout=()=>{
		store.dispatch(setLogged(false))
		store.dispatch(setLoading(true))
		store.dispatch(setUserLogged(''))

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
	<Header>
		<div className="menu">
			<li> <NavLink to={'/home'}> الرئيسية </NavLink> </li>
			<li><NavLink to={'/chat'}> دردشة </NavLink> </li>
			<li><NavLink to={'/social_media'}> تواصل </NavLink> </li>
			<li><NavLink to={'/home'}> من نحن </NavLink> </li>
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