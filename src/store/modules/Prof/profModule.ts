import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface profInterface {
	list_Prof:Array<any>;
	selected_Prof:any
	prof_class?:Array<any>
	subject?:any
	toDo:any
}
const initialValues: profInterface = {
	selected_Prof:undefined,
	list_Prof:[],
	prof_class:undefined,
	subject: undefined,
	toDo:undefined
}
export const profStore = createSlice({
	name: "root",
	initialState: initialValues,
	reducers: {
		setListProf:(state, action: PayloadAction<any>)=>{
			state.list_Prof=action.payload
		},
		setSelectedProf:(state,action:PayloadAction<any>)=>{
			state.selected_Prof=action.payload
		},
		setProfClass:(state,action:PayloadAction<any>)=>{
			state.prof_class=action.payload
		},
		setSubjectProf:(state,action:PayloadAction<any>)=>{
			state.subject=action.payload
		},
		setToDo:(state,action:PayloadAction<any>)=>{
			state.toDo=action.payload
		}

	},

})
export const {setListProf,setSelectedProf,setProfClass,setSubjectProf,setToDo} = profStore.actions;