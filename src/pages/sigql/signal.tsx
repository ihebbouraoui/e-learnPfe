import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {historyTabConst} from "../history/historyTabConst";
import {
	blockDelete,
	deleteHistory,
	deleteWithMail,
	getHistory,
	getHistoryById
} from "../../store/modules/Director/directorService";
import TabForm, {btnInetrface} from "../../component/Tableau/tableauxForm";
import ModalComp from "../../component/Modal/modalComp";
import {getSignal} from "../../store/modules/Announce/announceService";
import {signalTabConst} from "./siganConst";
import {deleteProf, getProfWithStatus} from "../../store/modules/Prof/profService";
import {setUserToHistory} from "../../store/modules/Auth/authService";

const Signal=()=>{
	const [tableModel, setTableModel] = useState(signalTabConst)
	const blockUser=useRef<any>()
	const userConnect=useSelector((state:RootState)=>state.auth.userLogged)
	const [userId,setUserId]=useState<Array<any>>([])
	useEffect(()=>{
		getSignal().then((res:any)=>{
			console.log(res)
			initTable(res)
			res.map((item:any)=>{
			userId.push(item.userToSignal?._id)

			})
		})
	},[])

	const receive = (data: { index: number, btn: btnInetrface }) => {
		switch (data.btn?.type) {
			case 'detail':
				blockUser.current=userId[data.index]
				console.log(blockUser)
				deleteProf({_id: blockUser.current}).then(() => setUserToHistory({
					date: "10:12:200",
					adminID: userConnect.user._id,
					userId: blockUser.current,
					data: 'شكوى',
					type: 'delete'
				}))


				break;

		}

	}

	const initTable=(res:any)=>{
		let temp = tableModel
		temp.data = res?.map((item: any) => ({
			date: item?.date,
			SignalFrom: item?.SignalFrom?.name,
			userToSignal: item?.userToSignal?.name,
			moreData:item?.cause,
			data:item?.data,
		}))
		setTableModel({...temp})
		console.log(tableModel)
	}
	return(
		<div className={'directorMain'}>
			<TabForm filterData={{...tableModel  , sendEventToParent: receive  }}/>

		</div>
	)
}
export default Signal