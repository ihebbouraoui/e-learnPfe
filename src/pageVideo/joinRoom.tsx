import React, { useState } from "react";
 const  JoinRoom = () => {
	const [room, setRoom] = useState<any>(null);
	const onSubmit = () => {
		window.location.assign(`/video/${room}`);
	};
	return (
		<div style={{position:'fixed',bottom:'0'}}>
			<input type="text" onChange={(e) => setRoom(e.target.value)} />
			<button onClick={onSubmit}>Submit</button>

		</div>
	);
}
export default JoinRoom