import React from 'react'
import classnames from 'classnames';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectPanoptic } from 'Reducers/panoptic'

import style from 'Containers/Audience/style.scss';
import sectionStyle from "./style.scss";

import { ColorTemperature as Chart } from 'Components/ColorTemperatureChart/ColorTemperature'
import SelectFilters from 'Components/SelectFilters'
class ColorTemperature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDate: ''
    }
  }

  handleSelectFilters = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { selectDate } = this.state;
    const { panoptic: { audienceData: { colorTempData } } } = this.props;

    return (
      <div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
        <div className={style.cardTitle + ' col-12'}>
          <span>Color Temperature / Sentiment Comparison</span>
          <div className={"d-flex align-items-center justify-space-between " + style.headerLabel}>
            <div className="d-flex align-items-center mr-32">
              <span className={style.redRound} />
              <p>Male</p>
            </div>
            <div className="d-flex align-items-center mr-32">
              <span className={style.duskRound} />
              <p>Female</p>
            </div>
          </div>
          <div className={style.selects}>
            <SelectFilters selectDateShow selectDate={selectDate} handleSelectFilters={this.handleSelectFilters} />
          </div>
        </div>
        <div className="col-12" style={{ display: 'flex', padding: "40px 0" }}>
          {
            colorTempData.map((temp, index) => (
              <div className={classnames("col-4", sectionStyle.chartWrapper)} key={"temp-chart-" + index}>
                <Chart temp={temp} />
                <div className={sectionStyle.chartInfo}>{temp.text}</div>
              </div>
            ))
          }
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

export default compose(withConnect)(ColorTemperature)
