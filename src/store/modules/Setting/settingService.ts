import {ApiCall} from "../../ApiCall";
import {host, store} from "../../store";
import {setLoading} from "../Auth/AuthModule";
import { setListClass,  setListSubject} from "./settingModule";

// api Chapter
export const deleteClass=(id:any)=>{
	return ApiCall({
		endPoint:host+`/prof/chapter/delete/${id}`,
		method:'delete',
	});
}


// api Resource
export const getSubject = () => {
	return ApiCall({
		endPoint: "http://localhost:3002/subject/getSubject",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListSubject(res))
			store.dispatch(setLoading(true))
		},
	})
}
export const deleteSubject=(id:any)=>{
	return ApiCall({
		endPoint:host+`/prof/resource/delete/${id}`,
		method:'delete',
	});
}


export  const getClass=()=>{
	return ApiCall({
		endPoint:"http://localhost:3002/class/getClass",
		method:'get',
		successFunction:(res:any)=>{
			store.dispatch(setListClass(res))
			store.dispatch(setLoading(true))
		}
	})
}

