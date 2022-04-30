import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface authInterfrace {
	isLoading: boolean;
	isLogged:boolean;
	userLogged: any
	token:any,
	ListConversation:Array<any>
}

const initialValues: authInterfrace = {
	isLoading: false,
	isLogged:false,
	userLogged:undefined,
	token:undefined,
	ListConversation:[],
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
		setListConversation: (state, action: PayloadAction<any>) => {
			state.ListConversation = action.payload
		},




	}
})
export const {setLoading,setLogged,setUserLogged,setListConversation} = authStore.actions;