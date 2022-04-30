import React, {useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import {Avatar, Button, Card} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import './home.css'
import {getAnnounce} from "../../store/modules/Announce/announceService";
import {LikeOutlined, WechatOutlined} from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
// @ts-ignore
import photo from '../../assets/e-learning-mfc-min.jpg'
// @ts-ignore
import add from '../../assets/add-svgrepo-com.svg'
// @ts-ignore
import like from '../../assets/like-svgrepo-com.svg'
// @ts-ignore
import comment from '../../assets/comment-dots-svgrepo-com.svg'
// @ts-ignore
import search from '../../assets/search-svgrepo-com.svg'
import AnnounceCard from "../../pages/Announce/announceCard";
import {UploadOutlined} from '@ant-design/icons';

const Home = () => {
	const userConnect = useSelector((state: RootState) => state.auth.userLogged)
	const listAnnounce = useSelector((state: RootState) => state.announce.list_Announce)
	useEffect(() => {
		getAnnounce().then()
	}, [])
	return (
		<div>


			<div className={'container'}>

				<div className={'contenu'}>
					{/*<div className={'nav'}>*/}
					{/*	<div className={'right'}>*/}
					{/*		<div>*/}
					{/*			<img alt={''} className={'myAvatar'} src={userConnect.user.photo}/>*/}
					{/*		</div>*/}
					{/*		<div className={'detail'}>*/}
					{/*			<p> {userConnect.user.name} </p>*/}
					{/*			<p> {userConnect.user.role}</p>*/}
					{/*		</div>*/}

					{/*	</div>*/}
					{/*	<div className={'search'}>*/}
					{/*		<input type={'text'} style={{width: '100%', backgroundColor: '#80808057'}}/>*/}
					{/*		<img alt={''} className={'searchSvg'} src={search}/>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<div className={'underNav'}>
						<div className={"top"}>
							<img alt={''} className={'logo'} src={userConnect.user.photo}/>
							<input type={'text'} placeholder={'ادخل المعلومات هنا'} style={{
								width: '85%',
								backgroundColor: 'white',
								// border: 'black 2px solid',
								height: '100%'
							}}/>
						</div>
						<hr/>
						<div className={'bot'}>
							<Button className={'btn_add'}
									style={{width: '50%', borderRadius: '50px', paddingRight: '10px'}}
									icon={<UploadOutlined/>}>Click to Upload</Button>
							<Button className={'btn-success'} type={'primary'}
									style={{width: '50%', borderRadius: '50px'}}> Add </Button>
						</div>
					</div>
					<div className={'anouunces'}>
						{listAnnounce.map((item: any) => (
							<AnnounceCard item={item}/>
						))}

					</div>
				</div>
				<div className={'leftSide'}>
					<div className={'hederDetail'} style={{backgroundColor: '#ff000021'}}>
						<img alt={''} className={''} src={userConnect.user.photo}
							 style={{
								 borderRadius: '50px',
								 position: 'relative',
								 right: '45%',
								 paddingTop: '20px',
								 paddingBottom: '15px'
							 }}/>
					</div>
					<div className={'detailProfil'}>
						<Card>
							<p style={{fontSize:'xxx-large',color:'black'}}> {userConnect.user.name} </p>
							<p style={{fontSize:'25px',color:'gray'}}> {userConnect.user.role}</p>


						</Card>

					</div>
				</div>


			</div>

		</div>
	)
}
export default Home