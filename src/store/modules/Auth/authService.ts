import {ApiCall} from "../../ApiCall";
import {store} from "../../store";
import {setLoading, setLogged, setUserLogged} from "./AuthModule";

export const AuthLogin=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login",
		method:'post',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setUserLogged(res))
			store.dispatch(setLoading(true))
			store.dispatch(setLogged(true))

		}
	})
}
export const signUpUser=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/addUser/",
		method:"post",
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}
export const setUserToHistory=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/addUserToHistory/",
		method:'post',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))	}
	})
}



