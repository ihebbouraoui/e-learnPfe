import React, {useEffect} from "react";
import axios from "axios";
import {test} from "../store/modules/Director/directorService";
import {useParams} from "react-router-dom";
// @ts-ignore
import image from '../assets/2-01.png'

const Video = ({match}: any) => {
	const params = useParams()
	const id = params.id
	const domain = "https://ihebbouraoui.daily.co/";
	let script
	useEffect(() => {
		test(id)
		.then((res: any) => {
			if (res) {
				script = document.createElement("script");
				console.log(script)
				script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100vw",
              height: "100vh",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;
				document.body.appendChild(script);
			}
		})
		.catch((err) => console.log(err));
	}, [id]);
	// @ts-ignore

	return (
		<div style={{height:'80%'}}>
			<img
				style={{width: '100%', height: '130%', objectFit: 'cover',position:'relative',zIndex:'10000'}}
			   src={image}
			/>

		</div>
	)


}
export default Video