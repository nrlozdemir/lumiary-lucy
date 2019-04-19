import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { chartOptions } from './options'
import { randomKey } from '../../../../utils';

const TopVideosChart = ({ chartData }) => {
  return (
    <Bar
      height={80}
      backgroundColor="#242b49"
      data={chartData}
      datasetKeyProvider={() => randomKey(5)}
      options={{
        ...chartOptions,
        chartArea: {
          backgroundColor: '#fff',
        },
        plugins: {
          datalabels: false,
        }
      }}
    />
  )
}

export default TopVideosChart
