import {TabConfigInterface} from "../../component/Tableau/tableauxForm";

export const historyTabConst: TabConfigInterface = {
	headers: [
		{
			label: 'الوقت '
		},
		{
			label: ' اسم اليوزر'
		}, {
			label: ' الادمين '
		}, {
			label: 'العملية'
		},
		{
			label: 'العمليات'
		},
	],
	data: [
	],
	btnConfig: [
		{
			name: 'تفاصيل',
			style: 'btn-success',
			type: 'detail'
		},
		{
			name: 'ايقاف العماية',
			style: 'btn-error',
			type: 'delete'

		}

	]
}
