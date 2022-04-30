import {ApiCall} from "../../ApiCall";
import {host, store} from "../../store";
import {setLoading} from "../Auth/AuthModule";
import {setClassUser, setListStudent, setSubject, setToDo} from "./studentModule";

export const getStudent = () => {
	return ApiCall({
		endPoint: host+"/student",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListStudent(res))
			store.dispatch(setLoading(true))
		},
	})
}
export const getStudentWithStatus=()=>{
	return ApiCall({
		endPoint: host+"/student/student",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListStudent(res))
			store.dispatch(setLoading(true))
		},
	})
}
export const deleteStudent=(id:any)=>{
	return ApiCall({
		endPoint:host+`/student/delete/${id}`,
		method:'delete',
	});
}


export const filterStudent=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/student/filterStudent",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setListStudent(res))
			store.dispatch(setLoading(true))
		}
	})
}
export const getClassById=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/class/getClassByIdStudent",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setClassUser(res))
			store.dispatch(setLoading(true))
		}
	})
}


export const getMySubject=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/subject/getSubject",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setSubject(res))
			store.dispatch(setLoading(true))
		}
	})
}
export const getToDoExam=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/toDo/getToDoExam",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setToDo(res))
			store.dispatch(setLoading(true))
		}
	})
}
export const getToDoTest=(data:any)=>{
	return ApiCall({
		endPoint:"http://localhost:3002/toDo/getToDoTest",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setToDo(res))
			store.dispatch(setLoading(true))
		}
	})
}





