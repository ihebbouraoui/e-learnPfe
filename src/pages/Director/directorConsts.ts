import {FilterConfigInterface} from "../../component/Filter/filterForm";
import {TabConfigInterface} from "../../component/Tableau/tableauxForm";
import {filterDirector, GetDirector} from "../../store/modules/Director/directorService";
import {useEffect} from "react";

export const DirectorFilterForm: FilterConfigInterface = {
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
			type: 'text',
			label: 'أسم المستخدم',
			name: 'username'
		},
		{
			type: 'number',
			label: 'رقم الهاتف',
			name: 'tel'
		},
	],
	onSubmit: (data: { [key: string]: string | number }) => {
		filterDirector(data).then()}

}

export const DirectorTab: TabConfigInterface = {
	headers: [
		{
			label: 'الاسم'
		},
		{
			label: 'اسم المتخدم'
		}, {
			label: 'البريد الألكتروني'
		}, {
			label: 'رقم الهاتف'
		}, {
			label: 'العمليات'
		},
	],

	data: [


	],
	btnConfig: [
		{
			name: 'تعديل',
			style: 'btn-success',
			type: 'detail',
		},
		{
			name: 'حذف',
			style: 'btn-error',
			type: 'delete'
		}

	]
}
