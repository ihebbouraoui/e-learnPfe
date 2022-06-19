import React, {useState} from "react";
import {notification} from "antd";

const JoinRoom = () => {

	const [room, setRoom] = useState<any>('');
	const validator=(room:any)=>{
		return room.length !== 0;
	}
	const onSubmit = (e:any) => {
		if (!validator(e)){
			notification.open({
				message: 'تحذير',
				description:'الرجاء ادخال المعرف',
				onClick: () => {
					console.log('Notification Clicked!');
				},})
		}else {
			window.location.assign(`/video/${room}`);

		}
	};
	return (
		<div className={'joinRoomForm'} style={{
			position: 'fixed',
			bottom: '10%',
			display: "flex",
			flexDirection: 'column',
			alignItems: 'center',
			alignContent: 'center',
			left: '30%',
			backgroundColor: 'whitesmoke',
			height: '50%',
			width: '50%',
			boxShadow: '0 0 10px 0 gray',
			padding: '20px'
		}}>
			<span style={{fontSize: '30px', fontWeight: 'bold', color: 'black', fontFamily: 'serif'}}
				  className={'titleJoinRoom'}> يجب ادخال معرف الغرفة</span>
			<div style={{height:'100px'}}></div>
			<input style={{backgroundColor: 'white', width: '100%', height: '50px',			boxShadow: '0 0 10px 0 gray',
			}} type="text"
				   onChange={(e) => setRoom(e.target.value)}
			       placeholder={'معرف الغرفة'}
			/>
			<div style={{height:'100px'}}></div>

			<button
				style={{width: '50%', fontSize: '20px', fontWeight: 'bold', color: 'white', backgroundColor: 'blue'}}
				onClick={(e:any)=>onSubmit(room)}>تأكيد
			</button>

		</div>
	);
}
export default JoinRoom