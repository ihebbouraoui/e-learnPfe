import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface authInterfrace {
	isLoading: boolean;
	isLogged:boolean;
	userLogged: any
	token:any,
	message:Array<any>
	listConversation:any
}

const initialValues: authInterfrace = {
	isLoading: false,
	isLogged:false,
	userLogged:undefined,
	token:undefined,
	message:[],
	listConversation:undefined

}
export const authStore = createSlice({
	name: "auth",
	initialState: initialValues,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setLogged: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload
		},
		setUserLogged: (state, action: PayloadAction<any>) => {
			state.userLogged = action.payload
		},
		setAllMessage: (state, action: PayloadAction<any>) => {
			state.message = action.payload
		},
		setConv: (state, action: PayloadAction<any>) => {
			state.listConversation = action.payload
		},





	}
})
export const {setLoading,setLogged,setUserLogged,setAllMessage,setConv} = authStore.actions;