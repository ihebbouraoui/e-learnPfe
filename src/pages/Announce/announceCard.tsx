import React, {useEffect, useRef, useState} from "react";
import './cardtest.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setSelectedAnnounce} from "../../store/modules/Announce/announceModule";
import {getAnnounce, postComment} from "../../store/modules/Announce/announceService";
import {Button, Form} from "antd";
// @ts-ignore
import alert from "../../assets/alert-svgrepo-com.svg";
// @ts-ignore
import sendMessage from "../../assets/message-svgrepo-com.svg";
import TextArea from "antd/es/input/TextArea";
import {getMessage, setMessage} from "../../store/modules/Auth/authService";
import moment from "moment";
import {setLoading} from "../../store/modules/Auth/AuthModule";

const AnnounceCard: React.FC<{ item: any }> = ({item}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation();
	const [commentZone, setCommentZone] = useState<any>(false)
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
	const [height, setHight] = useState<any>('50px')
	const [visible, setVisible] = useState<any>(false)
	const goToDetail = (item: any) => {
		dispatch(setSelectedAnnounce(item));
		navigate('/detailAnnounce')

	}
	useEffect(() => {
		if (item.comment) {
			setVisible(!visible)
			setHight('200px')
		}
	}, [])
	const changeComme = () => {
		setCommentZone(!commentZone)
		!visible ? setVisible(visible) : setVisible(!visible)
	}
	useEffect(() => {
		getAnnounce().then(()=>{
			dispatch(setLoading(true))
		})
	}, [])
	const commentaire = useRef<{ [key: string]: string | number }>({})

	const newComment = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
		commentaire.current[name] = event.target.value.trim();
		Object.keys(commentaire.current).forEach((key) => {
			if (commentaire.current[key] === null || commentaire.current[key]?.toString()?.trim() === '') {
				commentaire.current[key] = ''
			}
		})
	}
	const [commentForm] = Form.useForm();
	const onFinish = (values: any) => {
		setMessage({
			messageFrom: userConnect.user.mail,
			messageTo: item?.postBy?.mail,
			values: values.type,
			avatarFrom: userConnect?.user.photo,
			avatarTo: item?.postBy?.mail
		})
		.then((res) => {
			alert('message sent');
			commentForm.resetFields();
			getMessage()
			.then()
		})
	}

	return (
		<div>
			<div className="container">
				<div className="card">
					<img alt={''}
						 style={{
							 position: 'absolute',
							 top: '10px',
							 left: '10px',
							 width: '30px',
							 cursor: 'pointer',
						 }}
						 src={alert}/>
					<div className="card__body">
						<span className="tag tag-brown">{item?.category}</span>
						<h4 style={{wordBreak: 'break-word'}}>{moment(item.date).format('YYYY-MM-DD')}</h4>
						<p style={{wordBreak: 'break-word'}}>{item.data}</p>
					</div>
					<div className="card__header">
						<img src={item?.photo} className="card__image"
							 style={{width: '100%', objectFit: 'cover', height: '100%', marginBottom: '20px'}} alt={""}/>
					</div>
					<div className="card__footer">
						<div className="user">
							<img style={{width: '50px', height: '50px', borderRadius: '50px'}} src={item?.postBy?.photo}
								 alt={''}/>
							<div className="user__info">
								<h5>{item.postBy.name}</h5>
								<small>{moment(item.date).fromNow()}</small>
							</div>
						</div>
					</div>
					<div className={'tache'}>
						{window.location.pathname === '/social_media' &&
                        <Button type={'link'} style={{
							fontWeight: 'bolder',
							fontSize: '20px', color: 'black',
							marginLeft: '20px', padding: '5px',
							height: '40px',
						}}
                                onClick={() => goToDetail(item)}> انقر لقراءة المزيد </Button>}
						{window.location.pathname !== '/detailAnnounce' &&
                        <button style={{
							height: '40px',
							borderRadius: '30px',
							backgroundColor: 'rgb(119 125 137 / 75%)',
							color: 'white',
							fontSize: '15px',
							fontStyle: 'italic',
							fontWeight: 'bolder'
						}} onClick={() => changeComme()}> تعليق
                        </button>
						}
					</div>
					{(!commentZone && !visible) || window.location.pathname !== '/detailAnnounce' &&
                    <div className={'commentZone'}>
                        <div className={'commentaire'} style={{
							height: `${height}`,
							marginBottom: '10px',
							paddingLeft: '10px'
						}}>
							{item?.comment?.map((el: any) => (
								<div style={{display: "flex", backgroundColor: '#fff',
									borderRadius: '20px', margin: '10px 0'}}>
									<img src={el?.userId?.photo}
										 style={{margin: "20px", width: '50px', borderRadius: '30px', height: '50px'}}/>
									<p style={{
										fontStyle: 'italic',
										fontSize: '15px',
										fontWeight: 'bold',
										margin: '20px',
										paddingTop: '10px',
										wordBreak: 'break-word',
									}}> {el?.data} </p>

								</div>
							))}

                        </div>
                        <div className={'zoneInput'} style={{
							display: 'flex',
							justifyContent: 'space-evenly',
							alignItems: 'center'
						}}>
                            <input placeholder={'ادخل تعليقك هتا'}
                                   style={{
									   width: '100%',
									   height: '40px',
									   borderRadius: '10px',
									   fontSize: '12px',
									   fontStyle: 'italic',
									   fontWeight: 'bold',
									   color: 'black',
									   wordBreak: 'break-word',
								   }}
                                   onChange={(e) => newComment(e, 'password')}
                            />
							<div style={{width: '10px'}} />
                            <button style={{
								borderRadius: '10px',
								backgroundColor: 'rgb(119 125 137 / 75%)',
								height: '40px',
								color: 'white',
								fontSize: '15px',
								fontStyle: 'italic',
								fontWeight: 'bolder'
							}} onClick={() => postComment({
								_id: item._id,
								userId: userConnect?.user?._id,
								data: commentaire.current?.password,
								date: '20/10/12'
							}).then(() => {
								getAnnounce().then()
							})}> valdier
                            </button>
                        </div>


                    </div>}


				</div>

				<hr/>

			</div>
			{window.location.pathname === '/detailAnnounce' &&
            <div>
                <Form onFinish={onFinish}
                      form={commentForm}
                >
                    <div className={'messageCont'}>
                        <Form.Item label="الرسالة"
                                   name="type"
                                   rules={[{
									   required: true,
									   message: 'يجب ادخال الرسالة'
								   }]}
                                   style={{width: '50%'}}>
                            <TextArea rows={1} style={{borderRadius: 10}}/>
                        </Form.Item>
                        <Button style={{marginRight: "10px"}} htmlType="submit" type="primary">
                            &#9658;
                        </Button>
                    </div>
                </Form>
            </div>
			}

		</div>
	)

}
export default AnnounceCard