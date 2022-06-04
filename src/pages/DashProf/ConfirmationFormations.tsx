import React, {useEffect, useState} from "react";
import {getAnnounceByIdProf, newFormationSubmit} from "../../store/modules/Announce/announceService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {notification, Tabs} from 'antd';
import {setMessage} from "../../store/modules/Auth/authService";

const {TabPane} = Tabs;

const ConfirmationFormations = () => {
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
	useEffect(() => {
		getAnnounceByIdProf({postBy: userConnect.user._id}).then()
	}, [])

	const myAnnounce = useSelector((state: RootState) => state.announce.profAnnounce)
	const submitToFormation = (data: any) => {
		newFormationSubmit({
			student: data.userId,
			announce:data.announce,
			prof:userConnect.user._id
		}).then(()=>{
			setMessage({
				messageFrom: userConnect.user.mail,
				messageTo: data.userMail,
				values: 'لقد تم قبولك في التكوين',
				avatarFrom: userConnect?.user.photo,
				avatarTo: data.avatar
			}).then(()=>{
				notification.open({
					message: 'تنبيه',
					description:
						`لقد تم قبول ${data.userName}`,
				});
			})
		})
	}
	return (
		<div>
			{
				myAnnounce.map((item: any) => {
					return (
						<div className={'myAnnounce'} style={{position: 'relative', top: '100px', padding: '15px'}}>
							<Tabs style={{padding: '20px'}} defaultActiveKey="1">
								{item.category === 'formation' &&

                                <TabPane  tab={item.title} key={1}>
                                    <h2> list user </h2>
                                    <hr/>
									{item.userSubmitted?.map((el: any) => {
										return (
											<div>
												<p> {el?.userId?.name}</p>
												<button className={'btn-success'}
														onClick={() => submitToFormation({
															userId: el.userId?._id,
															announce: item._id,
															userName:el.userId?.name,
															userMail:el.userId?.mail,
															avatar:el.userId?.avatar

														})}> قبول
												</button>
												<button className={'btn-error'} onClick={() => console.log(el)}> رفض
												</button>
												<hr/>
											</div>
										)
									})}
                                </TabPane>
								}
							</Tabs>

						</div>

					)
				})
			}

		</div>
	)
}
export default ConfirmationFormations