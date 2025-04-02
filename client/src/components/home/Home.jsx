import React, { useState } from 'react'
import Hero from './Hero'
import PriceTrends from '../priceTrends/PriceTrends'
import OurServices from './OurServices'

export default function Home() {
  const [priceData, setPriceData] = useState([])
  console.log(priceData)
  return (
    <div className='bg-secondary '>
      <Hero setPriceData={setPriceData}/>
      <PriceTrends priceData={priceData}/>
      <OurServices/>
    </div>
  )
}
