import React, {useEffect, useRef, useState} from 'react';
import {Routes, Route, Link, BrowserRouter as Router, Navigate, useNavigate} from "react-router-dom";

import './App.css';
import "antd/dist/antd.css";
import SiderBarAdmin from "./component/Sider/SiderBarAdmin";
import NavBar from "./component/NavBar/NavBar";
import Director from "./pages/Director/Director";
import Prof from "./pages/Prof/Prof";
import Etudiant from "./pages/Etudiant/etudiant";
import Abonnement from "./pages/Abonnement/Abonnement";
import Transfer from "./pages/Transfer/Transfers";
import Notification from "./pages/notifications/Notifications";
import TabsSettings from "./pages/Settings/TabsSettings";
import Chapter from "./pages/Settings/Chapter/Chapteer";
import Ressources from "./pages/Settings/Ressource/Ressource";
import Prices from "./pages/Settings/Prices/price";
import DetailProf from "./pages/Prof/detailProf";
import ClasseInfo from "./pages/Prof/ProfDetailSideBar/Classes/classeInfo";
import HomeWork from "./pages/Prof/ProfDetailSideBar/HomeWork/homeWork";
import ExamProf from "./pages/Prof/ProfDetailSideBar/Exam/examProf";
import Follow from "./pages/Prof/ProfDetailSideBar/FollowRecord/Follow";
import DetailEtudiant from "./pages/Etudiant/DetailEtudiant/detailEtudiant";
import HomeWordEtudiant from "./pages/Etudiant/DetailEtudiant/HomeWorkEtudiant/homeWordEtudiant";
import ExamEtudiant from "./pages/Etudiant/DetailEtudiant/ExamEtudiant/examEtudiant";
import MainPageProf from "./pages/DashProf/mainPageProf/MainPageProf";
import Stat from "./pages/Stats/stat";
import AddNewDirector from "./pages/Director/addNewDirector";
import ListConversation from './component/Message/listConvertation'
// @ts-ignore
import loader from './assets/loader-svgrepo-com.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import Login from "./component/Authentification/Login";
import MyClass from "./pages/DashProf/myClassProf/myClass";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import NavbarStudent from "./pages/DashEtudiant/navbarStudent/navbarStudent";
import Home from "./component/socialMedia/home";
import History from "./pages/history/history";
import AddProf from "./pages/Prof/addProf";
import DetailAnnounce from "./pages/Announce/detailAnnounce/detailAnnounce";
import Signal from "./pages/sigql/signal";
import TestChat from "./component/Chat/chat";
import Videao from "./component/Videao/videao";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications"
import {ContextProvider} from "./Context";
import MessageHome from "./pages/Message/messageHome";
import {getMessage} from "./store/modules/Auth/authService";
import {setLoading, setLogged, setUserLogged} from "./store/modules/Auth/AuthModule";

function App() {
	const isLoding = useSelector((state: RootState) => state.auth.isLoading)
	let isLogged = useSelector((state: RootState) => state.auth.isLogged)
	const userLoggedTest=useSelector((state:RootState)=>state.auth.userLogged)
	const dispatch=useDispatch()
	const user=useRef<any>()
      const test=localStorage.getItem('user')
	useEffect(()=>{
		if (test) {
			user.current=(JSON.parse(test) || '{}')
			dispatch(setUserLogged({token:userLoggedTest?.token,user:user.current}))
			dispatch(setLogged(true))
			dispatch(setLoading(false))
		}
	},[test])
	let userLogged=user.current

	// let userLogged = JSON.parse(localStorage.getItem('token')|| '');
	// const currentUser = JSON.parse(localStorage.getItem('token')!);
	return (
		<div>
			<ContextProvider>
				{isLogged && (userLogged?.role === 'admin' || userLogged?.role == 'superAdmin') ?
					<Router>
						{isLoding && <div className={'loader'}>
                            <img draggable={false} className={'loaderImage'} alt={''} src={loader}/>
                        </div>}
						<SiderBarAdmin/>
						<div className={'bodyContainer'}>
							<Routes>
								<Route path={'/director'} element={<Director/>}/>
								<Route path={'/siganl'} element={<Signal/>}/>
								<Route path={'*'} element={<Navigate to={'/director'}/>}/>
								<Route path={'/prof'} element={<Prof/>}/>
								<Route path={'/addprof'} element={<AddProf/>}/>
								<Route path={'/prof/detail/:id'} element={<DetailProf/>}>
									<Route path={'/prof/detail/:id/homework'} element={<HomeWork/>}/>
									<Route path={'/prof/detail/:id/exam'} element={<ExamProf/>}/>
									<Route path={'/prof/detail/:id/follow'} element={<Follow/>}/>
									<Route index element={<ClasseInfo/>}/>
								</Route>
								<Route path={'/etudiant'} element={<Etudiant/>}/>
								<Route path={'/etudiant/detail/:id'} element={<DetailEtudiant/>}>
									v <Route index element={<HomeWordEtudiant/>}/>
									<Route path={'/etudiant/detail/:id/exam'} element={<ExamEtudiant/>}/>

								</Route>
								<Route path={'/profilProf'} element={<MainPageProf/>}/>
								<Route path={'/history'} element={<History/>}/>
								<Route path={'/abonnement'} element={<Abonnement/>}/>
								<Route path={'/transfer'} element={<Transfer/>}/>
								<Route path={'/notification'} element={<Notification/>}/>
								<Route path={'/setting'} element={<TabsSettings/>}>
									<Route path={'/setting/ressource'} element={<Ressources/>}/>
									<Route path={'/setting/price'} element={<Prices/>}/>
									<Route index element={<Chapter/>}/>
								</Route>
								<Route path={'/stat'} element={<Stat/>}/>
								<Route path={'/ajout'} element={<AddNewDirector/>}/>


								<Route path={'/login'} element={<Login/>}/>z
							</Routes>
						</div>
					</Router> : isLogged && userLogged?.role === 'prof' ?


						<Router>
							<Layout style={{height: "100vh"}} className="layout">
								<NavbarStudent/>
								<Content>
									<Routes>
										<Route path={'/profilProf'} element={<MainPageProf/>}/>
										<Route path={"/social_media"} element={<Home/>}/>
										<Route path={'/detailAnnounce'} element={<DetailAnnounce/>}/>
										<Route path={'/chat'} element={<TestChat/>}/>
										<Route path={'/conversation'} element={<ListConversation/>}/>
										<Route path={"*"} element={<Home/>}/>
									</Routes>
								</Content>

							</Layout>


						</Router>
						:
						isLogged && userLogged?.role === 'student' ?
							<Router>
								<Layout style={{height: "100vh"}} className="layout">
									<NavbarStudent/>
									<Content>
										<Routes>
											<Route path={'/profilProf'} element={<MainPageProf/>}/>
											<Route path={"/social_media"} element={<Home/>}/>
											<Route path={'/detailAnnounce'} element={<DetailAnnounce/>}/>
											<Route path={'/chat'} element={<TestChat/>}/>
											<Route path={'/conversation'} element={<ListConversation/>}/>
											<Route path={"*"} element={<Home/>}/>
										</Routes>
									</Content>

								</Layout>


							</Router>


							:


							<Login/>


				}


			</ContextProvider>
		</div>


	);
}

export default App;
