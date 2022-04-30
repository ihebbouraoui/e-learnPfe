import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface abonnementInterface {
	list_abonnement:Array<any>


}

const initialValues: abonnementInterface = {
	list_abonnement:[]

}
export const abonnementStore = createSlice({
	name: "auth",
	initialState: initialValues,
	reducers: {
		setListAbonnement: (state, action: PayloadAction<any>) => {
			state.list_abonnement=action.payload
		},

	}
})
export const {setListAbonnement} = abonnementStore.actions;