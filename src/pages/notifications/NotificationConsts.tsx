import {FilterConfigInterface} from "../../component/Filter/filterForm";
import {TabConfigInterface} from "../../component/Tableau/tableauxForm";

export const NotificationFormConst: FilterConfigInterface = {
	filterForm: [
		{
			type: 'textarea',
			label: 'نص الاشعار',
			name: 'name'
		},
		{
			type: 'select',
			label: ' الكل',
			name: 'last_name'
		},

	],
	onSubmit: (data: { [key: string]: string | number }) => {
		console.log(data)
	}
}
export const NotificationTab: TabConfigInterface = {
	headers: [
		{
			label: 'المعرف'
		},
		{
			label: 'نص الأشعار '
		}, {
			label: 'رقم الهاتف '
		},

	],
	data: [
		{
			name: ' #123456 ',
			email: 'نص الاشعار ............ ',
			phone: ' الساتذة  ',
		},
		{

			name: ' #123456 ',
			email: 'نص الاشعار ............ ',
			phone: ' الساتذة  ',
		},
		{

			name: ' #123456 ',
			email: 'نص الاشعار ............ ',
			phone: ' الساتذة  ',
		},
	],
	btnConfig: []
}