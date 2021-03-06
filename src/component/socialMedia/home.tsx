import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Avatar, Button, Card, Cascader, Form, Input, message, Modal, Select, Tabs, Upload, UploadProps} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import './home.css'
import {
	addAnnounce,
	getAnnounce,
	getMyFormationProf,
	getSubmitFormation
} from "../../store/modules/Announce/announceService";
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
import {getMessage, upload} from "../../store/modules/Auth/authService";
import {useNavigate} from "react-router-dom";
import MessageHome from "../../pages/Message/messageHome";
import {setConv} from "../../store/modules/Auth/AuthModule";
import {toBase64} from "../Const/const";
import moment from "moment";
import {setSelectedAnnounce} from "../../store/modules/Announce/announceModule";
import Swal from "sweetalert2";
import {GetDirector, updateDirectorWithMail} from "../../store/modules/Director/directorService";

const Home = () => {
	const {TabPane} = Tabs;
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
	const listAnnounce = useSelector((state: RootState) => state.announce.list_Announce)
	const [imageSRC, setImageSRC] = useState<Array<string>>([]);
	const [isOpen, setIsOpen] = useState(false);

	const {Option, OptGroup} = Select;
	const [commentForm] = Form.useForm();
	const nav = useNavigate()
	const dispatch = useDispatch()
	const [myFormation, setMyFormation] = useState([])
	const goToMessage = (item: any) => {
		dispatch(setConv(item))
		nav('message')
	}
	useEffect(() => {
		getAnnounce().then((res: any) => {
			res?.map((item: any) => {
				console.log(item)
				if (item.userId.includes(userConnect.user._id)) {
					setMyFormation(res)
				}
			})
		})
		userConnect.user.role==='student' ?getSubmitFormation({_id: userConnect.user._id}).then():getMyFormationProf({_id: userConnect.user._id}).then()


	}, [])

	const [listConversations, setListConversations] = useState<any>([]);

	const MySubmitFormation = useSelector((state: RootState) => state.announce.submittedAnnounce)
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

	const navigate = useNavigate()
	const goToDetailCard = (item: any, prof: any) => {
		dispatch(setSelectedAnnounce({...item, postBy: prof, submit: true}));
		navigate('/detailAnnounce')
	}


	const [file, setFile] = useState<any>()
	const [image, setImage] = useState<any>()

	const handleUploadImage = (e: any) => {
		const f = new FormData();
		f.append('file', e.target.files[0])
		upload(f).then((res) => setImage(res))
	}
	const handleUploadFile = (e: any) => {
		const f = new FormData();
		f.append('file', e.target.files[0])
		upload(f).then((res) => setFile(res))
	}

	const onFinish2 = (values: any) => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-error'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: '???? ?????? ????????????',
			text: "???? ???????? ?????????? ",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: '??????',
			cancelButtonText: '????',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				addAnnounce({
					postBy: userConnect.user._id,
					data: values.data,
					photo: image,
					date: moment(),
					category: values.category,
					title: values.title,
					file: file
				}).then(() => {
					setIsOpen(!isOpen)
					getAnnounce().then()
				})
				Swal.fire({
					position: "center",
					icon: 'success',
					title: '?????? ???? ?????????? ?????????? ',
					showConfirmButton: false,
					timer: 1000
				})

			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: '???? ?????????? ??????????',
					showConfirmButton: false,
					timer: 1000
				})
			}
		})

	}
	return (


		<div>

			<Modal footer={null} visible={isOpen} onCancel={() => {
				setIsOpen(false)
				// window.location.reload()
			}} width={"40%"} centered>

				<div className={'mainAddCard'}
					 style={{
						 padding: "14px",
						 display: "flex",
						 // backgroundColor: '#f0f2f5',
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
								label="??????????????????"
								name="data"
								rules={[{required: true, message: '???????? ??????????????????!'}]}
								style={{width: '100%'}}
							>
								<Input placeholder="??????????????????"
								/>
							</Form.Item>
							<Form.Item
								label="?????????? ??????????????"
								name="title"
								rules={[{required: true, message: '???????? ??????????????!'}]}
								style={{width: '100%'}}
							>
								<Input placeholder="?????????????? "
								/>
							</Form.Item>
							<Form.Item label="?????????? ??????????????" name="category"
									   rules={[{required: true, message: '???????? ??????????'}]}
							>
								<Select defaultValue="?????????? ??????????????">
									{userConnect.user.role === 'prof' ?
										<OptGroup label="??????????????">
											<Option value="formation">??????????</Option>
											<Option value="normal">?????????? ????????</Option>

										</OptGroup> :
										<OptGroup label="??????????????">
											<Option value="normal">?????????? ????????</Option>
										</OptGroup>
									}
								</Select>
							</Form.Item>
							<Form.Item rules={[{required: true, message: '???????? ????????????'}]}>
								<input id={"file"} title={'qsdqs'} type={'file'} style={{display: 'none'}}
									   onChange={handleUploadImage}/>
								<label style={{cursor: 'pointer'}} htmlFor={'file'}> ???????? ?????? ???????????? ????????
									??????????????</label>
							</Form.Item>
							{userConnect.user.role === 'prof' &&
                            <Form.Item rules={[{required: true, message: '???????? ??????'}]}>
                                <input id={"img"} type={'file'} onChange={handleUploadFile} style={{display: 'none'}}/>
                                <label style={{cursor: 'pointer'}} htmlFor={'img'}> ???????? ?????? ???????????? ??????????</label>
                            </Form.Item>
							}
							<Form.Item>
								<Button type="primary" htmlType="submit" className="login-form-button">
									??????????
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
					<img alt={''} className={''} src={userConnect?.user?.photo}
						 style={{
							 position: 'absolute',
							 left: '15px',
							 zIndex: 9,
							 width: 150,
							 height: '20%'
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
							color: 'gray',
							fontWeight: "bold"
						}}> {userConnect.user.role==='prof'?'??????????':'????????'}</p>

					</Card>


				</div>
				 <div className={'myFormation'} style={{height: '400px', overflowX: 'scroll'}}>
                    <h2 style={{textAlign: 'center'}}> ??????????</h2>
					{MySubmitFormation.map((item: any) => {
						console.log(item)
							return (

								<div className={'card'} onClick={() => goToDetailCard(item.announce, item.prof)}
									 style={{
										 borderRadius: '20px',
										 padding: 'unset',
										 minWidth: '100%',
										 backgroundSize: 'cover',
										 backgroundImage: `url(${item.announce.photo})`,
										 backgroundRepeat: 'no-repeat'
									 }}>
									<div className={'over'}>
										<p style={{
											fontSize: '16px',
											fontWeight: 'bold',
											color: 'white'
										}}> {item.announce.category}</p>
										<p style={{
											fontSize: '16px',
											fontWeight: 'bold',
											color: 'white'
										}}>  {userConnect.user.role==='student'? item.prof.tel:item.student.tel}</p>
										<p style={{
											fontSize: '16px',
											fontWeight: 'bold',
											color: 'white'
										}}> {userConnect.user.role==='student'? item.prof.name:item.student.name}</p>
                                        <p style={{
											fontSize: '16px',
											fontWeight: 'bold',
											color: 'white'
										}}> ?????????? ??????????:{ item?.date}</p>
                                        <p style={{
											fontSize: '16px',
											fontWeight: 'bold',
											color: 'white'
										}}> ?????? ??????????:{ item?.hour} </p>
									</div>
								</div>
							)
						}
					)}

                </div>
			    </div>
			<div className={'contenu'}>
				<div style={{
					marginTop: '20px'
				}}>
					<div className={'underNav'}>
						<div className={"top"}>
							<img alt={''} className={'logo'} src={userConnect.user.photo}/>
							<input type={'text'} placeholder={'???????? ?????????????????? ??????'} style={{
								width: '70%',
								backgroundColor: 'white',
								// border: 'black 2px solid',
								height: '100%'
							}} onClick={() => setIsOpen(true)}/>
						</div>
						<div style={{height: '10px'}}></div>
						<hr/>
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