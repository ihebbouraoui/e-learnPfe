import React from "react";
import './model.css'

export interface ModalInterface{
	element:JSX.Element,
	onCloseEvent:Function
}

const ModalComp:React.FC<{config:ModalInterface}>=({config})=>{
	return(
		<div className={'ModalCompContainer'} onClick={()=>config.onCloseEvent()}>

			<div className={'ModalCenter'} onClick={(e)=>e.stopPropagation()}>
				{config.element}
				<span className={'buttonClose'} onClick={()=>config.onCloseEvent()}>X</span>
			</div>

		</div>
	)
}
export default ModalComp