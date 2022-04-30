import {FilterConfigInterface} from "../../../component/Filter/filterForm";

export const PriceFormConst: FilterConfigInterface = {
	filterForm: [
		{
			type: 'textarea',
			label: '10 ريال سعودي ',
			name: 'name'
		},
		{
			type: 'textarea',
			label: '10 ريال سعودي ',
			name: 'name'
		},
		{
			type: 'textarea',
			label: '10 ريال سعودي ',
			name: 'name'
		},

	],
	onSubmit: (data: {[key:string]: string | number}) => {
		console.log(data)
	}
}