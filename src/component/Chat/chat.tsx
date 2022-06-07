import React, {useEffect, useState} from "react";
import ChatLogique from "./chatLogique";
import './chat.css'
const io = require("socket.io-client");
const socket = io('http://localhost:3002/', { transports : ['websocket'] });


const TestChat=()=>{
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);


	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(true);
		}
	};
	return(
		<div className="App">
			{!showChat ? (
				<div className="joinChatContainer">
					<h3>انضم الى الغرفة</h3>

					<input
						type="text"
						placeholder="الاسم"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="معرف الغرفة"

						onChange={(event) => {
							setRoom(event.target.value);
						}}
					/>
					<button className={'btn-success'} style={{backgroundColor:'gray'}} onClick={joinRoom}>Join A Room</button>
				</div>
			) : (
				<ChatLogique socket={socket} username={username} room={room} />
			)}
		</div>
	);

}
export default TestChat