import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface settingInterface {
	list_Subject:Array<any>
	list_Class:Array<any>


}

const initialValues: settingInterface = {
	list_Class:[],
	list_Subject:[]

}
export const settingStore = createSlice({
	name: "auth",
	initialState: initialValues,
	reducers: {

		setListSubject: (state, action: PayloadAction<any>) => {
			state.list_Subject=action.payload
		},
		setListClass: (state, action: PayloadAction<any>) => {
			state.list_Class=action.payload
		},

	}
})
export const {setListSubject,setListClass} = settingStore.actions;