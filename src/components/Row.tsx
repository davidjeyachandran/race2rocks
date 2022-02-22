import React from 'react'

interface PropTypes {
  data: {
    Name: string;
    Time: string;
    Category: string;
    Year: number
  }
}

function Row({ data }: PropTypes) {
  return (
    <tr>
      <td>{data.Name}</td>
      <td>{data.Time}</td>
      <td>{data.Category}</td>
      <td>{data.Year}</td>
    </tr>
  )
}

export default Row
