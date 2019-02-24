import React from "react"
import classnames from "classnames"

import style from "./style.scss"

import RadarChart from "Components/Charts/Panoptic/RadarChart"

const CompareShares = ({ radarData }) => {
  const compareSharesContainer = classnames(
    "shadow-1 col-12 mt-48 mb-48",
    style.compareSharesContainer
  );

  const info = classnames("col-6", style.info);
  const radarComponent = classnames("col-4", style.radarComponent);

  return (
    <div className={compareSharesContainer}>
      <div className={style.componentTitle}>
        Dominant Color, Facebook & YouTube Shares
      </div>
      <div className={radarComponent}>
        <RadarChart data={radarData}/>
      </div>
      <div className="col-4">
        <div className={info}>
          <div className={style.infoTitle}>Facebook</div>
          <ul>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
          </ul>
        </div>
        <div className={info}>
          <div className={style.infoTitle}>Facebook</div>
          <ul>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
            <li>
              <span>Blue</span>
              <br /> 24.6k Shares
            </li>
          </ul>
        </div>
      </div>
      <div className={radarComponent}>
        <RadarChart data={radarData}/>
      </div>
    </div>
  )
}


export default CompareShares
