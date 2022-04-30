import React, {useEffect, useRef} from "react";
import './filter.css'

export interface FormInput {
	name: string;
	label: string;
	type: 'number' | 'text' | 'email' | 'date' | 'select' | 'textarea' | 'checkbox';
}


export interface FilterConfigInterface {
	filterForm: Array<FormInput>,
	onSubmit: Function
}

const FilterForm: React.FC<{ filterData?: FilterConfigInterface}> = ({filterData}) => {

	const filterFormToSubmit = useRef<{ [key: string]: string | number }>({})
	useEffect(() => {
		filterData?.filterForm.forEach((item) => {
			filterFormToSubmit.current[item.name] = ''
		})
	}, [])
	const formHasChanged = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		filterFormToSubmit.current[name] = event.target.value.trim();
		Object.keys(filterFormToSubmit.current).forEach((key) => {
			if (filterFormToSubmit.current[key] === null || filterFormToSubmit.current[key]?.toString()?.trim() === '') {
				filterFormToSubmit.current[key] = ''
			}
		})
	}


	return (
		<div className={'filterContainer'}>
			<div className={'filterFormGrid'}>
				{
					filterData?.filterForm.map((item) => {
						switch (item.type) {
							case "text":
							case "number":
							case "email":
							case "date":
							case "select":
							case "textarea":
								return (
									<input className={''} key={item.name} type={item.type} placeholder={item.label}
										   onChange={(e) => formHasChanged(e, item.name)}

									/>
								);
							default:
								break;
						}

					})
				}
			</div>


			 <div className={'btnCont'}>
                <button className={'btn-success'}
                        onClick={() => filterData?.onSubmit(filterFormToSubmit.current)}> البحث
                </button>
                <button className={'btn-error'} onClick={() => console.log('ok')}>الغاء البحث</button>
            </div>
		</div>
	)
}
export default FilterForm