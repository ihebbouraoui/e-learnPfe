import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authStore} from "./modules/Auth/AuthModule";
import {directorStore} from "./modules/Director/directorModule";
import {profStore} from "./modules/Prof/profModule";
import {studentStore} from "./modules/Student/studentModule";
import {abonnementStore} from "./modules/Abonnement/abonnementModule";
import {transferStore} from "./modules/Transfer/transferModule";
import {settingStore} from "./modules/Setting/settingModule";
import {AnnounceStore} from "./modules/Announce/announceModule";

const rootReducer = combineReducers({
	auth:authStore.reducer,
	director:directorStore.reducer,
	prof:profStore.reducer,
	student:studentStore.reducer,
	abonnemment:abonnementStore.reducer,
	transfer:transferStore.reducer,
	setting:settingStore.reducer,
	announce:AnnounceStore.reducer
})

export const store = configureStore({
	reducer: rootReducer

})

export type RootState = ReturnType<typeof rootReducer>;

export const host='http://localhost:3002'