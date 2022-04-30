import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getClassByIdProf} from "../../../store/modules/Prof/profService";
const MyClass = () => {
	const listClass=useSelector((state:RootState)=>state.prof.prof_class)
	const user=useSelector((state:RootState)=>state.auth.userLogged)
	useEffect(()=>{
		getClassByIdProf({id_Prof:user.user._id}).then((res:any)=>{
			console.log(res)
		})
	},[])

	return(
		<div className={'classe'}>
			{
				listClass?.map((item:any)=>(
					 <table>
					 <tbody>
					 <tr>
						 <td>
							 {item.title}
						 </td>
						 <td>
							 <button> تفاصيل</button>
						 </td>
					 </tr>

					 </tbody>
				 </table>
				))}




		</div>
	)


}
export default MyClass