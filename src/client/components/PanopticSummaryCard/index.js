import React, { Component } from 'react';
import PropTypes from "prop-types";

import classnames from 'classnames';
import style from './style.scss';

const PanopticSummaryCard = ({ description, title }) => {
    const summaryContainerClass = classnames('col-4 shadow-1', style.panopticSummaryCard);
    const summaryDescriptionClass = classnames(style.description);
    const summaryTitleClass = classnames('text-bold', style.title);

    return(
      <div className={summaryContainerClass}>
        <div className={summaryDescriptionClass}>
          <span>{description}</span>
        </div>
        <div className={summaryTitleClass}>
          <span>{title}</span>
        </div>
      </div>
    );
}

PanopticSummaryCard.propTypes= {
  description: PropTypes.string,
  title: PropTypes.string
};

export default PanopticSummaryCard;
