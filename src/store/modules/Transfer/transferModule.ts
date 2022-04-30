import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface transferInterface {
	list_transfer:Array<any>


}

const initialValues: transferInterface = {
	list_transfer:[]

}
export const transferStore = createSlice({
	name: "auth",
	initialState: initialValues,
	reducers: {
		setListTransfer: (state, action: PayloadAction<any>) => {
			state.list_transfer=action.payload
		},

	}
})
export const {setListTransfer} = transferStore.actions;