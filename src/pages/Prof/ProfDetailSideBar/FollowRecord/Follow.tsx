import React from "react";
import TabForm from "../../../../component/Tableau/tableauxForm";
import {FollowTab} from "./FollowConst";

const Follow=()=>{
	return(
		<div>
			<TabForm filterData={FollowTab}/>
		</div>
	)
}
export default Follow