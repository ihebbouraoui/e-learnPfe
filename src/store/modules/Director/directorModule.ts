import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface directorInterface {
	list_director:Array<any>;
	selected_director?:any,
	listHistory:Array<any>
	selected_History?:any
    profNumber?:Number
	studentNumber:Number
	postedBy?:any

}
const initialValues: directorInterface = {
	list_director:[],
	selected_director:undefined,
	listHistory:[],
	selected_History:undefined,
	profNumber:undefined,
	studentNumber:0,
	postedBy:undefined
}
export const directorStore = createSlice({
	name: "root",
	initialState: initialValues,
	reducers: {
		setListDirector:(state, action: PayloadAction<any>)=>{
			state.list_director=action.payload
		},
		setSelectedDirector:(state, action: PayloadAction<any>)=>{
			state.selected_director=action.payload
		},
		setListHistory:(state, action: PayloadAction<any>)=>{
			state.listHistory=action.payload
		},
		setSelectedHistory:(state, action: PayloadAction<any>)=>{
			state.selected_History=action.payload
		},
		setProfNumber:(state, action: PayloadAction<any>)=>{
			state.profNumber=action.payload
		},
		setStudentNumber:(state, action: PayloadAction<any>)=>{
			state.studentNumber=action.payload
		},
		setPostedBy:(state, action: PayloadAction<any>)=>{
			state.postedBy=action.payload
		},




	},

})
export const {setListDirector,setSelectedDirector,setListHistory,setSelectedHistory,setProfNumber,setStudentNumber,setPostedBy} = directorStore.actions;