import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceAgeSlider } from 'Reducers/audience'
import Module from 'Components/Module'
import AudienceSlider from 'Components/Sliders/Audience'
import style from 'Containers/Audience/style.scss'
import { isEqual, find, debounce } from 'lodash'

// 12 - 65
const defaultAgeRange = Array.from(Array(54).keys(), (n) => n + 12).map(
  (a) => ({
    age: a,
    loading: true,
  })
)

class AgeSlider extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      prevAges: [],
      params: null,
      videosArr: defaultAgeRange,
    }

    this.onChangeSlider = debounce(this.onChangeSlider, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      audienceAgeSliderData: { data },
    } = this.props

    const {
      audienceAgeSliderData: { data: prevData },
    } = prevProps

    if (!isEqual(data, prevData)) {
      this.updateVideos(data)
    }
  }

  updateVideos = (videos) => {
    const { videosArr } = this.state

    const updatedVideos = [...videosArr]

    videos.forEach((video) => {
      const vidIdx = videosArr.findIndex((v) => v.age == video.age)
      updatedVideos[vidIdx] = video
    })

    this.setState({ videosArr: updatedVideos })
  }

  callBack = (data, moduleKey) => {
    const { getAudienceAgeSliderData } = this.props

    this.setState({ videosArr: defaultAgeRange, params: data }, () => {
      const { prevAges } = this.state

      getAudienceAgeSliderData({
        ...data,
        loading: true,
        ages: prevAges,
      })
    })
  }

  onChangeSlider = ({ age }) => {
    const { getAudienceAgeSliderData } = this.props
    const { params, videosArr } = this.state

    let agesToFetch = age > 1 ? [age - 1, age, age + 1] : [age, age + 1]

    agesToFetch = agesToFetch.filter((a) => {
      const storedAge = find(videosArr, ['age', a])
      return !!storedAge && !!storedAge.loading
    })

    this.setState({ prevAges: agesToFetch })

    params &&
      !!agesToFetch.length &&
      getAudienceAgeSliderData({
        ...params,
        loading: false,
        ages: agesToFetch,
      })
  }

  render() {
    const { videosArr } = this.state

    const {
      audienceAgeSliderData: { data, loading, error },
    } = this.props

    return (
      <Module
        loading={loading}
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
          },
        ]}
        bodyClass={style.sliderWrapper}
      >
        <div className={style.audienceContainer}>
          {videosArr && videosArr.length > 0 && (
            <AudienceSlider
              loading={loading}
              items={videosArr}
              changeVideo={this.onChangeSlider}
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
