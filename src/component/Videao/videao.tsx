import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, {useContext, useEffect, useRef, useState} from "react"
// @ts-ignore
import {CopyToClipboard} from "react-copy-to-clipboard"
import Peer from "simple-peer";
import {SocketContext} from "../../Context";

const io = require("socket.io-client");
const socket = io('http://localhost:5000/', {transports: ['websocket']});

const Videao = () => {
	const [me, setMe] = useState<any>("")
	const [stream, setStream] = useState<any>()
	const [receivingCall, setReceivingCall] = useState<any>(false)
	const [caller, setCaller] = useState<any>("")
	const [callerSignal, setCallerSignal] = useState<any>()
	const [callAccepted, setCallAccepted] = useState<any>(false)
	const [idToCall, setIdToCall] = useState<any>("")
	const [callEnded, setCallEnded] = useState<any>(false)
	const [name, setName] = useState<any>("")
	const myVideo = useRef<any>()
	const userVideo = useRef<any>()
	const connectionRef = useRef<any>()


	useEffect(() => {
		navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		})

		socket.on("me", (id: any) => {
			setMe(id)
		})

		socket.on("callUser", (data: any) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])
	const callUser = (id: any) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data: any) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream: any) => {

			userVideo.current.srcObject = stream

		})
		socket.on("callAccepted", (signal: any) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall = () => {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data: any) => {
			socket.emit("answerCall", {signal: data, to: caller})
		})
		peer.on("stream", (stream: any) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<>
			<h1 style={{textAlign: "center", color: '#fff'}}>Zoomish</h1>
			<div className="container">
				<div className="video-container">
					<div className="video">
						{stream && <video playsInline muted ref={myVideo} autoPlay style={{
							position: 'absolute',
							left: '10px',
							right: '39%',
							bottom:'631px',
							width: '500px'
						}}/>}
					</div>
					<div className="video">
						{callAccepted && !callEnded ?
							<video  playsInline ref={userVideo} autoPlay style={{width: "300px"}}/> :
							null}
					</div>
				</div>
				<div className="myId">
					<TextField
						id="filled-basic"
						label="Name"
						variant="filled"
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{marginBottom: "20px"}}
					/>
					<CopyToClipboard text={me} style={{marginBottom: "2rem"}}>
						<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large"/>}>
							Copy ID
						</Button>
					</CopyToClipboard>

					<TextField
						id="filled-basic"
						label="ID to call"
						variant="filled"
						value={idToCall}
						onChange={(e) => setIdToCall(e.target.value)}
					/>
					<div className="call-button">
						{callAccepted && !callEnded ? (
							<Button variant="contained" color="secondary" onClick={leaveCall}>
								End Call
							</Button>
						) : (
							<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
								<PhoneIcon fontSize="large"/>
							</IconButton>
						)}
						{idToCall}
					</div>
				</div>
				<div>
					{receivingCall && !callAccepted ? (
						<div className="caller">
							<h1>{name} is calling...</h1>
							<Button variant="contained" color="primary" onClick={answerCall}>
								Answer
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}

export default Videao