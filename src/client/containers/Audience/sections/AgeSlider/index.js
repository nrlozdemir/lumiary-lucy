import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceAgeSlider } from 'Reducers/audience'
import Module from 'Components/Module'
import AudienceSlider from 'Components/Sliders/Audience'
import style from 'Containers/Audience/style.scss'

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
      infoText,
    } = this.props

    return (
      <Module
        moduleKey={'Audience/AgeSlider'}
        title="Most Popular Videos By Age, Engagement and Date"
        action={this.callBack}
        filters={[
          {
            type: 'metric',
            selectKey: 'engagementOption',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'dateRangeOption',
            placeHolder: 'Date',
            defaultValue: 'month',
          },
        ]}
        infoText={infoText}
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
