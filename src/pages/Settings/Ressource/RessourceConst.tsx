import {FilterConfigInterface} from "../../../component/Filter/filterForm";
import {TabConfigInterface} from "../../../component/Tableau/tableauxForm";

export const RessourceFormConst: FilterConfigInterface = {
	filterForm: [
		{
			type: 'textarea',
			label: 'ادخل اسم المادة ...',
			name: 'title'
		},

	],
	onSubmit: (data: { [key: string]: string | number }) => {
		console.log(data)
	}
}
export const ressourceTab: TabConfigInterface = {
	headers: [
		{
			label: 'الاسم المادة'
		},
		{
			label: 'المعمليات '
		},
	],
	data: [
	],
	btnConfig: [
		{
			name: 'تعديل',
			style: 'btn-success',
			type:'detail'
		},
		{
			name: 'حذف',
			style: 'btn-error',
			type:'delete'
		}

	]
}