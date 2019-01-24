import React from 'react';
import style from "./style.scss";
import cn from 'classnames';

const Index = ({ data }) => {
  return (
    <div className={style.radialChart}>
      <div className={cn(style.radialChartRadius, "font-secondary-second font-size-14 text-center text-light")}>
        <span className={style.topTitle}>{data.topTitle}</span>
      </div>
      <h1 className="font-primary text-bold text-center mt-16 mb-16">
        {data.title}
      </h1>
      <p className="font-secondary-first font-size-14 text-bold">{data.basedOn}</p>
      <div className={cn(style.pointerContainer, 'mt-48 mb-48')}>
        <div className={style.pointerWrapper}>
          <span className="font-secondary-second font-size-12 color-cool-grey">Avg</span>
          <div className={style.pointerImages}>
            <div className={style.rotator} style={{ transform: `rotate(${data.pointerData || 0}deg)` }}>
              <div className={style.pointer} />
            </div>
          </div>
          <span className="float-left font-secondary-second font-size-12 color-cool-grey">Worse</span>
          <span className="float-right font-secondary-second font-size-12 color-cool-grey">Better</span>
          <div className="clearFix"></div>
        </div>
      </div>
      <div className={cn(style.radialChartRadius, "font-secondary-second font-size-12 text-center text-light")}>
        <span>{data.bottomText}</span><span>{data.likes}</span>
      </div>
    </div>
  );
}

export default Index;
