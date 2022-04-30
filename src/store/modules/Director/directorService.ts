import {ApiCall} from "../../ApiCall";
import {host, store} from "../../store";
import {setListDirector, setListHistory, setPostedBy, setProfNumber, setStudentNumber} from "./directorModule";
import {setLoading} from "../Auth/AuthModule";

export const GetDirector = () => {
	return ApiCall({
		endPoint: host+"/director",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListDirector(res))
			store.dispatch(setLoading(true))
		},
	})
}

export const filterDirector=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/director/filterDirector",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setListDirector(res))
			store.dispatch(setLoading(true))
		}
	})
}

export const deleteDirector=(id:any)=>{
	return ApiCall({
		endPoint:host+`/director/delete/${id}`,
		method:'delete',
	});
}

export const updateDirectorWithMail=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/director/updateDirector/",
		method:'put',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}
export const getHistory=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/getHistory",
		method:'get',
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setListHistory(res))
		}
	})
}
export const getHistoryById=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/getHistoryById/",
		method:'get',
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setListHistory(res))
		}
	})
}

export const blockDelete=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/blockDelete",
		method:'put',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}
export const deleteWithMail=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/deleteWithMail",
		method:'delete',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}

export const deleteHistory=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/deleteHistory/",
		method:'delete',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	});
}

export const getProfNumber=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/getProfNumber",
		method:'get',
		successFunction:(res:any)=>{
			store.dispatch(setProfNumber(res))
			store.dispatch(setLoading(true))
		}
	})
}
export const getStudentNumber=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/getStudentNumber",
		method:'get',
		successFunction:(res:any)=>{
			store.dispatch(setStudentNumber(res))
			store.dispatch(setLoading(true))
		}
	})
}
export const getUserById=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/user/getUserById",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setPostedBy(res))
			store.dispatch(setLoading(true))
		}
	})
}


