import {FilterConfigInterface} from "../../component/Filter/filterForm";
import {TabConfigInterface} from "../../component/Tableau/tableauxForm";
import {profClicked} from "../Prof/Prof";
import {etudiantClicked} from "./DetailEtudiant/detailEtudiant";
import {filterStudent} from "../../store/modules/Student/studentService";

export const EtudiantFormConsts: FilterConfigInterface = {
	filterForm: [
		{
			type: 'text',
			label: 'الاسم',
			name: 'name'
		},
		{
			type: 'email',
			label: 'البريد الالكتروني',
			name: 'mail'
		},
		{
			type: 'text',
			label: 'أسم المستخدم',
			name: 'username'
		},
		{
			type: 'number',
			label: 'رقم الهاتف',
			name: 'tel'
		},
	],


	onSubmit: (data: { [key: string]: string | number }) => {
		filterStudent(data).then()
	}

}
export const EtudiantClickedFilterForm:FilterConfigInterface={
	filterForm:[
		{
			type:"select",
			label:"اختر المادة",
			name:"المادة"
		},
		{
			type:"select",
			label:"اختر الترم",
			name:"الترم"
		}
	],
	onSubmit: (data: { [key: string]: string | number }) => {
		console.log(data)
	}
}



export const EtudiantTab: TabConfigInterface = {
	headers: [
		{
			label: 'الاسم'
		},
		{
			label: 'البريد الألكتروني'
		}, {
			label: 'رقم الهاتف'
		}, {
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
			name: 'حذف',
			style: 'btn-error',
			type: 'delete'

		}

	]
}
export const etudiantClickedd:etudiantClicked={
	data:[
		{
			nom:' احمد',
			class:'الثاني المتوسط 1 ',
			cin:"989887",
		}
	]

}