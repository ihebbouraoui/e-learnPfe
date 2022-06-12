import React, {useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import './homeComp.css'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getCategory} from "../../store/modules/Announce/announceService";
import {Card} from "antd";
const HomeTest=()=>{
	const nav=useNavigate()
	const listCategory=useSelector((state:RootState)=>state.announce.category)
	useEffect(()=>{
		getCategory().then((res:any)=>{
			console.log(res)
		})
	},[])
	return(
		<div className={'homeComponent'}>

			{/*<button onClick={()=>{nav('/login')}}> log</button>*/}
			{/*<button onClick={()=>{nav('/signUp')}}> signu</button>*/}
		    <div className={'us'}>
				<p className={'text'}>
					مرحبا بك في منصة كاف المتطورة
				</p>
				<p className={'text'}>
					تضم المنصة افضل المدرسين في السعودية حيث تضم العديد من مكونين في عدة مجالات
				</p>
				<p className={'text'}>
					 تمتع المنصنة امكانية التحدث مباشرة مع الأستاذ عن طريق مكالمة فيديو
				</p>
				<p className={'text'}>
					و ايضا تمكن الطلاب من نشر اعلان لغاية التسلية و ايضا امكانية الدردشة مع الطلاب الأخرين
				</p>

			</div>

			 <div className={'auth'}>
				 <p> اذا انت مسجل فعلا  </p>
				 <NavLink to={'/signup'}> تسجيل حساب</NavLink>
				 <p> انقر هنا اذا تريد انشاء حساب جديد</p>
				 <NavLink to={'/login'}> دخول</NavLink>
			 </div>
			<h1 className={'title'}> التدريب متاح الآن على منصتنا
			</h1>
			<div className={'category'}>
				{listCategory.map((item:any)=>{
					return(

						<div className={'cardCategory'}  >
							<img className={'categoryImage'}  src={item.icon} />
							<p style={{color:"black",fontWeight:'bold'}}> {item.title}</p>
						</div>

					)
				})}
			</div>

		</div>
	)
}
export default HomeTest