import React, {useEffect, useState} from "react";
import FilterForm from "../../component/Filter/filterForm";
import {AbonnementFormConst, AbonnementTab} from "./abonnementConts";
import TabForm from "../../component/Tableau/tableauxForm";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getAbonnements} from "../../store/modules/Abonnement/abonnementService";

const Abonnement = () => {
	  const list_Abonnement=useSelector((state:RootState)=>state.abonnemment.list_abonnement)
	const [tableModel, setTableModel] = useState(AbonnementTab)

	useEffect(()=>{
			 getAbonnements().then((res:any)=>{
				 initTable(res)
			  })

		 },[])
	useEffect(()=>{
		initTable(list_Abonnement)
		console.log(list_Abonnement)
	},[list_Abonnement])

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item:any) => ({
			num:item.num,
			name: item.userId.name,
			duration:item.duration,
			value:item.value,
			subscribe_start:item.subscribe_start,
			subscribe_end:item.subscribe_end,
			rest_duration:item.rest_duration
		}))
		setTableModel({...temp})
	}

	return (
		<div className={'directorMain'}>
			<FilterForm filterData={AbonnementFormConst}/>
			<TabForm filterData={{...tableModel }}/>
		</div>
	)
}
export default Abonnement