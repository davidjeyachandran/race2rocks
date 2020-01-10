import React from 'react'
import { Line } from 'react-chartjs-2'
import { pluck, getSeconds } from '../utilities'
import { sortByYear } from '../sort'

function ChartLine({ filteredData }) {

  let times = filteredData.sort(sortByYear).map(item => {
    let time = getSeconds(item.Time) / 60
    return Math.round(time * 1000) / 1000
  })

  const data = {
    labels: pluck(filteredData, 'Year'),
    datasets: [
      {
        label: filteredData[0].Name,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: times
      }
    ]
  };

  return (
    <>
      <Line
        data={data}
        width={100}
        height={50}
      />
    </>
  )
}

export default ChartLine
