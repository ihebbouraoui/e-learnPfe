import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface directorInterface {
	list_director:Array<any>;
	selected_director?:any,
	listHistory:Array<any>
	selected_History?:any
    profNumber?:Number
	studentNumber?:Number
	formationNumber?:Number
	announceNumber?:Number
	postedBy?:any

}
const initialValues: directorInterface = {
	list_director:[],
	selected_director:undefined,
	listHistory:[],
	selected_History:undefined,
	profNumber:undefined,
	studentNumber:0,
	formationNumber:0,
	announceNumber:0,
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
		setFormationNumber:(state, action: PayloadAction<any>)=>{
			state.formationNumber=action.payload
		},
		setAnnounceNumber:(state, action: PayloadAction<any>)=>{
			state.announceNumber=action.payload
		},




	},

})
export const {setListDirector,setSelectedDirector,setListHistory,setSelectedHistory,setAnnounceNumber,setFormationNumber,setProfNumber,setStudentNumber,setPostedBy} = directorStore.actions;