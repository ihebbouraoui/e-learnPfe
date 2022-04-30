import React, {useEffect, useRef, useState} from "react";
import {
	blockDelete,
	deleteHistory,
	deleteWithMail,
	getHistory,
	getHistoryById
} from "../../store/modules/Director/directorService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import TabForm, {btnInetrface} from "../../component/Tableau/tableauxForm";
import {historyTabConst} from "./historyTabConst";
import ModalComp from "../../component/Modal/modalComp";

const History=()=>{
	const listHistory=useSelector((state:RootState)=>state.director.listHistory)
	const [tableModel, setTableModel] = useState(historyTabConst)
	const [isModal, setModal] = useState(false)
	const selected = useSelector((state: RootState) => state.director.selected_History)
    const idHis=useRef()
	const [isSelected,select]=useState<any>()
	useEffect(()=>{
	getHistory().then((res:any)=>{
		initTable(res)
	})
},[])
	useEffect(()=>{
		getHistoryById({_id:idHis}).then((res:any)=>{
			select(res)
		})
	},[])
	const historyDetail = (id: any) => {

		return (
			<div>
				{isSelected?.map((item:any)=>{
					return(
						<p>
							{item.date}
						</p>
					)
					}

				)}


			</div>


		)
	}

	const openModel = () => {
		setModal(true)
	}
	const closeEvent = () => {
		setModal(false)
	}
	const receive = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				idHis.current=listHistory[data.index].userId._id
				break;
			case 'delete':
				listHistory[data.index].type==='delete' ?
				blockDelete({_id:listHistory[data.index].userId?._id}).then(()=>{
                     deleteHistory({_id:listHistory[data.index]._id}).then(()=>{
						 getHistory().then((res:any)=>{
							 initTable(res)
						 })
					 })
				}) :
					deleteWithMail({mail:listHistory[data.index].mailUser}).then(()=>{
						deleteHistory({_id:listHistory[data.index]._id}).then(()=>{
							getHistory().then((res:any)=>{
								initTable(res)
							})
						})
					})
				break;
		}

	}
	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			date: item?.date,
			admin: item?.adminID?.name,
			user: item?.userId ? item?.userId?.username : item?.mailUser,
			type:item?.type
		}))
		setTableModel({...temp})
	}
// useEffect(()=>{
// 	getHistory().then()
// },[])
	return(
		<div className={'directorMain'}>
			<TabForm filterData={{...tableModel  , sendEventToParent: receive}}/>
			{isModal && <ModalComp config={{element: historyDetail(selected), onCloseEvent: () => closeEvent()}}/>}

		</div>
	)
}
export default History