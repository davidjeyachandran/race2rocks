import React from 'react'
import Row from './Row'

interface PropTypes {
  data: {
    Name: string;
    Time: string;
    Category: string;
    Year: number
  }[]
}

function Results({ data }: PropTypes) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Category</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item =>
            <Row key={item.Name + item.Time + item.Year} data={item} />
          )}
        </tbody>
      </table>


    </div>
  )
}

export default Results

