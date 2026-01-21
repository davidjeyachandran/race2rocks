import { Chart as ChartJS, CategoryScale, LinearScale, Legend, PointElement, LineElement } from "chart.js";
import { Line } from 'react-chartjs-2'
import { pluck, getSeconds } from '../utilities'
import { sortByYear } from '../sort'

ChartJS.register(CategoryScale, Legend, LinearScale, PointElement, LineElement);

interface ChartLineProps {
  filteredData: RunDataType[]
}

function ChartLine({ filteredData }: ChartLineProps) {

  const sortedByYear = [...filteredData].sort(sortByYear)
  const times = sortedByYear.map(item => {
    let time = getSeconds(item.time) / 60
    return Math.round(time * 1000) / 1000
  })


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Time (minutes) by year',
      },
    },
  };

  const data = {
    labels: pluck(sortedByYear, 'year'),
    datasets: [
      {
        label: filteredData[0]?.name,
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
        options={options}
        width={100}
        height={50}
      />
    </>
  )
}

export default ChartLine
