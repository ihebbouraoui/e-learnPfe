import {ApiCall} from "../../ApiCall";
import {store} from "../../store";
import {setAllMessage, setLoading, setLogged, setUserLogged} from "./AuthModule";
import {setAnnounceNumber, setFormationNumber, setProfNumber, setStudentNumber} from "../Director/directorModule";

export const AuthLogin=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login",
		method:'post',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setUserLogged(res))
			store.dispatch(setLoading(true))
			store.dispatch(setLogged(true))

		},
		errorFunction:(res:any)=>{
			console.log(res)
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
		},
		errorFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		},
	})
}
export const checkPhone=(data:any)=>{
	return ApiCall({
		endPoint:`http://localhost:3002/director/checkPhone`,
		method:"get",
		data:data
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
export const upload=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/uploadFile",
		method:'post',
		data:data,
		headers: {
			"Content-Type": "multipart/form-data",
		},
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))

		}
	})
}
export const setMessage=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/message/testMessage",
		method:'post',
		data:data,
	})
}
export const sendMail=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login/sendMail",
		method:'post',
		data:data,
	})
}
export const getMessage=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/message/",
		method:'get',
		successFunction:(res:Array<any>)=>{
			store.dispatch(setAllMessage(res));
		},
	})
}
export const getNumberProf=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login/getNumberProf",
		method:'get',
		successFunction:(res:Array<any>)=>{
			store.dispatch(setProfNumber(res));
		},
	})
}
export const getNumberStudent=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login/getNumberStudent",
		method:'get',
		successFunction:(res:Array<any>)=>{
			store.dispatch(setStudentNumber(res));
		},
	})
}
export const getNumberFormation=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login/getNumberFormation",
		method:'get',
		successFunction:(res:Array<any>)=>{
			store.dispatch(setFormationNumber(res));
		},
	})
}
export const getNumberAnnounce=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/login/getNumberAnnounce",
		method:'get',
		successFunction:(res:Array<any>)=>{
			store.dispatch(setAnnounceNumber(res));
		},
	})
}



