import {TabConfigInterface} from "../../../component/Tableau/tableauxForm";

export const myClassTab: TabConfigInterface = {
	headers: [
		{
			label: 'القسم'
		},
		{
			label:'العمليات'
		}

	],
	data: [
	],
	btnConfig: [
		{
			name: 'تفاصيل',
			style: 'btn-success',
			type: 'detail'
		},
	]
}