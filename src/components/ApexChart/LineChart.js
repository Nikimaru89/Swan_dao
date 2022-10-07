import React from 'react';
import ReactApexChart from "react-apexcharts";


const LineChart = ({ chartData, chartDates, type, xAxis, setXAxis }) => {

  const chartOption = {
    series: [{
      name: 'Cumulative Pnl',
      data: chartData
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        }
      }
    },


    series: [
      {
        name: "Cumulative Pnl",
        type: 'line',
        data: chartData
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
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
        labels: {
          rotate: 0,
          rotateAlways: true,
          style: {
            fontSize: `12px`,
            textTransform: `rotate(45deg)`,
            fontWeight: 700,
            cssClass: 'apexcharts-xaxis-custom',
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
        height={type === "value" ? 300 : 350}
      />
    </>
  )
}

export default LineChart