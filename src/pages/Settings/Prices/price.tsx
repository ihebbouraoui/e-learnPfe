import React, {useState} from "react";
import FilterForm from "../../../component/Filter/filterForm";
import {PriceFormConst} from "./priceConst";
import ModalComp from "../../../component/Modal/modalComp";
import '../TabsSetting.css'

const Prices = () => {
	const   [isModal,setModal]=useState(false)
	const closeEvent=()=>{
		setModal(false)
	}
   const componentAddPrice=()=>{
		return(
			<div className={'addPrice'} >
				<h2> اضافة سعر </h2>
				<input style={{backgroundColor:'#f0f2f5'}} placeholder={'أظف السعر '}/>
				<button className={'btn-success'}> حفظ </button>
			</div>
		)
   }
	return (
		<div className={'directorMain'}>
			<FilterForm filterData={PriceFormConst}/>
			<button className={'btn-success'} onClick={()=>setModal(true)}> اضافة سعر </button>

			{isModal && <ModalComp config={{element:componentAddPrice(),onCloseEvent:()=>closeEvent()}}/>}
		</div>
	)

}
export default Prices