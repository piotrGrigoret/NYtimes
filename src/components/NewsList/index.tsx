import React from 'react'
import { Card } from '../Card'

export const NewsList = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Card/>
        <Card/>
        <Card/>
    </div>
  )
}
