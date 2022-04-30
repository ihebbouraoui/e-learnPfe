import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {getUserById} from "../../../store/modules/Director/directorService";
import {setPostedBy} from "../../../store/modules/Director/directorModule";
import AnnounceCard from "../announceCard";
const DetailAnnounce=()=>{
	const announce=useSelector((state:RootState)=>state.announce.selectedAnnounce)
	console.log(announce)
	useEffect(()=>{
		getUserById({_id:announce?.postBy}).then((res:any)=>setPostedBy(res))
	},[])
	return(
		<div className={"anouunces"}>
			<AnnounceCard item={announce}/>

		</div>
	)
}
export default DetailAnnounce