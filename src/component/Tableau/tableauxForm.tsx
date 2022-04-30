import React, {useEffect} from "react";
import './tableau.css'
import {fchmod} from "fs";

export interface tabInfo {
	label: string;
}

export interface btnInetrface {
	name: string,
	type?: string,
	style: string,
	onClick?:Function
}
export interface TabConfigInterface {
	headers: Array<tabInfo>,
	data: Array<any>
	btnConfig: Array<btnInetrface>,
	sendEventToParent?: Function
	openModel?:Function
}
const TabForm: React.FC<{ filterData: TabConfigInterface }> = ({filterData}) => {

	const clickedBtn = (index: number, btn: btnInetrface) => {
		filterData.sendEventToParent && filterData.sendEventToParent({index, btn})
	}

	useEffect(() => {
	}, [filterData])
	return (
		<div className={'tableau'}>
			<table>
				<table>
					<thead>
					{filterData.headers.map((item: tabInfo) => {
						return (
							<th>
								{item.label}
							</th>
						)
					})}
					</thead>
					<tbody>
					{
						filterData.data.map((item, index) => {
							return (
								<tr>
									{
										Object.values(item).map((el: any) => (
											<td>
												{
													el
												}
											</td>
										))
									}
									{filterData.btnConfig?.length > 0 && (
										<td>
											{
												filterData.btnConfig?.map(item => (
													<button onClick={() => clickedBtn(index, item)}
															className={item.style}> {item.name}</button>
												))
											}
										</td>
									)}
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</table>
		</div>
	)
}
export default TabForm
