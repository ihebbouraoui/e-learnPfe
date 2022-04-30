import {FilterConfigInterface} from "../../component/Filter/filterForm";
import {TabConfigInterface} from "../../component/Tableau/tableauxForm";
import {filterAbonnement} from "../../store/modules/Abonnement/abonnementService";

export const AbonnementFormConst: FilterConfigInterface = {
	filterForm: [
		{
			type: 'number',
			label: 'رقم الأشتراك',
			name: 'num'
		},
		{
			type: 'number',
			label: 'المدة',
			name: 'duration'
		},
		{
			type: 'number',
			label: 'القيمة',
			name: 'value'
		},
		{
			type: 'date',
			label: 'تاريخ الأشتراك',
			name: 'subscribe_start'

		},
		{
			type: 'date',
			label: 'تاريخ الأنتهاء',
			name: 'subscribe_end'
		},
		{
			type: 'text',
			label: ' المدة المتبقية',
			name: 'rest_duration'
		},

	],
	onSubmit: (data: { [key: string]: string | number }) => {
		filterAbonnement(data).then()
	},

}
export const AbonnementTab: TabConfigInterface = {
	headers: [
		{
			label: 'رقم الأشتراك'
		},

		{
			label: 'اسم المعلم'
		},
		{
			label: 'المدة'
		}, {
			label: 'القيمة'
		}, {
			label: 'تاريخ الشتراك'
		}, {
			label: 'تاريخ الانتهاء'
		},
		{
			label: 'المدة المتبقية'
		},
	],
	data: [
	],
	btnConfig: []

}