import {TabConfigInterface} from "../../component/Tableau/tableauxForm";

export const historyTabConst: TabConfigInterface = {
	headers: [
		{
			label: 'الوقت '
		},
		{
			label: ' الادمين'
		}, {
			label: ' اسم المستخدم '
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
			name: 'ايقاف العماية',
			style: 'btn-error',
			type: 'delete'

		}

	]
}
