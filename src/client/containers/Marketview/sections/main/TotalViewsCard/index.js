import React, { Component } from 'react';
import classnames from 'classnames';

import TotalViewsBarChart from 'Components/Charts/MarketView/TotalViewsBarChart'
import TotalViewsDoughnutChart from 'Components/Charts/MarketView/TotalViewsDoughnutChart'
import Select from 'Components/Form/Select';
import style from 'Containers/Marketview/style.scss';

class TotalViewsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption });
  };

  render() {
    const { views, platforms, date } = this.state;
    const { totalViewsData : { barData, doughnutData } } = this.props
    const chartContainer = classnames('shadow-1 col-12-gutter-20 mb-48', style.chartContainer);

    return (
      <div className={chartContainer}>
        <div className={style.cardTitle}>
          <span>Total Views For All Platforms In The Past Month</span>
          <div className={style.selects}>
            <Select
              name="views"
              customClass="custom-select"
              placeholder="Select Views"
              value={views || ''}
              onChange={(option) => this.handleChange(option, 'views')}
              options={[{ value: 'Views', label: 'Views' }, { value: 'Comments', label: 'Comments' }]}
            />
            <Select
              name="platforms"
              customClass="custom-select"
              placeholder="Select Platforms"
              value={platforms || ''}
              onChange={(option) => this.handleChange(option, 'platforms')}
              options={[{ value: 'All Platforms', label: 'All Platforms' }]}
            />
            <Select
              name="date"
              customClass="custom-select"
              placeholder="Select Date"
              value={date || ''}
              onChange={(option) => this.handleChange(option, 'date')}
              options={[
                { value: 'Past Month', label: 'Past Month' },
                { value: 'Past Year', label: 'Past Year' }
              ]}
            />
          </div>
        </div>
        <div className="grid-collapse">
          <div className="col-6">
            {barData && <TotalViewsBarChart barData={barData}/>}
          </div>
          <div className="col-6">
            {doughnutData && <TotalViewsDoughnutChart doughnutData={doughnutData}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default TotalViewsChart;
