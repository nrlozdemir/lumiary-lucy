import React from 'react'
import { connect } from 'react-redux'


export class NotFoundHeader extends React.Component {

    constructor() {
        super()
    }

    render() {
        const { navLinks } = this.props

        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { app } = state
    return {
    }
}

export default connect(mapStateToProps)(NotFoundHeader)
