import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../Context';

const Notifications = () => {
	const { answerCall, call, callAccepted,leaveCall } = useContext(SocketContext);

	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<h1>{call.name} يتصل بك:</h1>
					<Button variant="contained" color="primary" onClick={answerCall}>
						رد على المكالة
					</Button>
					{/*<Button variant="contained" color="primary" onClick={leaveCall}>*/}
                    {/*      لا ترد على المكالمة*/}
					{/*</Button>*/}
				</div>
			)}
		</>
	);
};

export default Notifications;
