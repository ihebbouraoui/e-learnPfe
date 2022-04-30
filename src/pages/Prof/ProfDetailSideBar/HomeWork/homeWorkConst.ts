import {TabConfigInterface} from "../../../../component/Tableau/tableauxForm";

export const HomeWorkTab: TabConfigInterface = {
	headers: [
		{
			label: 'اسم الواجب'
		},
		{
			label: 'المادة '
		},
		{
			label: 'الصف '
		},
		{
			label: 'العمليات '
		},
	],
	data: [

	],
	btnConfig: [
		{
			name: 'تنزيل الواجب ',
			style: 'btn-success',
		}

	]
}