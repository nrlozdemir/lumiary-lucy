import React from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { Header } from "./sections/Header";
import { Performance } from "./sections/Performance";
import { DominantColor } from "./sections/DominantColor";
import { ColorTemperature } from "./sections/ColorTemperature";
import { ChangeOverTime } from "./sections/ChangeOverTime";

export class Audience extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Performance />
				<ColorTemperature />
				<ChangeOverTime />
				<DominantColor />
			</React.Fragment>
		);
	}
}

const mapStateToProps = createStructuredSelector({
})

function mapDispatchToProps(dispatch) {
	return {}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
)

export default compose(withConnect)(Audience)
