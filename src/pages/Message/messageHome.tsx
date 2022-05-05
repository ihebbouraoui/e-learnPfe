import React, {useEffect, useState} from "react";
import {getMessage, setMessage} from "../../store/modules/Auth/authService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Button, Form, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import ConversationForm from "./conversationForm";
import './messageHome.css'
import {useNavigate} from "react-router-dom";
import {setLoading} from "../../store/modules/Auth/AuthModule";

const MessageHome :React.FC<{ listConversations: Array<any> }> = ({listConversations}) => {
	// console.log(listConversations)
	const nav=useNavigate()
	const onFinish = (values: any) => {
		const msg = {
			messageFrom: userToken.user.mail,
			messageTo: selectedConv?.user,
			values: values.type,
			avatarFrom: userToken.user.photo,
			avatrTo: selectedConv?.avatar
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
			} } width={"30%"}  bodyStyle={{background:'linear-gradient(315deg, #aee1f9 0%, #f6ebe6 74%)',height:'50%'}} centered>

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
										message: 'Please input your message"'
									}]}>
									<TextArea rows={1}/>
								</Form.Item>
								<Button htmlType="submit" style={{background:'linear-gradient(352deg, #ff00f814 60%, #0008ff00)',fontWeight:'bolder',fontSize:'15px'}}>
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
	return (

		<div onClick={() => openModal()}>
			<p> محادثة مع  : {conv.user} <img src={conv.photo} alt={""} style={{width: 50}}/>
			</p>
		</div>
	)
}

export default MessageHome