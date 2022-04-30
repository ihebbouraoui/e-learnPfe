import React, {useEffect, useState} from "react";
import FilterForm from "../../component/Filter/filterForm";
import {TransferFilterForm, TransferTab} from "./TransfersConsts";
import TabForm from "../../component/Tableau/tableauxForm";
import ModalComp from "../../component/Modal/modalComp";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {AbonnementTab} from "../Abonnement/abonnementConts";
import {getAbonnements} from "../../store/modules/Abonnement/abonnementService";
import {getTransfer} from "../../store/modules/Transfer/transferService";


const Transfer = () => {
	const   [isModal,setModal]=useState(false)
	const closeEvent=()=>{
		setModal(false)
	}
	const openModal=()=> {
		setModal(true)
	}
	const list_Transfer=useSelector((state:RootState)=>state.transfer.list_transfer)
	const [tableModel, setTableModel] = useState(TransferTab)

	useEffect(()=>{
		getTransfer().then((res:any)=>{
			initTable(res)
		})

	},[])
	useEffect(()=>{
		initTable(list_Transfer)
	},[list_Transfer])

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item:any) => ({
			ref:item.ref,
			vendor_name: item.vendorId?.name,
			Purchaser_name:item.PurchaserId.name,
			price:item.price,
			type:item.type,
			date_command:item.date_command
		}))
		setTableModel({...temp})
	}




	const DetailTransfer=()=> {
		return (
			<div className={'detailTransfer'}>
				<div className={'methodePaiment'}>
					<h3> طريقة السداد</h3>

				 	<input  type={'radio'}/>
					<input type={'radio'}/>
					<input type={'radio'}/>

				</div>
				<div className={'comm'}>
					<h3> طريقة السداد</h3>

					<textarea style={{width:'100%',border:'unset',resize:'none'}} rows={5} placeholder={'الملاحضات'} />
				</div>
				<div>
					<button className={'btn-success'}> حفظ</button>
				</div>

			</div>
		)
	}

		return (
		<div className={'directorMain'}>
			<FilterForm filterData={TransferFilterForm}/>
			<TabForm filterData={{...TransferTab,sendEventToParent:openModal}}/>
			{isModal && <ModalComp config={{element:DetailTransfer(),onCloseEvent:()=>closeEvent()}}/>}

		</div>

	)

}
export default Transfer