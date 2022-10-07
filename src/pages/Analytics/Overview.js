import React, { useState } from 'react'
import styled from 'styled-components'

import { useCombinedDetailsData, useCombinedChartData } from '../../contexts/GlobalData'
import Box from '../../components/Box'
import { AutoRow, RowUp, RowEnd, RowBetween } from '../../components/Row'
import { Text } from '../../Theme'
import { AutoColumn } from '../../components/Column'
import { OptionButton } from '../../components/Button'
import { OverviewDetailBox } from '../../components/Box'
import { AreaChart } from '../../components/ApexChart'
import { formatFullDate } from '../../utils'

const Wrapper = styled(Box)`
  padding: 40px;
`

const ChartWrapper = styled.div`
  min-height: 280px;
  margin-top: -20px;
`

const Text1 = styled(Text)`
  font-weight: 700;
  font-size: 42px;
  line-height: 58.8px;
`

const Text2 = styled(Text)`
  font-weight: 700;
  font-size: 22px;
  line-height: 31.9px;
`

const Text3 = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 25.2px;
`

const Text4 = styled(Text)`
  font-weight: 400;
  font-size: 18px;
  line-height: 25.2px;
`

const Text5 = styled(Text)`
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
`

const Text6 = styled(Text)`
  font-size: 32px;
  font-weight: 700;
  line-height: 45px;
`

const Overview = () => {

  const detailsData = useCombinedDetailsData()
  const combinedChartData = useCombinedChartData()
  const [resolution, setResolution] = useState('all')

  return (
    <Wrapper>
      <AutoColumn gap="40px">
        <RowUp>
          <Text2 color="textDark">Value Over Time</Text2>
          <AutoColumn gap="8px">
            <RowEnd>
              <Text1 color="textDarker">${detailsData.totalPnl?.toFixed(2)}</Text1>
            </RowEnd>
            <AutoRow gap="16px">
              <Text3 color="green">+ 2.28 %</Text3>
              <Text4 color="textDark">{formatFullDate(detailsData.updatedDate)}</Text4>
            </AutoRow>
          </AutoColumn>
        </RowUp>
        <ChartWrapper>
          {Object.keys(combinedChartData).length > 0 &&
            <AreaChart
              combinedChartData={combinedChartData}
              resolution={resolution}
              type='overview'
            />}
        </ChartWrapper>
        <RowEnd>
          <AutoRow gap="21px">
            <OptionButton active={resolution === '1w' && 'active'} onClick={() => setResolution('1w')}>1 w</OptionButton>
            <OptionButton active={resolution === '1mo' && 'active'} onClick={() => setResolution('1mo')}>1 mo</OptionButton>
            <OptionButton active={resolution === '3mo' && 'active'} onClick={() => setResolution('3mo')}>3 mo</OptionButton>
            <OptionButton active={resolution === '1yr' && 'active'} onClick={() => setResolution('1yr')}>1 yr</OptionButton>
            <OptionButton active={resolution === 'all' && 'active'} onClick={() => setResolution('all')}>All time</OptionButton>
          </AutoRow>
        </RowEnd>
        <AutoRow gap="12px 24px" wrap="wrap">
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Days Traded</Text5>
              <Text6>{detailsData.tradedDates}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>% Days Positive</Text5>
              <Text6>{detailsData.positiveDays?.toFixed(2)}%</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>% Days Negative</Text5>
              <Text6>{detailsData.negativeDays?.toFixed(2)}%</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>% Days Flat</Text5>
              <Text6>{detailsData.daysFlat?.toFixed(2)}%</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Total Pnl</Text5>
              <Text6>${detailsData.totalPnl?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Daily PnL Stdev</Text5>
              <Text6>${detailsData.pnlStdev?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Daily Sharpe</Text5>
              <Text6>{detailsData.dailySharpe?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Annualized Sharpe</Text5>
              <Text6>{detailsData.annualSharpe?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Best Daily Pnl</Text5>
              <Text6>${detailsData.bestDailyPnl?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Average Pnl</Text5>
              <Text6>${detailsData.averagePnl?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Average Heat</Text5>
              <Text6>{detailsData.averageHeat?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Pnl/Heat</Text5>
              <Text6>{detailsData.pnlHeat?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
          <OverviewDetailBox>
            <RowBetween>
              <Text5>Worst Heat</Text5>
              <Text6>{detailsData.worstHeat?.toFixed(2)}</Text6>
            </RowBetween>
          </OverviewDetailBox>
        </AutoRow>
      </AutoColumn>
    </Wrapper>
  )
}

export default Overview
