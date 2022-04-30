import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface studentInterface {
	list_student:Array<any>;
	selected_user:any
	class_user:any
	toDo:any
	mySubject:any
}
const initialValues: studentInterface = {
	list_student:[],
	selected_user:undefined,
	toDo:undefined,
	class_user: undefined,
	mySubject:undefined
}
export const studentStore = createSlice({
	name: "root",
	initialState: initialValues,
	reducers: {
		setListStudent:(state, action: PayloadAction<any>)=>{
			state.list_student=action.payload
		},
		setSelectedUser:(state, action: PayloadAction<any>)=>{
			state.selected_user=action.payload
		},
		setToDo:(state, action: PayloadAction<any>)=>{
			state.toDo=action.payload
		},
		setClassUser:(state, action: PayloadAction<any>)=>{
			state.class_user=action.payload
		},
		setSubject:(state, action: PayloadAction<any>)=>{
			state.mySubject=action.payload
		},


	},

})
export const {setListStudent,setSelectedUser,setToDo,setClassUser,setSubject} = studentStore.actions;