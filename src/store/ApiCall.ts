import axios, {AxiosError} from "axios";
import {store} from "./store";
import {setLoading} from "./modules/Auth/AuthModule";

export interface ApiCallInterface {
	data?: any,
	method: "get" | "put" | "post" | "delete" ;
	endPoint: string;
	successFunction?: Function
}

export const ApiCall = (config: ApiCallInterface) => {
	store.dispatch(setLoading(true))
	return new Promise((resolve, reject) => {
		axios({
			method: config.method,
			url: config.endPoint,
			data: config.method !== 'get'  ? config.data : null,
			params: config.method === 'get' ? config.data : null
		})
		.then((res) => {
			resolve(res.data);
			config.successFunction && config.successFunction(res.data);
			store.dispatch(setLoading(false))

		})
		.catch((err: AxiosError) => {
			console.log(err.message)
			store.dispatch(setLoading(false))
		});
	});
}