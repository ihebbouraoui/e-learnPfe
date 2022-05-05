import React, {useEffect} from 'react';
import {Avatar} from "antd";
import './messageHome.css'


const ConversationForm: React.FC<{ filtredItem: any }> = ({filtredItem}) => {

	return (
		<div className={'conv'}>
				<div className={'convAvatar'}>
					<Avatar src={filtredItem.avatarFrom} alt={''}/>
				</div>
				<div className={'convVal'}>
					<p className={'typeP'}>{filtredItem.values} </p>
				</div>
		</div>
	);

}

export default ConversationForm