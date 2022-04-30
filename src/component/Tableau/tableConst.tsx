import React from "react";
import {tabInfo} from "./tableauxForm";

const TableConst=(item:any)=>{
	return(
		<div className={'tableau'}>
			<table>
				<table>
					<thead>
					 <th>
						 الاقسام
					 </th>
					<th>
						العملية
					</th>
					</thead>
					<tbody>
					<tr>
						{item.map((el:any)=>(
								<td> {el}</td>
							)
						)}

					</tr>

					</tbody>
				</table>
			</table>
		</div>
	)
}
export default TableConst