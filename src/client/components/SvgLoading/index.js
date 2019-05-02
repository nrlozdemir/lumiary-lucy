import React from "react";
import style from "./style.scss";
import classNames from "classnames";

/* eslint-disable react/prefer-stateless-function */
class SvgLoading extends React.Component {

	render() {
		const { percentage, r, R,  pointCount} = this.props;

		const active = classNames(
			style.service,
			"active"
		);

		let g = [];

		for(let i = 0; i < pointCount; i++){
			g.push(
				<g key={i} className={percentage > ((100 /  pointCount ) * (i + 1)) ? active : style.service}
					 transform={`matrix(1,0,0,1, ${-1 * (R * Math.cos(( 90 + ((360 / pointCount) * i)) * (Math.PI / 180)))}, ${-1 *(R * Math.sin((90 + ((360 / pointCount) * i)) * (Math.PI / 180)))})`}>
					<g className="icon-wrapper">
						<circle r={r} cx={(R + r)} cy={(R + r) } style={percentage > ((100 / pointCount ) * (i + 1)) ? {fillOpacity: 1} : {}}/>
					</g>
				</g>
			)
		}

		return (
			<div>
				<svg id="circle-nav-services" width="100%" height={40 + 'vh'} viewBox={`0 0 ${R * 2 + r * 2} ${R * 2 + r * 2}`}>
					<g id="service-collection" className={style.serviceWrapper} width="100%" height="100%">
						<text x={((R + r) - 48)} y={((R + r + 16)) }><tspan>{percentage ? percentage + '%' : '0%'}</tspan></text>
						{
							g
						}
					</g>
				</svg>
			</div>
		);
	}
}

SvgLoading.propTypes = {};

export default SvgLoading;
