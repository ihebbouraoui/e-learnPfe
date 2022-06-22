import React, {useEffect, useState} from "react";
import {
	deleteUserFromFormation,
	getAnnounceByIdProf,
	newFormationSubmit
} from "../../store/modules/Announce/announceService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Card, Modal, notification, Tabs, TimePicker} from 'antd';
import {sendMail, setMessage} from "../../store/modules/Auth/authService";
import {getStudentById} from "../../store/modules/Student/studentService";
import Meta from "antd/es/card/Meta";
import moment from "moment";
const format = 'HH:mm';

const {TabPane} = Tabs;
const ConfirmationFormations = () => {
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
     const [random,setRandom]= useState<any>()
	const selectUser=useSelector((state:RootState)=>state.student.selected_user)
    const [open,setOpen]=useState<any>(false)
	useEffect(() => {
		getAnnounceByIdProf({postBy: userConnect.user._id}).then((res:any)=>{
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
			prof: userConnect.user._id,
			date:data.date,
			hour:data.hour
		}).then(() => {
			setMessage({
				messageFrom: userConnect.user.mail,
				messageTo: data.userMail,
				values: ` لقد تم قبولك في التكوين و معرف الغرفة هو ${random} : `,
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
					})
					setOpenModal(false)
					;
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
	const goTo=(id:any)=>{
		getStudentById({id:id}).then(()=>{
			setOpen(true)
		})
	}
	const [openModal,setOpenModal]=useState<any>(false)
	const [date,setDate]=useState<any>()
	const [hour,setHour]=useState<any>()

	return (
		<div>
			<Modal bodyStyle={{height:'400px'}} footer={null}  visible={openModal} onCancel={()=>setOpenModal(false)} >
                  <h1 style={{fontWeight:'bold'}}> الرجاء اختيار التاريخ و الوقت</h1>
				{
					myAnnounce.map((item: any) => {
						return (
							<div className={'myAnnounce'} style={{position: 'relative', top: '100px', padding: '15px'}}>

										{item.userSubmitted?.map((el: any) => {
											return (
												<div style={{position:'fixed',top:'200px',display:"flex",flexDirection:'column',
												}}>
													<input required={true} type={'date'} onChange={(e:any)=>{
														setDate(e.target.value)}}/>
													<div style={{height:'30px'}}></div>
													<TimePicker   placeholder={'اختر الوقت'} style={{boxShadow:'unset'}}  onSelect={(e:any)=>{
														setHour(moment(e._d).format('HH:mm'))}}  format={format}/>
													<div style={{height:'30px'}}></div>

													<button className={'btn-success'} onClick={()=>{
														submitToFormation({
															userId: el.userId?._id,
															announce: item._id,
															userName: el.userId?.name,
															userMail: el.userId?.mail,
															avatar: el.userId?.avatar,
															date:date,
															hour:hour,
														})
													}


													}>
                                                          تاكيد
													</button>

												</div>
											)
										})}


							</div>

						)
					})
				}
			</Modal>
			<Modal footer={null} visible={open} onCancel={()=>setOpen(false)}>
				<Card
					hoverable
					style={{ width: 250 }}
					cover={<img alt="example"  style={{height:'200px'}} src={`${selectUser?.photo}`} />}
				>
					<Meta title={selectUser?.name}  />
					<Meta title={selectUser?.mail} />
					<Meta title={selectUser?.niveaux}
					/>

				</Card>
			</Modal>
			{
				myAnnounce.map((item: any) => {
					return (
						<div className={'myAnnounce'} style={{position: 'relative', top: '100px', padding: '15px'}}>
							<Tabs style={{padding: '20px'}} defaultActiveKey="1">
								{item.category === 'formation' &&

                                <TabPane tab={item.title} key={1}>
                                    <h2> قائمة المقدمين</h2>
                                    <hr/>
									{item.userSubmitted?.map((el: any) => {
										return (
											<div>
												<p style={{cursor:'pointer'}} onClick={()=>goTo(el?.userId?._id)}> {el?.userId?.name}</p>
												<button className={'btn-success'}
														onClick={() => {
															setOpenModal(true)

														}}> قبول
												</button>
												<button className={'btn-error'} onClick={() => {
													deleteUserFromFormation({_id:item._id,
														userId: el.userId?._id,
													}).then(()=>{
														notification.open({
															message:'لقد تم الرفض '
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