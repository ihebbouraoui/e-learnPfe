import {ApiCall} from "../../ApiCall";
import {host, store} from "../../store";
import {setLoading, setUserLogged} from "../Auth/AuthModule";
import {setListProf, setSelectedProf, setSubjectProf} from "./profModule";

export const getProf = () => {
	return ApiCall({
		endPoint: host+"/prof",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListProf(res))
			store.dispatch(setLoading(true))
		},
	})
}
export const getProfWithStatus=()=>{
	return ApiCall({
		endPoint: host+"/prof/prof",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListProf(res))
			store.dispatch(setLoading(true))
		},
	})
}
export const deleteProf=(data:any)=>{
	return ApiCall({
		endPoint:host+"/prof/delete/prof/",
		method:'put',
		data:data,
		successFunction: (res: any) => {
			store.dispatch(setLoading(true))
		},
	});
}
export const updateProf=(data:any,id:any)=>{
	return ApiCall({
		endPoint:`http://localhost:3002/prof/modifier/${id}`,
		method:'put',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setLoading(true))
			store.dispatch(setUserLogged(res))
		}
	});
}


export const filterProf=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/prof/filterProf",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setListProf(res))
			store.dispatch(setLoading(true))
		}
	})
}

export const getClassByIdProf=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/class/getClassByIdProf",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setSelectedProf(res))
            store.dispatch(setLoading(true))
		}
	})
}

export const getSubjectByIdProfAndClassId=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/subject/getSubjectProfByClass",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setSubjectProf(res))
			store.dispatch(setLoading(true))

		}
	})
}


export const getToDoProfTest=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/toDo/getProfToDoTest",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setSubjectProf(res))
			store.dispatch(setLoading(true))
		}
	})
}

export const getToDoProfExam=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/toDo/getProfToDoExam",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setSubjectProf(res))
			store.dispatch(setLoading(true))
		}
	})
}
