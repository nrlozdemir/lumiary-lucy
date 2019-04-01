import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectPanoptic } from 'Reducers/panoptic'

import SelectFilters from 'Components/SelectFilters';
import RadarChart from 'Components/Charts/Panoptic/RadarChart'
import style from 'Containers/Audience/style.scss';
import sectionStyle from './style.scss';
import { Progress } from "./Progress";

class DominantColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectPlatforms: '',
      selectLikes: '',
      selectDate: ''
    };
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }
  render() {
    const { selectLikes, selectPlatforms, selectDate } = this.state;
    const { panoptic: { audienceData: { chartData } } } = this.props;

    return (
      <div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
        <div className={style.cardTitle + ' col-12'}>
          <span>Dominant Color Performance By Gender</span>
          <div className={style.selects}>
            <SelectFilters
              selectPlatformsShow
              selectLikesShow
              handleSelectFilters={this.handleSelectFilters}
              selectDateShow
              selectPlatforms={selectPlatforms}
              selectLikes={selectLikes}
              selectDate={selectDate}
            />
          </div>
        </div>
        <div className="col-6">
          <div className={style.label}>
            <span>Male</span>
          </div>
          <div style={{ padding: "0 8vw" }}>
            <RadarChart data={chartData[0].datas} />
          </div>
        </div>
        <div className="col-6">
          <div className={style.label}>
            <span>Female</span>
          </div>
          <div style={{ padding: "0 8vw" }}>
            <RadarChart data={chartData[1].datas} />
          </div>
        </div>
        <div className={"col-12 mt-32 " + sectionStyle.progressContainer}>
          <Progress progress={chartData[0].progress} reverse={true} />
          <div className={sectionStyle.progressCountArea}>
            <span className={sectionStyle.progressCount}>1</span>
            <span className={sectionStyle.progressCount}>2</span>
            <span className={sectionStyle.progressCount}>3</span>
          </div>
          <Progress progress={chartData[1].progress} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  panoptic: makeSelectPanoptic(),
})

const withConnect = connect(
  mapStateToProps,
  null
)

export default compose(withConnect)(DominantColor)
