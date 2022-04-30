import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";

const SideBarEtudiant = () => {
	const Links = [
		{link: 'الواجبات'},
		{link: ' الاختبارات'},
	]
	const navigator = (index: number) => {
		setSelected(index)
		switch (index) {

			case 0 :
				navigate('/etudiant/detail/:id')
				break;
			case 1:
				navigate('/etudiant/detail/:id/exam')
				break;
			default:
				navigate('/etudiant/detail/:id')
		}

	}
	let navigate = useNavigate()
	const [selected, setSelected] = useState(0)
	return (
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
export default SideBarEtudiant