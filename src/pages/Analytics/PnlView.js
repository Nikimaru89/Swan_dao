import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { usePoolNames, useSinglePoolData } from '../../contexts/GlobalData'
import Box, { PnlDetailBox } from '../../components/Box'
import { AutoRow, RowBetween } from '../../components/Row'
import { Text } from '../../Theme'
import { AutoColumn } from '../../components/Column'
import { BarChart, AreaChart } from '../../components/ApexChart'
import DropdownSelect from '../../components/DropdownSelect'

const Wrapper = styled(Box)`
  padding: 24px 24px 28px;
`

const TextWrapper = styled.div`
  margin: 0 16px;
`

const GraphWrapper = styled.div`
  margin: 0 16px;
  min-height: 150px;
`

const Text1 = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
`

const Text2 = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
`

const Text3 = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
`

const PnlView = () => {

  const poolNames = usePoolNames()
  const { chartData, detailsData, updatePoolKey } = useSinglePoolData()
  const [activeOption, setActiveOption] = useState('')
  const [options, setOptions] = useState()
  const [xAxis, setXAxis] = useState({ min: 0, max: 0 })

  useEffect(() => {
    chartData && Object.keys(chartData).length > 0 &&
      setXAxis({ min: chartData.date[0], max: chartData.date[chartData.date.length - 1] })
  }, [chartData])

  useEffect(() => {
    const init = () => {
      let options = poolNames && poolNames?.map((poolName) => (
        poolName.value
      ))
      setOptions(options)
      setActiveOption(options[0])
    }
    poolNames && Object.keys(poolNames).length > 0 && init()
  }, [poolNames])

  useEffect(() => {
    activeOption && updatePoolKey({ poolValue: activeOption })
  }, [activeOption, updatePoolKey])

  return (
    <>
      <Wrapper>
        <AutoColumn gap="0">
          <TextWrapper>
            <RowBetween>
              <Text1>Cumulative Pnl</Text1>
              {options && <DropdownSelect
                options={options}
                active={activeOption}
                setActive={setActiveOption}
              />}
            </RowBetween>
          </TextWrapper>
          <GraphWrapper>
            {chartData && Object.keys(chartData).length > 0 &&
              <AreaChart
                combinedChartData={{ date: chartData.date, data: chartData.data?.poolCumulativeChartData }}
                resolution="all"
                type="cumulative"
                xAxis={xAxis}
                setXAxis={setXAxis}
              />}
          </GraphWrapper>
          <TextWrapper style={{ marginTop: 23 }}><Text1>Daily Pnl</Text1></TextWrapper>
          <GraphWrapper>
            {chartData && Object.keys(chartData).length > 0 &&
              <BarChart
                chartData={chartData.data?.poolDailyPnlChartData}
                chartDates={chartData.date} type="dailyPnl"
                xAxis={xAxis}
                setXAxis={setXAxis}
              />}
          </GraphWrapper>
          <TextWrapper><Text1>Heat</Text1></TextWrapper>
          <GraphWrapper>
            {chartData && Object.keys(chartData).length > 0 &&
              <BarChart
                chartData={chartData.data?.poolHeatChartData}
                chartDates={chartData.date} type="heat"
                xAxis={xAxis}
                setXAxis={setXAxis}
              />}
          </GraphWrapper>
          <AutoRow gap="8px" wrap="wrap">
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>Days Traded</Text2>
                <Text3>{detailsData?.tradedDates}</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>% Days Positive</Text2>
                <Text3>{detailsData?.positiveDays?.toFixed(2)}%</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>% Days Flat</Text2>
                <Text3>{detailsData?.daysFlat?.toFixed(2)}%</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>% Days Negative</Text2>
                <Text3>{detailsData?.negativeDays?.toFixed(2)}%</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>Total PnL</Text2>
                <Text3>${detailsData?.totalPnl?.toFixed(2)}</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>Daily Sharpe</Text2>
                <Text3>{detailsData?.dailySharpe?.toFixed(2)}</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>Annualized Sharpe</Text2>
                <Text3>{detailsData?.annualSharpe?.toFixed(2)}</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>Daily PnL Stdev</Text2>
                <Text3>{detailsData?.pnlStdev?.toFixed(2)}</Text3>
              </AutoColumn>
            </PnlDetailBox>
            <PnlDetailBox>
              <AutoColumn gap="8px">
                <Text2>Best Daily PnL</Text2>
                <Text3>${detailsData?.bestDailyPnl?.toFixed(2)}</Text3>
              </AutoColumn>
            </PnlDetailBox>
          </AutoRow>
        </AutoColumn>
      </Wrapper>
    </>
  )
}

export default PnlView
