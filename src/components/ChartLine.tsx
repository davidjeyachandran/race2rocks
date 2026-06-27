import { Chart as ChartJS, CategoryScale, LinearScale, Legend, PointElement, LineElement, Tooltip, TooltipItem } from "chart.js";
import { Line } from 'react-chartjs-2'
import { pluck, getSeconds } from '../utilities'
import { sortByYear } from '../sort'

ChartJS.register(CategoryScale, Legend, LinearScale, PointElement, LineElement, Tooltip);

const CORAL = '#d8572a'

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
        display: false,
      },
      title: {
        display: true,
        text: 'Finish time (minutes) by year · lower is faster',
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) => `${(ctx.parsed.y ?? 0).toFixed(1)} min`,
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: 'Minutes' },
      },
    },
  };

  const data = {
    labels: pluck(sortedByYear, 'year'),
    datasets: [
      {
        label: filteredData[0]?.name,
        backgroundColor: 'rgba(216, 87, 42, 0.2)',
        borderColor: CORAL,
        borderWidth: 2,
        pointBackgroundColor: CORAL,
        pointRadius: 4,
        tension: 0.25,
        hoverBackgroundColor: 'rgba(216, 87, 42, 0.4)',
        hoverBorderColor: CORAL,
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
