"use strict";

import React from "react";
import PropTypes from "prop-types";
import "chartjs-plugin-datalabels";

// Components //
import VideoBrief from "./Sections/videoBrief";
import Card from "../../components/Card";

import switchTabs from "./switchTabs";
import style from "./styles.scss";

class Library extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<div className={style.main}>
					<VideoBrief />
				</div>
				<div className="col-12 mt-10 pb-10">
					<Card
						title="Lumiere Data"
						customHeaderClass="bg-charcoal-grey border-bt-dark color-white"
						customBodyClass="bg-charcoal-grey color-white"
					>
						{switchTabs(
							this.props.params.tab,
							this.props.routeParams.id,
							this.props.location.pathname
						)}
					</Card>
				</div>
			</React.Fragment>
		);
	}
}

Library.propTypes = {
	router: PropTypes.object,
	params: PropTypes.object,
	location: PropTypes.object,
	routeParams: PropTypes.object
};

export default Library;
