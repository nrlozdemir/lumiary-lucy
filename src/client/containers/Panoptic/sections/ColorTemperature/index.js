import React from 'react'
import { Field } from "redux-form";

import style from "./style.scss";
import { platforms, selectOneOptions, selectTwoOptions } from "./options";

import ColorTemperatureChart from "Components/ColorTemperatureChart";
import Select from "Components/Form/Select";

const PanopticColorTemperature = ({ colorTempData, }) => (
  <div className="col-12 shadow-1 mt-72 bg-dark-grey-blue">
    <div className={style.radialChartsContainer}>
      <div className={style.temperatureHeader}>
        <div>
          <h2 className="font-secondary-first">Color Temperature / Sentiment Comparison</h2>
        </div>
        <div className={style.inputWrapper}>
          <form className={style.form}>
            <Field
              component={Select}
              options={selectOneOptions}
              id="NumberOfScenes"
              name="Emotion"
              placeholder="Select One"
              label="Number of Scenes"
              className={style.formWrapper}
            />
            <Field
              component={Select}
              options={selectTwoOptions}
              id="NumberOfScenes"
              name="DateFilter"
              placeholder="Select One"
              label="Number of Scenes"
              className={style.formWrapper}
            />
          </form>
        </div>
      </div>
      <div className={style.temperatureContentContainer}>
        {
          colorTempData &&
          <ColorTemperatureChart
            borderLess
            verticalText
            colorTempData={colorTempData}
          />
        }
      </div>
      <div className={style.infoWrapperContainer}>
        <div className={style.infoWrapper}>
          <span className={style.infoText}>Views</span>
        </div>
        <div className={style.infoWrapper}>
          <span className={style.infoText}>Likes</span>
        </div>
        <div className={style.infoWrapper}>
          <span className={style.infoText}>Comment</span>
        </div>
        <div className={style.infoWrapper}>
          <span className={style.infoText}>Shares</span>
        </div>

      </div>
      <div className="d-flex align-items-center justify-content-center ph-48 mv-48">
        {
          platforms && platforms.map((platform, index) => (
            <div key={index} className="d-flex align-items-center mr-32">
              <span className={style.round} style={{ backgroundColor: `${platform.color}` }}></span>
              <p className={style.platformName}>{platform.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  </div>
)

export default PanopticColorTemperature
