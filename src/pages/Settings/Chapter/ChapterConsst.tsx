import {FilterConfigInterface} from "../../../component/Filter/filterForm";
import {TabConfigInterface} from "../../../component/Tableau/tableauxForm";

export const SeasonFormConst: FilterConfigInterface = {
	filterForm: [
		{
			type: 'textarea',
			label: 'ادخل اسم الفصل ...',
			name: 'title'
		},

	],
	onSubmit: (data: { [key: string]: string | number }) => {
		console.log(data)
	}
}
export const chapterTab: TabConfigInterface = {
	headers: [
		{
			label: 'الاسم الفصل'
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