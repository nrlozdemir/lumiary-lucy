import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceAgeSlider } from 'Reducers/panoptic'

import AudienceSlider from 'Components/Sliders/Audience'
import SelectFilters from 'Components/SelectFilters'

import classnames from 'classnames'
import style from 'Containers/Audience/style.scss'

import Module from 'Components/Module'

class AgeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVideo: null,
    }
  }

  callBack = (data, moduleKey) => {
    this.props.getAudienceAgeSliderData(data)
  }

  onChangeSlider = (video) => {
    this.setState({
      selectedVideo: video,
    })
  }

  render() {
    const {
      audienceAgeSliderData: { data, loading, error },
    } = this.props

    return (
      <Module
        moduleKey={'Audience/AgeSlider'}
        title="Most Popular Videos By Age, Engagement and Date"
        action={this.callBack}
        filters={[
          {
            type: 'engagement',
            selectKey: 'AAS-asd',
            placeHolder: 'Engagement',
          },
          {
            type: 'timeRange',
            selectKey: 'AAS-wds',
            placeHolder: 'Date',
          },
        ]}
      >
        <div className={style.audienceContainer}>
          {data && data.length > 0 && (
            <AudienceSlider
              items={data}
              changeVideo={(video) => this.onChangeSlider(video)}
            />
          )}
        </div>
      </Module>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceAgeSliderData: makeSelectAudienceAgeSlider(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(AgeSlider)
