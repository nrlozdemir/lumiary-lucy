import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import style from 'Containers/Marketview/style.scss';

const TotalViewsDougnutChart = ({ doughnutData }) => {
  return (
    <div className="d-flex justify-space-between align-items-center">
      <div className={style.colorList}>
        <div className={style.colorListItem}>Barstool Sports</div>
        <div className={style.colorListItem}>SB Nation</div>
        <div className={style.colorListItem}>ESPN</div>
        <div className={style.colorListItem}>Scout Media</div>
        <div className={style.colorListItem}>Fansided</div>
      </div>
      <div className={style.doughnutChart}>
        <Doughnut
          options={{
            responsive: false,
            legend: {
              display: false
            },
            plugins: {
              datalabels: false
            },
            layout: {
              padding: 0
            }
          }}
          width={300}
          height={300}
          data={doughnutData}
        />
        <div className="poa-middle text-center">
          Past Month
        <br />
          Combinded
        <br />
          Views
      </div>
      </div>
    </div>
  )
}

export default TotalViewsDougnutChart
