import React from 'react'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import style from 'Containers/Marketview/style.scss';

const TotalViewsDougnutChart = ({ doughnutData }) => {
  return (
		<div className="d-flex justify-space-between align-items-center">
			<DoughnutChart
				wrapperClassName="wrapperClassName"
				chartClassName="customChartClass"
				width={270}
				height={270}
				data={doughnutData}
				dataLabelColor="#ffffff"
				tooltip={true}
				dataLabelFunction="insertAfter"
				dataLabelInsert="%"
				labelsPosition="left"
				labelsClassName="customLabelClass"
				labelsData={doughnutData.labels}
			/>
		</div>

  )
}

export default TotalViewsDougnutChart
