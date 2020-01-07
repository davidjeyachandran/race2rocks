import React from 'react'

function Row({ data }) {
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
