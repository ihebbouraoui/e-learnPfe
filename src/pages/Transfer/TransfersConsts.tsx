import {FilterConfigInterface} from "../../component/Filter/filterForm";
import {TabConfigInterface} from "../../component/Tableau/tableauxForm";

export const TransferFilterForm: FilterConfigInterface = {
	filterForm: [
		{
			type: 'text',
			label: 'رقم التحويل',
			name: 'ref'
		},
		{
			type: 'text',
			label: 'المشتري',
			name: 'vendor_name'
		},
		{
			type: 'text',
			label: ' البائع',
			name: 'Purchaser_name'
		},
		{
			type: 'text',
			label: 'تاريخ الطلب ',
			name: 'date_command'
		},
		{
			type: 'number',
			label: ' السعر',
			name: 'price'
		},
		{
			type: 'text',
			label: ' الحالة',
			name: 'type'
		},

	],
	onSubmit: (data: { [key: string]: string | number }) => {
		console.log(data)
	}
}
export const TransferTab: TabConfigInterface = {
	headers: [
		{
			label: 'رقم التحويل'
		},
		{
			label: 'البائع'
		},
		{
			label: ' المشتري'
		}, {
			label: 'السعر '
		}, {
			label: 'الحالة'
		},
		{
			label: 'تاريخ الطلب'
		}, {
			label: 'العمليات'
		},
	],
	data: [
		{
			name: 'محمد صالح ',
			email: 'احمد صالح ',
			phone: ' 20ريال  ',
			etat: ' غير مسدد',
			date: '  10/12/2022',
		},
		{
			name: 'محمد صالح ',
			email: 'احمد صالح ',
			phone: ' 20ريال  ',
			etat: ' غير مسدد',
			date: '  10/12/2022',
		},
		{
			name: 'محمد صالح ',
			email: 'احمد صالح ',
			phone: ' 20ريال  ',
			etat: ' غير مسدد',
			date: '  10/12/2022',
		},
	],
	btnConfig: [
		{
			name: 'تفاصيل',
			style: 'btn-success',
			type: 'detail'

		},


	]
}