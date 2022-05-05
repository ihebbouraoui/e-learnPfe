import React, { useEffect, useState } from "react";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import './chat.css'
import Sidebar from "../../components/Sidebar";

function ChatLogique({ socket, username, room }:any) {
	const [currentMessage, setCurrentMessage] = useState<any>("");
	const [messageList, setMessageList] = useState<any>([]);
	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);
			setMessageList((list:any) => [...list, messageData]);
			setCurrentMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data:any) => {
			setMessageList((list:any) => [...list, data]);
		});
	}, [socket]);

	return (
		<div className="chat-window">
			<div className={'appl-vid'}>
				<Sidebar/>
			</div>
			<div className={'chat_live'}>
				<div className="chat-header">
					<p>Live Chat</p>
				</div>
				<div className="chat-body">
					<ScrollToBottom className="message-container">
						{messageList.map((messageContent:any) => {
							return (
								<div
									className="message"
									id={username === messageContent.author ? "you" : "other"}
								>
									<div>
										<div className="message-content">
											<p>{messageContent.message}</p>
										</div>
										<div className="message-meta">
											<p id="time">{messageContent.time}</p>
											<p id="author">{messageContent.author}</p>
										</div>
									</div>
								</div>
							);
						})}
					</ScrollToBottom>
				</div>
				<div className="chat-footer">
					<input
						type="text"
						value={currentMessage}
						placeholder="Hey..."
						onChange={(event) => {
							setCurrentMessage(event.target.value);
						}}
						onKeyPress={(event) => {
							event.key === "Enter" && sendMessage();
						}}
					/>
					<button onClick={sendMessage}>&#9658;</button>
				</div>
			</div>

		</div>
	);
}

export default ChatLogique;