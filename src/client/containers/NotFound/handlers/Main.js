import React from 'react'
import { connect } from 'react-redux'

export class NotFoundMain extends React.Component {

    constructor() {
        super()
    }

    render() {
        
        return (
            <section className="invite-page">
                Not found
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        
    }
}

export default connect(mapStateToProps)(NotFoundMain)
