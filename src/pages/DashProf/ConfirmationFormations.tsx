import React, {useEffect, useState} from "react";
import {
	deleteUserFromFormation,
	getAnnounceByIdProf,
	newFormationSubmit
} from "../../store/modules/Announce/announceService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {notification, Tabs} from 'antd';
import {sendMail, setMessage} from "../../store/modules/Auth/authService";

const {TabPane} = Tabs;

const ConfirmationFormations = () => {
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
     const [random,setRandom]= useState<any>()

	useEffect(() => {
		getAnnounceByIdProf({postBy: userConnect.user._id}).then((res:any)=>{
			console.log(res)
		})
		const min = 1;
		const max = 100;
		const rand = min + Math.random() * (max - min);
		setRandom(rand.toString().slice(0,2))
	}, [])

	const myAnnounce = useSelector((state: RootState) => state.announce.profAnnounce)
	const submitToFormation = (data: any) => {
		newFormationSubmit({
			student: data.userId,
			announce: data.announce,
			prof: userConnect.user._id
		}).then(() => {
			setMessage({
				messageFrom: userConnect.user.mail,
				messageTo: data.userMail,
				values: ` لقد تم فبولك في التكوين و معرف الغرفة هو :${random} `,
				avatarFrom: userConnect?.user.photo,
				avatarTo: data.avatar
			}).then(() => {

				sendMail({
					from: userConnect.user.mail,
					to: data.userMail,
					subject: 'confirmation',
					html: ` لقد تم فبولك في التكوين و معرف الغرفة هو :${random} `,
					text: ` لقد تم فبولك في التكوين و معرف الغرفة هو :${random} `
				}).then(() => {
					notification.open({
						message: 'تنبيه',
						description:
							`لقد تم قبول ${data.userName}`,
					});
				}).then(()=>{
					deleteUserFromFormation({_id:data.announce,
						userId: data.userId,
					}).then(()=>{
						getAnnounceByIdProf({postBy: userConnect.user._id}).then((res:any)=>{
						})
					})
				})
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

                                <TabPane tab={item.title} key={1}>
                                    <h2> list user </h2>
                                    <hr/>
									{item.userSubmitted?.map((el: any) => {
										return (
											<div>
												<p> {el?.userId?.name}</p>
												<button className={'btn-success'}
														onClick={() => {
															submitToFormation({
																userId: el.userId?._id,
																announce: item._id,
																userName: el.userId?.name,
																userMail: el.userId?.mail,
																avatar: el.userId?.avatar

															})
														}

														}> قبول
												</button>
												<button className={'btn-error'} onClick={() => {
													deleteUserFromFormation({_id:item._id,
														userId: el.userId?._id,
													}).then(()=>{
														notification.open({
															message:'لقد تم الرفض بنجاحح'
														})
														getAnnounceByIdProf({postBy: userConnect.user._id}).then((res:any)=>{
														})
													})
												}}> رفض
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