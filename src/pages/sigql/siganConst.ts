import {TabConfigInterface} from "../../component/Tableau/tableauxForm";

export const signalTabConst: TabConfigInterface = {
	headers: [
		{
			label: 'الوقت '
		},
		{
			label: ' اسم الحاضر '
		}, {
			label: ' اسم المحضور  '
		},
		{
			label: 'السبب'
		},
		{
			label: 'معطيات حول الشكوى'
		},
		{
			label: 'العملية'
		},

	],
	data: [
	],
	btnConfig: [
		{
			name: 'حضر',
			style: 'btn-success',
			type: 'detail'
		},
		// {
		// 	name: 'ايقاف العماية',
		// 	style: 'btn-error',
		// 	type: 'delete'
		//
		// }

	]
}
