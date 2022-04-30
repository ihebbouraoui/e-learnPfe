import React from "react";
import FilterForm from "../../component/Filter/filterForm";
import {NotificationFormConst, NotificationTab} from "./NotificationConsts";
import TabForm from "../../component/Tableau/tableauxForm";

const Notification = () => {
	return (
		<div className={'directorMain'}>
			<FilterForm filterData={NotificationFormConst}/>
			<TabForm filterData={NotificationTab}/>
		</div>
	)
}
export default Notification