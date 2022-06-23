import React, {useEffect, useState} from "react";
import {getMessage, setMessage} from "../../store/modules/Auth/authService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Button, Form, Input, Modal} from "antd";
import ConversationForm from "./conversationForm";
import './messageHome.css'
import {useNavigate} from "react-router-dom";
import { Upload, } from 'antd';


const { Dragger } = Upload;
const MessageHome :React.FC<{ listConversations: Array<any> }> = ({listConversations}) => {
	// console.log(listConversations)
	const nav=useNavigate()
	const onFinish = (values: any) => {
		const msg = {
			messageFrom: userToken.user.mail,
			messageTo: selectedConv?.user,
			values: values.type,
			avatarFrom: userToken?.user?.photo,
			avatarTo: selectedConv?.avatar
		}
		setMessage(msg)
		.then((res) => {
			msgForm.resetFields();
			setSelectedConv({...selectedConv, msg: [...selectedConv.msg, {...msg, id: -1}]});
			getMessage().then(()=>nav('/home'));

		})
	}
	const [msgForm] = Form.useForm();
	const userToken = useSelector((state: RootState) => state.auth.userLogged);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedConv, setSelectedConv] = useState<any>(undefined)
	const configModal = (item: any) => {
		setSelectedConv(item);
		setIsOpen(true);
	}

	return (
		<div>
			{
				listConversations.map((item:any) => <Conversation openModal={() => configModal(item)} conv={item}/>)
			}
			<Modal footer={null} visible={isOpen} onCancel={() => {
				setIsOpen(false)
                // window.location.reload()
			} } width={700}  centered>

				<div className={'mainMessage'}>
					<div className={'fromTo'}>
						{selectedConv?.msg.map((item: any) => {
							return (
								<div
									style={item.messageTo === userToken.user.mail ? {textAlign: 'left'} : {textAlign: "right"}}>
									<ConversationForm filtredItem={item}/>
								</div>
							)
						})}
					</div>
					<span style={{margin: "10px"}}/>
					<div className={'inputMsg'}>
						<Form form={msgForm} onFinish={onFinish}>
							<div style={{display: "flex", justifyContent: "space-between"}}>
								<Form.Item
									style={{width: "100%"}}
									name="type"
									rules={[{
										required: true,
										message: 'الرجاء كتابة الرسالة"'
									}]}>
									<Input style={{height:'20px'}} />
								</Form.Item>
								<Button htmlType="submit" style={{marginRight:'10px',fontWeight:'bolder'}}>
									&#9658;
								</Button>


							</div>
						</Form>
					</div>
				</div>
			</Modal>
		</div>
	);

}

const 	Conversation: React.FC<{ conv: any, openModal: Function }> = ({conv, openModal}) => {
	const userToken = useSelector((state: RootState) => state.auth.userLogged);
	return (

		<div className={'convBox'} onClick={() => openModal()}>
			{userToken.user.role==='prof' &&			<img  className={'convPhoto'} src={`${conv.photo}`} alt={""} />
			}
			{userToken.user.role==='student' &&			<img  className={'convPhoto'} src={`${conv.photo}`} alt={""} />
			}
			<p className={'convName'}>  {conv.user}
			</p>
		</div>
	)
}

export default MessageHome