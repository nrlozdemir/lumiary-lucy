import React, { Component } from "react"
import classnames from "classnames"

import style from "./style.scss"

import Select from "Components/Form/Select"
import HorizontalStackedBarChart from "Components/Charts/Panoptic/HorizontalStackedBarChart"
import StadiumChart from 'Components/Charts/Panoptic/StadiumChart'

class PacingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption });
  };

  render() {
    const { barData } = this.props;
    const { likes, date } = this.state;

    const pacingCardContainer = classnames(
      "shadow-1 col-12 mt-72",
      style.pacingCardContainer
    );

    return (
      <div className={pacingCardContainer}>
        <div className={style.componentTitle}>
          <span className={style.title}>Pacing For Each Format by Performance</span>
          <div className={style.selects}>
            <Select
              name="likes"
              customClass="custom-select"
              placeholder="Select Views"
              value={likes || ""}
              onChange={option => this.handleChange(option, "likes")}
              options={[
                { value: "Likes", label: "Likes" },
                { value: "Comments", label: "Comments" }
              ]}
            />
            <Select
              name="date"
              customClass="custom-select"
              placeholder="Select Views"
              value={date || ""}
              onChange={option => this.handleChange(option, "date")}
              options={[
                { value: "Past Month", label: "Past Month" },
                { value: "Past Year", label: "Past Year" }
              ]}
            />
          </div>
        </div>
        <div className="col-6">
          <HorizontalStackedBarChart barData={barData}/>
        </div>
        <div className="col-6">
          <StadiumChart />
        </div>
      </div>
    );
  }
}

export default PacingCard;
