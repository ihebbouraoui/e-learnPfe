import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import './sideBarProf.css'

const SideBardProf=()=> {
	const Links=[
		{link: "الصفوف"},
		{link: 'الواجبات'},
		{link: ' الاختبارات'},
		{link: ' سجل المتابعة'},

	]
	const navigator = (index: number) => {
		setSelected(index)
		switch (index) {

			case 0 :
				navigate('/prof/detail/:id')
				break;
			case 1:
				navigate('/prof/detail/:id/homework')
				break;
			case 2:
				navigate('/prof/detail/:id/exam')
				break;
			case 3:
				navigate('/prof/detail/:id/follow')
				break;
			default:
				navigate('/prof/detail/:id')
		}

	}
	let navigate = useNavigate()
	const [selected, setSelected] = useState(0)
	return(
		<div className={'sideBarProfForm'}>
			<div className={'sideBarFormContainer'}>
				{Links.map((item: any, index: number) => (
						<div className={`tabs ${selected === index}`} onClick={() => navigator(index)}>
							{item?.link}
						</div>
					)
				)}

			</div>
			<Outlet/>

		</div>
	)
}
export default SideBardProf