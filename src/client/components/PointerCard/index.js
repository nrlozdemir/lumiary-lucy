import React from 'react';
import style from "./style.scss";
import cn from 'classnames';

const Index = ({ data }) => {
  return (
    <div className={style.radialChart}>
      {style.topTitle &&
				<div className={cn(style.radialChartRadius, "font-secondary-second font-size-14 text-center text-light")}>
					<span className={style.topTitle}>{data.topTitle}</span>
				</div>
			}
			{data.title &&
				<h1 className="font-primary text-bold text-center mt-16 mb-16">
					{data.title}
				</h1>
			}
      <p className="font-secondary-first font-size-14 text-bold">{data.basedOn}</p>
      <div className={style.pointerContainer}>
        <div className={style.pointerWrapper}>
          <span className="font-secondary-second font-size-12 color-cool-grey">Avg</span>
          <div className={style.pointerImages}>
						<div className={style.svgWrapper}>
							<span className={style.svgLineText}>{data.pointerData}K</span>
							<svg height="12" width="55">
								<line x1="11.5" y1="0.5" x2="55" y2="0.5" className={style.svgLine}/>
								<line x1="0" y1="12" x2="12" y2="0" className={style.svgLine} />
							</svg>
						</div>
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
				<p className={style.infoText}>
					<span className={style.redRound}></span>
					<span className={style.textBold}>{52}%</span> of your library
					is shot in <span className={style.textBold}>24fps</span>
				</p>
      </div>
    </div>
  );
}

export default Index;
