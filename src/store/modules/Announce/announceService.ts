import {ApiCall} from "../../ApiCall";
import {store} from "../../store";
import {
	setChecked,
	setListAnnounce,
	setListComment,
	setListSignal,
	setMySubmitAnnounce,
	setProfAnnounce
} from "./announceModule";
import {setLoading} from "../Auth/AuthModule";


export const getAnnounce=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/getAnnounce/",
		method:'get',
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setListAnnounce(res))
		}
	})
}
export const getAnnounceByIdProf=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/getAnnounceById/",
		method:'get',
		data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setProfAnnounce(res))
		}
	})
}
export const addComment=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/addComment/",
		method:'post',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}
export const newFormation=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/newFormation/",
		method:'post',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}
export const checkIfSubmited=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/checkFormation/",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setChecked(res))
		}
	})
}
export const getSubmitFormation=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/getMyFormationById/",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setMySubmitAnnounce(res))
		}
	})
}



export const getCommentByIdAnnounce=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/getComment/",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setListComment(res))
		}
	})
}
export const signaler=(data:any)=>{
	console.log(data)
	return ApiCall({
		endPoint:"http://localhost:3002/announce/signal/",
		method:'post',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
		}
	})
}
export const getSignal=()=> {
	return ApiCall({
			endPoint: "http://localhost:3002/announce/getSignal/",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setLoading(true))
			store.dispatch(setListSignal(res))
		}
	})
}
export const postComment=(data:any)=> {
	return ApiCall({
		endPoint: "http://localhost:3002/announce/newCommentaire",
		method: 'put',
		data:data,
		successFunction: (res: any) => {
			store.dispatch(setLoading(true))
		}
	})
}

export const addAnnounce=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/announce/newAnnounce",
		method:'post',
		data:data,
	})
}
