import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getUserById} from "../../../store/modules/Director/directorService";
import {setPostedBy} from "../../../store/modules/Director/directorModule";
import './detailAnnounce.css'
import AnnounceCard from "../announceCard";
import moment from "moment";
import {Button, Form, Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {getMessage, setMessage} from "../../../store/modules/Auth/authService";
import {checkIfSubmited, newFormation, signaler} from "../../../store/modules/Announce/announceService";
import { notification } from 'antd';

// @ts-ignore
import alert from "../../../assets/alert-svgrepo-com.svg";
import {setChecked} from "../../../store/modules/Announce/announceModule";
import {Link, useNavigate} from "react-router-dom";

const DetailAnnounce = () => {
	const [isReclamOpen, setIsReclamOpen] = useState(false)

	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
	const [commentForm] = Form.useForm();
	const [commentForm2] = Form.useForm();
	const [commentForm3] = Form.useForm();
  const [check,setCheck]=useState(false)
	const announce = useSelector((state: RootState) => state.announce.selectedAnnounce)

	useEffect(() => {
		getUserById({_id: announce?.postBy}).then((res: any) => setPostedBy(res))
	}, [])
	const onFinish = (values: any) => {
		setMessage({
			messageFrom: userConnect.user.mail,
			messageTo: announce?.postBy?.mail,
			values: values.type,
			avatarFrom: userConnect?.user.photo,
			avatarTo: announce?.postBy?.mail
		})
		.then((res) => {
			alert('message sent');
			commentForm.resetFields();
			getMessage()
			.then()
		})
	}
	const [isOpen2,setIsOpen2]=useState(false)
	const onFinishSubmit=(values:any)=>{
		newFormation({_id:announce._id,userId:userConnect.user._id}).then(()=>{
			notification.open({
				message: 'تنبيه',
				description:
					'لقد تم التقديم في التكوين بنجاح',
			});
			setIsOpen2(false)
		})
	}
	useEffect(()=>{
        announce.userSubmitted?.map((item:any)=>{
			console.log(item)
			if (item?.userId?.includes(userConnect.user._id)){
				setCheck(true)
			}
		})

	},[])
	console.log(check)
	const onFinishReclamation = (values: any) => {
		signaler({
			userToSignal:announce.postBy._id,
			SignalFrom:userConnect.user._id,
			data:values.data,
			date: moment().format('MMMM Do YYYY, h:mm:ss a'),
			cause:values.cause

		}).then(()=>alert('تمت الشكوى بنجاح'))
	}
	const nav=useNavigate()
	return (
		<div className={"announceCard"}>
			<Modal footer={null} visible={isOpen2} onCancel={()=>setIsOpen2(false)} width={500}>
				<div className={'submitToFormation'} style={{padding:'20px',width:'100%',alignItems:'center'}}>
					<h2 style={{fontSize:'25px',fontWeight:'bold',color:'black',fontStyle:'italic',textAlign:'center'}}> تأكيد التقديم</h2>
					<Form onFinish={onFinishSubmit}
						  form={commentForm3}
					>
						<div className={'submitContainer'} style={{width:'100%',alignItems:'center'}}>
							<Form.Item label="الاسم"
									   name="name"

									   rules={[{

										   type:'string',
										   message: 'يجب عليك ادخل الأسم',
									   }]}
									   style={{width: '50%'}}>
								<Input readOnly={true}  defaultValue={userConnect?.user?.name}   style={{
									border:'unset',
									width:'100%',
									backgroundColor:'whitesmoke',
									borderRadius:'20px'
								}}/>
							</Form.Item>
							<Form.Item label="الاسم المستخدم"
									   name="username"
									   rules={[{
										   type:'string',
										   message: 'يجب عليك ادخل الاسم المستخدم',
									   }]}
									   style={{width: '50%'}}>
								<Input  readOnly={true} defaultValue={userConnect?.user?.username}   style={{
									border:'unset',
									width:'100%',
									backgroundColor:'whitesmoke',
									borderRadius:'20px'
								}}/>
							</Form.Item>
							<Form.Item  label="البريد الألكتروني"
										name="mail"
										rules={[{
											type:'string',
											message: 'يجب عليك ادخل البريد الألكتروني',
										}]}
										style={{width: '50%'}}>
								<Input readOnly={true} defaultValue={userConnect?.user?.mail}   style={{
									border:'unset',
									width:'100%',
									backgroundColor:'whitesmoke',
									borderRadius:'20px'
								}}/>
							</Form.Item>
							<button  type={'submit'}  className={'btn-success'}> تأكيد </button>

						</div>
					</Form>
				</div>
			</Modal>
			<Modal width={500} style={{height: 1000}} footer={null} visible={isReclamOpen}
				   onCancel={() => setIsReclamOpen(false)}>
				<div className={'reclamation'}>
					<h2 style={{fontSize: '20px', fontWeight: 'bold', fontFamily: 'fantasy', padding: '10px'}}> يرجى
						ادخال سبب الشكوى </h2>
					<Form onFinish={onFinishReclamation}
						  form={commentForm2}
					>
						<div className={'reclamContainer'}>
							<Form.Item label="اسباب الشكوى"
									   name="cause"
									   rules={[{
										   required: true,
										   message: 'يجب ادخال  السبب'
									   }]}>
								<select style={{
									width: '100%',
									padding: '10px',
									height: '50px',
									border: 'unset',
									borderRadius: '30px',
									backgroundColor: 'whitesmoke'
								}}>
									<option value={'أسباب اخلاقية'}>أسباب اخلاقية</option>
									<option value={'حساب مزور'}>حساب مزور</option>
								</select>
							</Form.Item>
							<Form.Item label="معطيات أخرى حول الشكوى"
									   name="data"
									   rules={[{
										   required: true,
										   message: 'يجب ادخال  المعطيات'
									   }]}
									   style={{width: '50%'}}>
								<textarea    style={{
									border: 'unset',
									backgroundColor: 'whitesmoke',
									width: '300px',
									borderRadius: '20px',
									height: '140px',
									padding:'20px',
									fontSize:'14px',
									color:'black',
									fontWeight:'bold'

								}}/>
							</Form.Item>
							<button  type={'submit'}  className={'btn-success'}> تأكيد </button>

						</div>
					</Form>



				</div>
			</Modal>
			<div className={'leftSideDetail'}>
				<div className={'image'}>
					<img className={'imageAnnounce'} src={announce.photo} alt={''}/>
				</div>
				<div>
					<Form onFinish={onFinish}
						  form={commentForm}
					>
						<div className={'messageCont'} style={{padding: '20px'}}>
							<Form.Item label="الرسالة"
									   name="type"
									   rules={[{
										   required: true,
										   message: 'يجب ادخال الرسالة'
									   }]}
									   style={{width: '50%'}}>
								<textarea style={{
									padding: '10px',
									borderRadius: 20,
									backgroundColor: 'whitesmoke',
									width: '700px',
									height: '200px',
									resize:'none'


								}}
								rows={1}/>
							</Form.Item>
							<button  className={'btn-success'} style={{position:'relative',top:'42px',right:'243px'}}  type="submit">
								ارسال
							</button>
						</div>
					</Form>
				</div>

			</div>
			<div style={{height: '20px'}}></div>
			<div className="detailAnnounce">
				<span className="tag tag-brown">{announce?.category}</span>
				<h4 style={{wordBreak: 'break-word'}}>{moment(announce.date).format('YYYY-MM-DD')}</h4>
				<p style={{wordBreak: 'break-word'}}>{announce.data}</p>
			</div>
			<div className="cardFooter">
				<div className="user">
					<img style={{width: '50px', height: '50px', borderRadius: '50px'}} src={announce?.postBy?.photo}
						 alt={''}/>
					<div className="user__info">
						<h5>{announce?.postBy.name}</h5>
						<small>{moment(announce?.date).fromNow()}</small>
					</div>
				</div>
				<div style={{height:'20px'}}>

				</div>
				<div className={'reclamation'}>
					{
						!check && announce.category === 'formation' && !announce?.submit  && <Button onClick={()=>setIsOpen2(true)}   style={{
							fontWeight: 'bolder',
							fontSize: '20px',
							marginLeft: '20px', padding: '5px',
							height: '40px',
						}} type={"link"}> التقديم في التكوين </Button>

					}
					{
						check && <Button  type={'link'}
						>لقد قدمت مسبقا في هذا التكوين
						</Button>
					}
					{
						check && <button  onClick={()=>window.open(`http://localhost:3002/${announce?.file}`)}
                                          >تحميل الدرس</button>
					}
					<Button style={{fontWeight:'bold',fontSize:'20px'}} onClick={()=>setIsReclamOpen(true)} type={'link'} > اضافة شكوى</Button>
				</div>

			</div>

		</div>
	)
}
export default DetailAnnounce