import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { chartOptions } from './options'

const TopVideosChart = ({ chartData, datasetKeyProvider }) => {
    return (
          <Bar
            height={80}
            backgroundColor="#242b49"
						data={chartData}
						datasetKeyProvider={datasetKeyProvider}
            options={{
              ...chartOptions,
              chartArea: {
                backgroundColor: '#fff',
              },
              plugins: {
                datalabels: false,
              },
            }}
          />
    )
}

export default TopVideosChart
