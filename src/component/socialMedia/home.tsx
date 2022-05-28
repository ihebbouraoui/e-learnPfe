import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Avatar, Button, Card, Cascader, Form, Input, Modal, Select, Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import './home.css'
import {addAnnounce, getAnnounce, getSubmitFormation} from "../../store/modules/Announce/announceService";
import {LikeOutlined, WechatOutlined} from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
// @ts-ignore
import photo from '../../assets/e-learning-mfc-min.jpg'
// @ts-ignore
import add from '../../assets/add-svgrepo-com.svg'
// @ts-ignore
import like from '../../assets/like-svgrepo-com.svg'
// @ts-ignore
import comment from '../../assets/comment-dots-svgrepo-com.svg'
// @ts-ignore
import search from '../../assets/search-svgrepo-com.svg'
import AnnounceCard from "../../pages/Announce/announceCard";
import {UploadOutlined} from '@ant-design/icons';
import {getMessage} from "../../store/modules/Auth/authService";
import {useNavigate} from "react-router-dom";
import MessageHome from "../../pages/Message/messageHome";
import {setConv} from "../../store/modules/Auth/AuthModule";
import {toBase64} from "../Const/const";
import moment from "moment";
import {setSelectedAnnounce} from "../../store/modules/Announce/announceModule";

const Home = () => {
	const {TabPane} = Tabs;
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
	const listAnnounce = useSelector((state: RootState) => state.announce.list_Announce)
	const [imageSRC, setImageSRC] = useState<Array<string>>([]);
	const [isOpen, setIsOpen] = useState(false);
	const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files) {
			toBase64(event.target.files[0]).then((res) => {
				setImageSRC([...imageSRC, res as string]);
			})
		}
	}
	const {Option, OptGroup} = Select;
	const [commentForm] = Form.useForm();
	const nav = useNavigate()
	const dispatch = useDispatch()
	const goToMessage = (item: any) => {
		dispatch(setConv(item))
		nav('message')
	}
	useEffect(() => {
		getAnnounce().then()
		getSubmitFormation({_id:userConnect.user._id}).then()

	}, [])
	const [listConversations, setListConversations] = useState<any>([]);

	const MySubmitFormation=useSelector((state:RootState)=>state.announce.submittedAnnounce)
	useEffect(() => {
		getMessage().then((res: any) => {
			let listMessages: Array<any> = [];
			const allMsg = res.filter((item?: any) => item?.messageTo === userConnect?.user?.mail || item?.messageFrom === userConnect?.user?.mail);
			allMsg.forEach((item: any) => {
				const ind = listMessages.findIndex((el?: any) => el?.user === (userConnect?.user?.mail === item?.messageTo ? item?.messageFrom : item?.messageTo));
				if (ind >= 0) {
					listMessages[ind].msg?.push(item);
				} else {
					listMessages.push({
						user: item?.messageTo === userConnect?.user?.mail ? item?.messageFrom : item?.messageTo,
						photo: item?.messageTo === userConnect?.user?.mail ? item?.avatarFrom : item?.avatarTo,
						msg: [item]
					})
				}
			})
			setListConversations([...listMessages]);
		})


	}, []);
	const onFinish2 = (values: any) => {
		// console.log(values)
		addAnnounce({
			postBy: userConnect.user._id,
			data: values.data,
			photo: imageSRC[0],
			date: moment(),
			category: values.category
		}).then(()=>{
			setIsOpen(!isOpen)
			getAnnounce().then()
		})
	}
	const navigate=useNavigate()
	const goToDetailCard=(item:any,prof:any)=>{
		dispatch(setSelectedAnnounce({...item,postBy:prof,submit:true}));
		navigate('/detailAnnounce')
	}
	return (


		<div>

			<Modal footer={null} visible={isOpen} onCancel={() => {
				setIsOpen(false)
				// window.location.reload()
			}} width={"30%"} centered>

				<div className={'mainAddCard'}
					 style={{
						 padding: "14px",
						 display: "flex",
						 backgroundColor: '#f0f2f5',
						 borderRadius: '10',
					 }}>
					<div className={"input"}>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{remember: true}}
							style={{borderColor: 'whitesmoke'}}
							onFinish={onFinish2}
							form={commentForm}
						>
							<Form.Item
								label="المعلومات"
								name="data"
								rules={[{required: false, message: 'ادخل المعلومات!'}]}
								style={{width: '100%'}}
							>
								<Input placeholder="المعلومات"
								/>
							</Form.Item>
							<Form.Item label="نوعية الأعلان" name="category"
									   rules={[{required: true, message: 'اختر النوع'}]}
							>
								<Select defaultValue="نوعية الاعلان">
									<OptGroup label="الأعلان">
										<Option value="formation">تكوين</Option>
										<Option value="normal">اعلان عادي</Option>
									</OptGroup>
								</Select>
							</Form.Item>

							<div className={'inputFile'}>
								<input type="file" accept="image/*" onChange={uploadImage}
									   style={{paddingBottom: 20}}/>
								<div className={"imagesContainer"}>
									{
										imageSRC.map((src: string) =>
											<img className={"imgEl"} src={src} alt={""}/>)
									}

								</div>
							</div>

							<Form.Item>
								<Button type="primary" htmlType="submit" className="login-form-button">
									Valider
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>

			</Modal>


			<div className={'rightSide'}>
				<Tabs style={{height: '100%'}}>
					<TabPane>
						<MessageHome listConversations={listConversations}/>
					</TabPane>
				</Tabs>

			</div>
			<div className={'leftSide'}>
				<div className={'hederDetail'} style={{}}>
					<img alt={''} className={''} src={userConnect.user.photo}
						 style={{
							 position: 'absolute',
							 left:'15px',
							 zIndex:9,
							 width: 150,
							 height:'28.5%'
						 }}/>
				</div>

				<div className={'detailProfil'}>
					<Card>
						<p style={{
							fontSize: '18px',
							color: 'black',
							fontWeight: "bolder"
						}}>{userConnect.user.username} </p>
						<p style={{
							fontSize: '15px',
							color: 'black',
							fontWeight: "bold"
						}}> {userConnect.user.mail}</p>
						<p style={{
							fontSize: '15px',
							color: 'gray',
							fontWeight: "bold"
						}}> {userConnect.user.role}</p>

					</Card>


				</div>
				<div className={'myFormation'} style={{height:'400px',overflowX:'scroll'}}>
					<h2 style={{textAlign:'center'}}> تكوين</h2>
					{MySubmitFormation.map((item:any)=>(
						<div className={'card'} onClick={()=>goToDetailCard(item.announce,item.prof)} style={{ borderRadius:'20px', padding:'unset',minWidth:'100%',backgroundSize:'cover',backgroundImage:`url(${item.announce.photo})`,backgroundRepeat:'no-repeat'}}   >
							<div className={'over'}>
								<p style={{fontSize:'16px',fontWeight:'bold',color:'white'}}> {item.announce.category}</p>
								<p style={{fontSize:'16px',fontWeight:'bold',color:'white'}}>  {item.announce.date} </p>
								<p style={{fontSize:'16px',fontWeight:'bold',color:'white'}}>  {item.prof.tel}</p>
								<p style={{fontSize:'16px',fontWeight:'bold',color:'white'}}> {item.prof.name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={'contenu'}>
				<div style={{
					marginTop: '20px'
				}}>
					<div className={'underNav'}>
						<div className={"top"}>
							<img alt={''} className={'logo'} src={userConnect.user.photo}/>
							<input type={'text'} placeholder={'ادخل المعلومات هنا'} style={{
								width: '70%',
								backgroundColor: 'white',
								// border: 'black 2px solid',
								height: '100%'
							}} onClick={() => setIsOpen(true)}/>
						</div>
						<div style={{height:'10px'}}> </div>
						<hr/>
						{/*<div className={'bot'}>*/}
						{/*	<Button className={'btn_add'}*/}
						{/*			style={{width: '50%', borderRadius: '50px', paddingRight: '10px'}}*/}
						{/*			icon={<UploadOutlined/>}>Click to Upload</Button>*/}
						{/*	<Button className={'btn-success'} type={'primary'}*/}
						{/*			style={{width: '50%', borderRadius: '50px'}}> Add </Button>*/}
						{/*</div>*/}
					</div>
					{listAnnounce.map((item: any) => (
						<AnnounceCard item={item}/>
					))}
				</div>
			</div>

		</div>
	)
}
export default Home