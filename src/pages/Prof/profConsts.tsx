import {FilterConfigInterface} from "../../component/Filter/filterForm";
import {TabConfigInterface} from "../../component/Tableau/tableauxForm";
import {Navigate, useNavigate} from "react-router-dom";
import {profClicked} from "./Prof";
import {filterProf} from "../../store/modules/Prof/profService";

export const ProfFilterForm: FilterConfigInterface = {
	filterForm: [
		{
			type: 'text',
			label: 'الاسم',
			name: 'name'
		},
		{
			type: 'email',
			label: 'البريد الالكتروني',
			name: 'mail'
		},
		{
			type: 'number',
			label: 'رقم الهاتف',
			name: 'tel'
		},

	],
	onSubmit: (data: {[key:string]: string | number}) => {
		filterProf(data).then((res)=>{
		})	}
}

export const profTab: TabConfigInterface = {
	headers: [

		{
			label: 'الاسم استاذ'
		},
		{
			label: 'البريد الألكتروني'
		},  {
			label: 'رقم الهاتف'
		}, {
			label: 'العمليات'
		},
	],
	data: [
	],
	btnConfig: [
		{
			name:'تفاصيل',
			style:'btn-success',
			type: 'detail'
		},
		{
			name:'حذف',
			style:'btn-error',
			type: 'delete'
		}

	]
}
