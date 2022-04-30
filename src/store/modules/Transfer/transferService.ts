import {ApiCall} from "../../ApiCall";
import {host, store} from "../../store";
import {setLoading} from "../Auth/AuthModule";
import {setListProf} from "../Prof/profModule";
import {setListTransfer} from "./transferModule";


export const getTransfer = () => {
	return ApiCall({
		endPoint: host+"/transfer/getTransfer",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListTransfer(res))
			store.dispatch(setLoading(true))
		},
	})
}

