import React from "react";
import {NavLink} from "react-router-dom";
import './homeComp.css'
const NavbarHome=()=>{
	return(
		<div className={'navHome'}>
			<NavLink to={'/login'}> دخول</NavLink>
			<NavLink to={'/signup'}> تسجيل حساب</NavLink>
		</div>
	)
}
export default NavbarHome