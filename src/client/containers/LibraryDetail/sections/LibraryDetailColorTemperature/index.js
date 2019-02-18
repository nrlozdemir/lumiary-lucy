import React from 'react';
import { Field } from "redux-form";

import style from "./style.scss";
import { selectOptions } from "./options";

import Select from 'Components/Form/Select'
import ColorTemperatureChart from 'Components/ColorTemperatureChart'

const LibraryDetailColorTemperature = ({colorTempData}) => {
  return(
    <div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
      <div className={style.radialChartsContainer}>
        <div className={style.temperatureHeader}>
          <div>
            <h2>Color Temperature / Sentiment Comparison</h2>
          </div>
          <div className="d-flex align-items-center justify-space-between">
            <div className="d-flex align-items-center mr-8">
              <span className={style.redRound}></span>
              <p>This Video</p>
            </div>
            <div className="d-flex align-items-center mr-8">
              <span className={style.duskRound}></span>
              <p>Library Average</p>
            </div>
            <div className="d-flex align-items-center mr-8">
              <span className={style.purpleRound}></span>
              <p>Industry</p>
            </div>
          </div>
          <div className={style.inputWrapper}>
            <form>
              <Field
                component={Select}
                options={selectOptions}
                id="NumberOfScenes"
                name="NumberOfScenes"
                placeholder="Select One"
                label="Number of Scenes"
                className={style.formWrapper}
              />
            </form>
          </div>
        </div>
        <div className={style.temperatureContentContainer}>
          {
            colorTempData && <ColorTemperatureChart colorTempData={colorTempData} />
          }
        </div>

      </div>
    </div>
  )
};

export default LibraryDetailColorTemperature;

