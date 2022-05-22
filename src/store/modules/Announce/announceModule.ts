import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface announceInterface {
	list_Announce:Array<any>
	list_Comment:Array<any>
	selectedAnnounce:any
	list_signal:Array<any>
	profAnnounce:Array<any>


}

const initialValues: announceInterface = {
	list_Announce:[],
	list_Comment: [],
	selectedAnnounce:undefined,
	list_signal:[],
	profAnnounce:[]

}
export const AnnounceStore = createSlice({
	name: "auth",
	initialState: initialValues,
	reducers: {
		setListAnnounce: (state, action: PayloadAction<any>) => {
			state.list_Announce=action.payload
		},
		setListComment: (state, action: PayloadAction<any>) => {
			state.list_Comment=action.payload
		},
		setSelectedAnnounce: (state, action: PayloadAction<any>) => {
			state.selectedAnnounce=action.payload
		},
		setListSignal: (state, action: PayloadAction<any>) => {
			state.selectedAnnounce=action.payload
		},
		setProfAnnounce: (state, action: PayloadAction<any>) => {
			state.profAnnounce=action.payload
		},


	}
})
export const {setListAnnounce,setListComment,setSelectedAnnounce,setListSignal,setProfAnnounce} = AnnounceStore.actions;