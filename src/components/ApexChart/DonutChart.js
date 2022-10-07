import { config } from 'process';
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const DonutChart = ({ poolNames, poolPercentData }) => {

  let totalVal = 0
  let percentValues = []
  let poolLabels = []

  percentValues = poolPercentData.map((percent) => {
    const value = percent.data[percent.data.length - 1]
    totalVal += value
    return value
  })

  // poolLabels = poolNames?.map(name => name.value)

  for (var i = 0; i < poolNames.length; i++) {
    const percent = percentValues[i] / totalVal * 100
    const name = poolNames[i].value
    const poolLabel = `<div style="display: flex; align-items: center;">
      <div style="font-size: 14px; font-weight: 400; color: #4E5969; width: 150px;">${name}</div>
      <div style="display: flex; align-items: baseline;">
        <div style="font-size: 20px; font-weight: 500; color: #1D2129">${percent.toFixed(2)}</div>
        <div style="font-size: 14px; font-weight: 400; color: #86909C;"> %</div>
      </div>
    </div>`
    poolLabels.push(poolLabel)
  }

  const data = {
    series: [...percentValues],
    options: {
      chart: {
        type: 'donut',
        toolbar: {
          autoSelected: 'pan',
          show: false
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return ''
          },
          title: {
            formatter: function (seriesName) {
              return seriesName
            }
          }
        }
      },
      labels: [...poolLabels],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      legend: {
        show: true,
        position: 'right',
        verticalAlign: 'center',
        markers: {
          width: 4,
          height: 28,
          radius: 100,
          offsetX: -10,
          offsetY: 36
        },
        onItemClick: {
          toggleDataSeries: false
        },
      },
      plotOptions: {
        pie: {
          customScale: 0.85,
          verticalAlign: 'center',
          donut: {
            size: '80%',
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                color: '#4E5969',
                label: 'Total Value',
                fontSize: '18px',
                fontWeight: 500,
                formatter: function (chart) {
                  let totalVal = chart.config.series.reduce((a, b) => a + b, 0)
                  return '$' + totalVal.toFixed(2)
                }
              },
              value: {
                show: true,
                color: '#1D2129',
                fontSize: '40px',
                fontWeight: 600,
                offsetY: 10,
                formatter: function (val) {
                  return Number(val).toFixed(2)
                }
              }
            },
          },
        }
      },
    },
  };

  return (
    <Chart
      options={data.options}
      series={data.series}
      height="350"
      type="donut"
    />
  )
}

export default DonutChart