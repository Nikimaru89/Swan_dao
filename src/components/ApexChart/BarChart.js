import React from 'react';
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';

const BarChart = ({ chartData, chartDates, type, xAxis, setXAxis }) => {

  let tickAmount = chartData?.length > 5 ? 5 : chartData?.length - 1
  let name = ''
  let color = ''
  let height = 0
  switch (type) {

    case 'dailyPnl':
      name = 'Daily Pnl'
      color = '#00AAEB'
      height = 142
      break;

    case 'heat':
      name = 'Heat'
      color = '#DA1414'
      height = 156
      break;

    default:
      break;
  }

  const chartOption = {
    series: [
      {
        name: name,
        type: 'bar',
        data: chartData
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        id: name,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(time) {
                return new Date(time).toDateString()
              }
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            }
          },
          autoSelected: 'zoom'
        },
        events: {
          beforeZoom: (chartContext, { xaxis }) => {
            setXAxis({ min: xaxis.min, max: xaxis.max })
            return {
              xaxis
            }
          }
        },
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          autoScaleXaxis: true
        },
      },
      colors: [color],
      stroke: {
        width: 3,
        curve: 'straight',
        colors: 'transparent'
      },

      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: chartDates,
        min: xAxis?.min,
        max: xAxis?.max,
        tickAmount: tickAmount,
        labels: {
          rotate: 0,
          style: {
            fontSize: `12px`,
            textTransform: `rotate(45deg)`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom',
          },
          formatter: function (val, timestamp) {
            // if (tickAmount < 5) return dayjs(new Date(timestamp)).format("HH:mm DD MMM")
            return dayjs(new Date(timestamp)).format("DD MMM")
          }
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        markers: {
          width: 8,
          height: 8,
          radius: 24
        },
        onItemHover: {
          highlightDataSeries: false
        },
      },
      fill: {
        type: 'solid',
      },

    },
  }

  return (
    <>
      <ReactApexChart
        options={chartOption.options}
        series={chartOption.series}
        type="bar"
        width="100%"
        height={height}
      />
    </>
  )
}

export default BarChart