import React, { useState, createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import AWS from 'aws-sdk';
import { std } from 'mathjs';

import { accessKeyId, secretAccessKey, region } from '../config';

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
})

const s3 = new AWS.S3();

const UPDATE_COMBINED_DATA = 'UPDATE_COMBINED_DATA'
const UPDATE_COMBINED_CHART = 'UPDATE_COMBINED_CHART'
const UPDATE_SINGLE_POOL_DATA = 'UPDATE_SINGLE_POOL_DATA'
const UPDATE_SINGLE_POOL_CHART = 'UPDATE_SINGLE_POOL_CHART'
const UPDATE_POOL_NAMES = 'UPDATE_POOL_NAMES'
const UPDATE_POOL_PERCENTAGE = 'UPDATE_POOL_PERCENTAGE'

const GlobalDataContext = createContext()

function useGlobalDataContext() {
  return useContext(GlobalDataContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_COMBINED_DATA: {
      const { tradedDates,
        positiveDays,
        negativeDays,
        totalPnl,
        totalPnlOneDayBefore,
        dailySharpe,
        annualSharpe,
        bestDailyPnl,
        averagePnl,
        averageHeat,
        pnlHeat,
        worstHeat,
        daysFlat,
        pnlStdev,
        updatedDate } = payload
      return {
        ...state,
        combinedDetailsData: {
          tradedDates,
          positiveDays,
          negativeDays,
          totalPnl,
          totalPnlOneDayBefore,
          dailySharpe,
          annualSharpe,
          bestDailyPnl,
          averagePnl,
          averageHeat,
          pnlHeat,
          worstHeat,
          daysFlat,
          pnlStdev,
          updatedDate
        },
      }
    }

    case UPDATE_COMBINED_CHART: {
      const { date, data } = payload
      return {
        ...state,
        combinedChartData: {
          date,
          data
        },
      }
    }

    case UPDATE_SINGLE_POOL_DATA: {
      const { tradedDates,
        positiveDays,
        negativeDays,
        totalPnl,
        totalPnlOneDayBefore,
        dailySharpe,
        annualSharpe,
        bestDailyPnl,
        averagePnl,
        averageHeat,
        pnlHeat,
        worstHeat,
        daysFlat,
        pnlStdev,
        updatedDate } = payload
      return {
        ...state,
        singlePoolDetailsData: {
          tradedDates,
          positiveDays,
          negativeDays,
          totalPnl,
          totalPnlOneDayBefore,
          dailySharpe,
          annualSharpe,
          bestDailyPnl,
          averagePnl,
          averageHeat,
          pnlHeat,
          worstHeat,
          daysFlat,
          pnlStdev,
          updatedDate
        },
      }
    }

    case UPDATE_SINGLE_POOL_CHART: {
      const { date, data } = payload
      return {
        ...state,
        singlePoolChartData: {
          date,
          data
        },
      }
    }

    case UPDATE_POOL_NAMES: {
      const { names } = payload
      return {
        ...state,
        poolNames: names
      }
    }

    case UPDATE_POOL_PERCENTAGE: {
      const { data } = payload
      return {
        ...state,
        poolPercentage: data
      }
    }

    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {})

  const updateCombinedDetailsData = useCallback(({
    tradedDates,
    positiveDays,
    negativeDays,
    totalPnl,
    totalPnlOneDayBefore,
    dailySharpe,
    annualSharpe,
    bestDailyPnl,
    averagePnl,
    averageHeat,
    pnlHeat,
    worstHeat,
    daysFlat,
    pnlStdev,
    updatedDate,
  }) => {
    dispatch({
      type: UPDATE_COMBINED_DATA,
      payload: {
        tradedDates,
        positiveDays,
        negativeDays,
        totalPnl,
        totalPnlOneDayBefore,
        dailySharpe,
        annualSharpe,
        bestDailyPnl,
        averagePnl,
        averageHeat,
        pnlHeat,
        worstHeat,
        daysFlat,
        pnlStdev,
        updatedDate,
      },
    })
  }, [])

  const updateCombinedChartData = useCallback((date, data) => {
    dispatch({
      type: UPDATE_COMBINED_CHART,
      payload: {
        date,
        data
      },
    })
  }, [])

  const updateSinglePoolDetailsData = useCallback(({
    tradedDates,
    positiveDays,
    negativeDays,
    totalPnl,
    totalPnlOneDayBefore,
    dailySharpe,
    annualSharpe,
    bestDailyPnl,
    averagePnl,
    averageHeat,
    pnlHeat,
    worstHeat,
    daysFlat,
    pnlStdev,
    updatedDate,
  }) => {
    dispatch({
      type: UPDATE_SINGLE_POOL_DATA,
      payload: {
        tradedDates,
        positiveDays,
        negativeDays,
        totalPnl,
        totalPnlOneDayBefore,
        dailySharpe,
        annualSharpe,
        bestDailyPnl,
        averagePnl,
        averageHeat,
        pnlHeat,
        worstHeat,
        daysFlat,
        pnlStdev,
        updatedDate,
      },
    })
  }, [])

  const updateSinglePoolChartData = useCallback((date, data) => {
    dispatch({
      type: UPDATE_SINGLE_POOL_CHART,
      payload: {
        date,
        data
      },
    })
  }, [])

  const updatePoolNames = useCallback((names) => {
    dispatch({
      type: UPDATE_POOL_NAMES,
      payload: { names },
    })
  }, [])

  const updatePoolPercentage = useCallback((data) => {
    dispatch({
      type: UPDATE_POOL_PERCENTAGE,
      payload: { data },
    })
  }, [])


  return (
    <GlobalDataContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateCombinedDetailsData,
            updateCombinedChartData,
            updateSinglePoolDetailsData,
            updateSinglePoolChartData,
            updatePoolNames,
            updatePoolPercentage
          },
        ],
        [
          state,
          updateCombinedDetailsData,
          updateCombinedChartData,
          updateSinglePoolDetailsData,
          updateSinglePoolChartData,
          updatePoolNames,
          updatePoolPercentage
        ]
      )}
    >
      {children}
    </GlobalDataContext.Provider>
  )
}

const getGlobalData = async (poolKey) => {

  if (!poolKey) return

  // pnl data index
  const DAILY_PNL = 0
  const HEAT = 1
  const CUMULATIVE = 2

  let detailsData = []
  let chartDates = []
  let combinedChartData = []
  let poolDailyPnlChartData = []
  let poolHeatChartData = []
  let poolCumulativeChartData = []
  let poolNames = []
  let poolPercentages = []

  const prefixes = await getPrefixes()

  let prefixJsons = [];
  if (poolKey === 'all') {
    await Promise.all(prefixes.map(async (prefix, index) => {
      const prefixJson = await getPrefixJson(prefix)

      if (prefixJson && prefixJson !== 'American_Magpie/American_Magpie_eod_profile.json') {
        prefixJsons = [...prefixJsons, {
          bucket: 'spread-viz-bucket',
          delimiter: '/',
          key: prefix,
          prefix: prefix.replace(/[_/]/g, ' '),
          json: prefixJson
        }]

        poolNames.push({
          key: prefix,
          value: prefix.replace(/[_/]/g, ' ')
        })
      }
    }))
  } else {
    const prefixJson = await getPrefixJson(poolKey)

    if (prefixJson)
      prefixJsons = [{
        bucket: 'spread-viz-bucket',
        delimiter: '/',
        key: poolKey,
        prefix: poolKey.replace(/[_/]/g, ''),
        json: prefixJson
      }]
  }

  if (!prefixJsons.length) return

  let allPoolData = [];
  let mergedPoolDates = [];
  let cumulativePnls = []
  await Promise.all(prefixJsons.map(async (prefixData, index) => {
    let s3Data = await getS3Data(prefixData.json);
    if (s3Data) {
      const textDecoder = new TextDecoder('utf-8');
      const decodedRes = await textDecoder.decode(s3Data.Body)
      const allPnlData = JSON.parse(decodedRes)
      // console.log('allPnlData', index, allPnlData)
      allPoolData.push(allPnlData)

      // ignore first date's data cuz it's init value [0, 0, 0]
      for (let j = 1; j < allPnlData.index.length; j++) {
        if (mergedPoolDates.findIndex(date => date === allPnlData.index[j]) < 0) {
          mergedPoolDates = [...mergedPoolDates, allPnlData.index[j]]
        }
      }
      for (let k = 1; k < allPnlData.data.length; k++) {
        cumulativePnls = [...cumulativePnls, allPnlData.data[k][2]];
      }
      poolPercentages.push({
        key: prefixData.key,
        data: cumulativePnls
      })
    }
  }))

  chartDates = mergedPoolDates.sort(function (a, b) { return a - b })
  detailsData['tradedDates'] = chartDates.length

  for (let i = 0; i < chartDates.length; i++) {
    let combinedCumulative = 0;
    allPoolData.map((poolData) => {
      poolData.index.findIndex((date, idx) => {
        if (date === chartDates[i])
          combinedCumulative += poolData.data[idx][CUMULATIVE]
      })
    })
    combinedChartData.push(combinedCumulative)
  }

  let totalPnl = 0
  let totalPnlOneDayBefore = 0
  allPoolData.map((poolData) => {
    totalPnl += poolData.data[poolData.data.length - 1][CUMULATIVE]
    totalPnlOneDayBefore += poolData.data[poolData.data.length - 2][CUMULATIVE]
  })

  let dailyPnls = [];
  let heats = [];
  let bestDailyPnl = 0
  let totalHeat = 0
  let worstHeat = 0
  let totalDays = chartDates.length
  let positiveDays = 0
  let negativeDays = 0
  let flatDays = 0
  await Promise.all(chartDates.map((chartDate) => {
    let heat = 0
    let dailyPnl = 0
    let cumulativePnl = 0
    allPoolData.map((poolData) => {
      poolData.index.map((date, index) => {
        if (date === chartDate) {
          heat += poolData.data[index][HEAT]
          dailyPnl += poolData.data[index][DAILY_PNL]
          cumulativePnl += poolData.data[index][CUMULATIVE]
        }
      })
    })
    dailyPnls.push(dailyPnl)
    heats.push(heat)

    totalHeat += heat
    if (heat < worstHeat) worstHeat = heat
    if (dailyPnl > bestDailyPnl) bestDailyPnl = dailyPnl
    if (dailyPnl > 0) ++positiveDays
    else if (dailyPnl === 0) ++flatDays
    else if (dailyPnl < 0) ++negativeDays
  }))

  // return daily pnl, heat, cumulative data for a given pool
  // it don't need for all combined data
  poolDailyPnlChartData = dailyPnls
  poolHeatChartData = heats
  poolCumulativeChartData = cumulativePnls

  // await Promise.all(chartDates.map((date) => (
  //   allPoolData.map((poolData, index) => {
  //     totalPnl += poolData.data[poolData.data.length - 1][CUMULATIVE]
  //     totalPnlOneDayBefore += poolData.data[poolData.data.length - 2][CUMULATIVE]

  //     let heats = 0
  //     let dailyPnls = 0
  //     poolData.data.map(data => {
  //       console.log('data[HEAT]', data[HEAT])
  //       heats += data[HEAT]
  //       dailyPnls += data[DAILY_PNL]
  //     })
  //     console.log('heats', heats)

  //     totalHeat += heats
  //     if (heats < worstHeat) worstHeat = heats
  //     if (dailyPnls > bestDailyPnl) bestDailyPnl = dailyPnls
  //     if (dailyPnls > 0) ++positiveDays
  //     else if (dailyPnls === 0) ++flatDays
  //     else if (dailyPnls < 0) ++negativeDays
  //   })
  // )))

  // console.log('allPoolData', allPoolData)

  detailsData['totalPnl'] = totalPnl
  detailsData['totalPnlOneDayBefore'] = totalPnlOneDayBefore
  detailsData['averagePnl'] = totalPnl / totalDays
  detailsData['bestDailyPnl'] = bestDailyPnl
  detailsData['pnlStdev'] = std(dailyPnls.map(row => row))

  detailsData['positiveDays'] = positiveDays / totalDays * 100
  detailsData['daysFlat'] = flatDays / totalDays * 100
  detailsData['negativeDays'] = negativeDays / totalDays * 100

  detailsData['averageHeat'] = totalHeat / totalDays
  detailsData['worstHeat'] = worstHeat

  detailsData['dailySharpe'] = detailsData['averagePnl'] / detailsData['pnlStdev']
  detailsData['annualSharpe'] = detailsData['dailySharpe'] * (365 ** 0.5);
  detailsData['pnlHeat'] = detailsData['averagePnl'] / Math.abs(detailsData['averageHeat'])
  detailsData['updatedDate'] = new Date(chartDates[chartDates.length - 1]).toDateString()

  return {
    chartDates,
    combinedChartData,
    detailsData,
    poolNames,
    poolDailyPnlChartData,
    poolHeatChartData,
    poolCumulativeChartData,
    poolPercentages
  }
}

const getPrefixes = async () => {
  return await new Promise((resolve, reject) => {
    try {
      s3.listObjects({
        Bucket: 'spread-viz-bucket',
        Delimiter: '/',
        Prefix: ''
      }, function (err, data) {
        if (err) throw err;
        const result = data?.CommonPrefixes.map((item) => {
          return item?.Prefix
        })
        resolve(result)
      })
    } catch (err) {
      reject(`error in getPrefixes`, err);
    }
  });
}

const getPrefixJson = async (prefix) => {
  if (!prefix) return
  return await new Promise((resolve, reject) => {
    try {
      s3.listObjects({
        Bucket: 'spread-viz-bucket',
        Delimiter: '/',
        Prefix: prefix
      }, function (err, data) {
        if (err) throw err;
        resolve(data?.Contents[1]?.Key);
      });
    } catch (error) {
      reject(`error in getPrefixJson`, error);
    }
  });
}

const getS3Data = async (key) => {
  if (!key) return
  return new Promise((resolve, reject) => {
    try {
      s3.getObject({
        Bucket: 'spread-viz-bucket',
        Key: key
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    } catch (error) {
      reject('error in getS3Data', error)
    }
  })
}

export function useCombinedDetailsData() {
  const [state, { updateCombinedDetailsData }] = useGlobalDataContext()

  const data = state?.combinedDetailsData

  useEffect(() => {
    const init = async () => {
      const { detailsData } = await getGlobalData('all')

      detailsData && updateCombinedDetailsData(detailsData)
    }

    !data && init()
  }, [data, updateCombinedDetailsData])

  return data || {}
}

export function useCombinedChartData() {
  const [state, { updateCombinedChartData }] = useGlobalDataContext()

  const data = state?.combinedChartData

  useEffect(() => {
    const init = async () => {
      const { chartDates, combinedChartData } = await getGlobalData('all')

      chartDates && combinedChartData && updateCombinedChartData(chartDates, combinedChartData)
    }

    !data && init()
  }, [data, updateCombinedChartData])

  return data || {}
}

export function useSinglePoolDetailsData() {
  const [state, { updateSinglePoolDetailsData }] = useGlobalDataContext()
  const [poolKey, setPoolKey] = useState()

  const data = state?.singlePoolDetailsData

  useEffect(() => {
    state?.poolNames && setPoolKey(state.poolNames[0].key)
  }, [state.poolNames, setPoolKey])

  useEffect(() => {
    const init = async () => {
      const { detailsData } = await getGlobalData(poolKey)

      detailsData && updateSinglePoolDetailsData(detailsData)
    }

    if (poolKey) init()
  }, [poolKey, updateSinglePoolDetailsData])

  return data || {}
}

export function useSinglePoolData() {
  const [state, { updateSinglePoolDetailsData, updateSinglePoolChartData }] = useGlobalDataContext()
  const [poolKey, setPoolKey] = useState()

  const chartData = state?.singlePoolChartData
  const detailsData = state?.singlePoolDetailsData

  useEffect(() => {
    state?.poolNames && setPoolKey(state.poolNames[0].key)
  }, [state.poolNames])

  useEffect(() => {
    const init = async () => {
      const { detailsData, chartDates, poolDailyPnlChartData, poolHeatChartData, poolCumulativeChartData } = await getGlobalData(poolKey)
      const chartData = {
        poolDailyPnlChartData, poolHeatChartData, poolCumulativeChartData
      }

      chartDates && chartData && updateSinglePoolChartData(chartDates, chartData)
      detailsData && updateSinglePoolDetailsData(detailsData)
    }

    if (poolKey) init()
  }, [poolKey, updateSinglePoolChartData, updateSinglePoolDetailsData])

  const updatePoolKey = ({ poolValue }) => {
    const poolNames = state?.poolNames
    const filteredName = poolNames.filter((poolName) => (poolName.value === poolValue))
    setPoolKey(filteredName[0].key)
  }

  return { chartData, detailsData, updatePoolKey }
}

export function usePoolNames() {
  const [state, { updatePoolNames }] = useGlobalDataContext()

  const data = state?.poolNames

  useEffect(() => {
    const init = async () => {
      const { poolNames } = await getGlobalData('all')

      poolNames && updatePoolNames(poolNames)
    }

    !data && init()
  }, [data, updatePoolNames])

  return data || {}
}

export function usePoolPercentages() {
  const [state, { updatePoolPercentage }] = useGlobalDataContext()

  const data = state?.poolPercentage

  useEffect(() => {
    const init = async () => {
      const { poolPercentages } = await getGlobalData('all')

      poolPercentages && updatePoolPercentage(poolPercentages)
    }

    !data && init()
  }, [data, updatePoolPercentage])

  return data || {}
}