import React from 'react'
import dayjs from 'dayjs'

export const getImg = (src) => {
  return require(`../assets/${src}`)
}

export const formatFullDate = (date) => {
  if (date) {
    const seperatedDate = date.split(' ')
    const formatedDate = seperatedDate[1] + ' ' + seperatedDate[2] + ', \'' + seperatedDate[3].slice(-2)
    return formatedDate
  }
}