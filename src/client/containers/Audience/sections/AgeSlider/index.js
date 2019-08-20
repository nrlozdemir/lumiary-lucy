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
// const defaultAgeRanges = Array.from(Array(54).keys(), (n) => n + 12).map(
//   (a) => ({
//     age: a,
//     loading: true,
//   })
// )

const defaultAgeRanges = [
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
].map((range) => ({ age: range, loading: true }))

const getAgesToFetch = (age) => {
  const idx = defaultAgeRanges.findIndex((r) => r.age === age)
  return idx > 1
    ? [
        defaultAgeRanges[idx - 1].age,
        age,
        ...(defaultAgeRanges[idx + 1] ? [defaultAgeRanges[idx + 1].age] : []),
      ]
    : [
        age,
        ...(defaultAgeRanges[idx + 1] ? [defaultAgeRanges[idx + 1].age] : []),
      ]
}

class AgeSlider extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentAge: [],
      params: null,
      videosArr: defaultAgeRanges,
    }

    this.onChangeSlider = debounce(this.onChangeSlider, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      audienceAgeSliderData: { data },
    } = this.props

    const { params } = this.state

    const {
      audienceAgeSliderData: { data: prevData },
    } = prevProps

    const { params: prevParams } = prevState

    if (!isEqual(data, prevData) || !isEqual(params, prevParams)) {
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
    const { getAudienceAgeSliderData, type } = this.props

    this.setState({ videosArr: defaultAgeRanges, params: data }, () => {
      const { currentAge } = this.state

      const agesToFetch = getAgesToFetch(currentAge)

      getAudienceAgeSliderData({
        ...data,
        type,
        loading: true,
        ages: agesToFetch,
      })
    })
  }

  onChangeSlider = ({ age }) => {
    const { getAudienceAgeSliderData, type } = this.props
    const { params, videosArr } = this.state

    let agesToFetch = getAgesToFetch(age)

    agesToFetch = agesToFetch.filter((a) => {
      const storedAge = find(videosArr, ['age', a])
      return !!storedAge && !!storedAge.loading
    })

    this.setState({ currentAge: age })

    params &&
      !!agesToFetch.length &&
      getAudienceAgeSliderData({
        ...params,
        type,
        loading: false,
        ages: agesToFetch,
      })
  }

  render() {
    const { videosArr } = this.state

    const {
      type,
      audienceAgeSliderData: { data, loading, error },
    } = this.props

    return (
      <Module
        actionOnProp={type}
        loading={loading}
        moduleKey={'Audience/AgeSlider'}
        title="Most Popular Videos By Age, Engagement and Date"
        action={this.callBack}
        filters={[
          {
            type: 'platformEngagement',
            selectKey: 'AP-ageeskude',
            placeHolder: 'Engagement by Platform',
            customOptions: [
              {
                label: 'Facebook',
                options: [{ value: 'facebook|views', label: 'Views' }],
              },
            ],
            defaultValue: { value: 'facebook|views', label: 'Views' },
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
