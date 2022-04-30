import {ApiCall} from "../../ApiCall";
import {host, store} from "../../store";
import {setListAbonnement} from "./abonnementModule";
import {setLoading} from "../Auth/AuthModule";
import {setListProf} from "../Prof/profModule";


export const getAbonnements = () => {
	return ApiCall({
		endPoint: host+"/prof/abonnement",
		method: 'get',
		successFunction: (res: any) => {
			store.dispatch(setListAbonnement(res))
			store.dispatch(setLoading(true))
		},
	})
}

export const filterAbonnement=(data:any)=>{
	return ApiCall({
		endPoint:host+"/prof/filterAbonnement",
		method:'get',
		data:data,
		successFunction:(res:any)=>{
			store.dispatch(setListAbonnement(res))
			store.dispatch(setLoading(true))
		}
	})

}