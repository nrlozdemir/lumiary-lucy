import React from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

export class Audience extends React.Component {
	render() {
		return (<div>Audience</div>)
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