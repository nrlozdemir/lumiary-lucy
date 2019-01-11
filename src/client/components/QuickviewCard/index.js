/**
 *
 * QuickviewCard
 *
 */

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "Components/Form/Button";
import style from "./style.scss";

import { socialIconSelector } from "../../utils";

class QuickviewCard extends React.Component {
	render() {
		const {
			cardName,
			detailsLink,
			difference,
			differenceType,
			cards,
			social
		} = this.props;

		const iconClass = classnames(
			socialIconSelector(social) + " " + style.quickViewIcon
		);
		const cardClass = classnames("bg-dark-grey-blue " + style.quickviewCard);
		const cardHeaderClass = classnames("bg-dusk " + style.quickviewCardHeader);

		return (
			<div className={cardClass}>
				<div className={cardHeaderClass}>
					<i className={iconClass} /> {cardName}
				</div>
				<div className={style.quickviewCardContent}>
					{cards[0]}
					<div className={style.quickviewCardContentInfo}>
						<div className={style.differenceType}>{differenceType}</div>
						<div className={style.differenceCircle}>
							<div>
								<div>{difference}%</div>
								Difference
							</div>
						</div>
						<Button
							customClass="font-secondary-first text-bold"
							buttonText="Details"
							to={detailsLink}
						/>
					</div>
					{cards[1]}
				</div>
			</div>
		);
	}
}

QuickviewCard.propTypes = {
	cardName: PropTypes.string,
	detailsLink: PropTypes.string,
	difference: PropTypes.number,
	differenceType: PropTypes.string,
	cards: PropTypes.array,
	social: PropTypes.string
};

export default QuickviewCard;
