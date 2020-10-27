import React from 'react'

const Grid = ({ height, width }) => {
  const renderCols = (_, index) => (
    <line
      className='grid-line'
      key={index}
      x1={`${(index + 1) / width * 100}%`}
      y1="0%"
      x2={`${(index + 1) / width * 100}%`}
      y2="100%" />
  )

  const renderRows = (_, index) => (
    <line
      className='grid-line'
      key={index}
      x1="0%"
      y1={`${(index + 1) / height * 100}%`}
      x2="100%"
      y2={`${(index + 1) / height * 100}%`} />
  )

  return (
    <svg className='grid'>
      <g>{Array.from({length: width - 1}, renderCols)}</g>
      <g>{Array.from({length: height - 1}, renderRows)}</g>
    </svg>
  )
}

export default Grid
