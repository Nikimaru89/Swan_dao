import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs'

const AreaChart = ({ combinedChartData, resolution, type, xAxis, setXAxis }) => {
  const [chartDate, setChartDate] = useState()
  const [chartData, setChartData] = useState()

  let tickAmount = combinedChartData?.data.length > 5 ? 5 : combinedChartData?.data.length - 1
  let name = ''
  switch (type) {
    case 'overview':
      name = 'Value Over Time'
      break;

    case 'cumulative':
      name = 'Cumulative Pnl'
      break;
  }

  useEffect(() => {
    const init = () => {
      var standardDate = new Date()

      switch (resolution) {
        case '1mo':
          standardDate.setMonth(standardDate.getMonth() - 1);
          break;

        case '3mo':
          standardDate.setMonth(standardDate.getMonth() - 3);
          break;

        case '1yr':
          standardDate.setFullYear(standardDate.getFullYear() - 1);
          break;

        case 'all':
          standardDate.setFullYear(standardDate.getFullYear() - 100);
          break;

        default:
          standardDate.setDate(standardDate.getDate() - 7);
          break;
      }

      const filteredDates = combinedChartData.date.filter((date) => (date >= standardDate.getTime()))
      let filteredChartData = []
      let startDate = combinedChartData.date.length - filteredDates.length
      startDate = startDate > 0 ? startDate : 0
      for (let i = startDate; i < combinedChartData.date.length; i++) {
        filteredChartData.push(combinedChartData.data[i])
      }
      setChartDate(filteredDates)
      setChartData(filteredChartData)
    }

    Object.keys(combinedChartData).length && init()
  }, [combinedChartData, resolution])

  const data = {
    series: [
      {
        name: name,
        type: 'area',
        data: chartData
      }
    ],
    options: {
      colors: [
        '#0d6efd',
      ],
      chart: {
        height: 400,
        type: 'area',
        id: type,
        offsetY: 20,
        sparkline: {
          enabled: false,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 15,
          tools: {
            download: true,
            selection: true,
            zoom: true,
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
            type === 'cumulative' && setXAxis({ min: xaxis.min, max: xaxis.max })
            return {
              xaxis
            }
          }
        },
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
        },
      },
      stroke: {
        width: [2, 2, 2, 2, 2, 4],
        colors: ['#ffffff'],
        curve: 'smooth'
      },
      annotations: {
        position: 'front',
        yaxis: [{
          y: 0,
          y2: null,
          strokeDashArray: 1,
          borderColor: '#c2c2c2',
          fillColor: '#c2c2c2',
          opacity: 0.3,
          offsetX: 0,
          offsetY: -3,
          width: '100%',
          yAxisIndex: 0,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: undefined,
            textAnchor: 'end',
            position: 'right',
            offsetX: 0,
            offsetY: 0,
            mouseEnter: undefined,
            mouseLeave: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-yaxis-annotation-label',
              padding: {
                left: 5,
                right: 5,
                top: 0,
                bottom: 2,
              }
            },
          },
        }],
        xaxis: [{
          x: 0,
          x2: null,
          strokeDashArray: 1,
          borderColor: '#c2c2c2',
          fillColor: '#c2c2c2',
          opacity: 0.3,
          offsetX: 0,
          offsetY: 0,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: undefined,
            position: 'top',
            orientation: 'vertical',
            offsetX: 0,
            offsetY: 0,
            mouseEnter: undefined,
            mouseLeave: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-xaxis-annotation-label',
            },
          },
        }],
        points: [{
          x: 0,
          y: null,
          yAxisIndex: 0,
          seriesIndex: 0,
          mouseEnter: undefined,
          mouseLeave: undefined,
          label: {
            borderColor: '#c2c2c2',
            borderWidth: 1,
            borderRadius: 2,
            text: undefined,
            textAnchor: 'middle',
            offsetX: 0,
            offsetY: -15,
            mouseEnter: undefined,
            mouseLeave: undefined,
            style: {
              background: '#fff',
              color: '#777',
              fontSize: '12px',
              fontWeight: 400,
              fontFamily: undefined,
              cssClass: 'apexcharts-point-annotation-label',
              padding: {
                left: 5,
                right: 5,
                top: 0,
                bottom: 2,
              }
            },
          },
          image: {
            path: undefined,
            width: 20,
            height: 20,
            offsetX: 0,
            offsetY: 0,
          }
        }],

        texts: [{
          x: 0,
          y: 0,
          text: '',
          textAnchor: 'start',
          foreColor: undefined,
          fontSize: '13px',
          fontFamily: undefined,
          fontWeight: 400,
          appendTo: '.apexcharts-annotations',
          backgroundColor: 'transparent',
          borderColor: '#c2c2c2',
          borderRadius: 0,
          borderWidth: 0,
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 2,
          paddingBottom: 2,
        }],
        images: [{
          path: '',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          appendTo: '.apexcharts-annotations'
        }],
      },
      responsive: [

      ],
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        onItemHover: {
          highlightDataSeries: false
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      grid: {
        strokeDashArray: 5,
      },
      yaxis: {
        forceNiceScale: true,
        labels: {
          formatter: function (y) {
            return y.toFixed(0);
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: chartDate,
        tickAmount: tickAmount,
        min: xAxis?.min,
        max: xAxis?.max,
        labels: {
          rotate: 0,
          style: {
            whiteSpace: 'normal',
            fontSize: `12px`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom-area',
          },
          formatter: function (val, timestamp) {
            // if (tickAmount < 5) return dayjs(new Date(timestamp)).format("HH:mm DD MMM")
            return dayjs(new Date(timestamp)).format("DD MMM")
          }
        },
      },
    },
  };

  return (
    <>
      {chartData && <Chart
        options={data.options}
        series={data.series}
        type="area"
        width="100%"
        height={type === 'overview' ? "290px" : "227px"}
      />}
      {!chartData && <>Loading</>}
    </>
  )
}

export default AreaChart