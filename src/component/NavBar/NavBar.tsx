import React from "react";
import './Navbar.css'
import {useSelector} from "react-redux";
import {RootState, store} from "../../store/store";
import {setLoading, setLogged, setUserLogged} from "../../store/modules/Auth/AuthModule";
import {Button} from "antd";

const NavBar = () => {

	const userConnected = useSelector((state: RootState) => state.auth.userLogged)

const logout=()=>{
	store.dispatch(setLogged(false))
	store.dispatch(setLoading(true))
	store.dispatch(setUserLogged(''))

}
	console.log(userConnected)

	return (
		<div>
			<div className={'navbar'}>

				<div className={'path'}>
				 <p  style={{fontSize:"larger"}} > مرحبا بك {userConnected.user.name}</p>
				</div>
				<div   className={'logout'} >
					<Button style={{fontSize:"larger"}}  type={'link'} onClick={()=>logout()}>
						 logout
					</Button>


				</div>

			</div>
			<div style={{height: '50px'}}/>

		</div>
	)
}
export default NavBar