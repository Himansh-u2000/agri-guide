import React from 'react'

export default function TrendCardDesktop({
  img = "https://img.freepik.com/free-vector/corn-plant-growing-with-soil-cartoon_1308-100337.jpg",
  commodity = "WHEAT",
  min_price = 45,
  max_price = 50,
}) {
  return (
    <div className='shadow-lg w-full rounded-lg p-4 grid grid-cols-4 bg-white duration-150 ease-in-out hover:shadow-xl'>
      <img src={img} alt="" className='h-14 w-14 ' />
      <span className='font-semibold text-sm'>
        {commodity.toUpperCase()}
      </span>
      <span className='font-semibold '>
        ₹{min_price} /Qt.
      </span>
      <span className={`font-semibold ${min_price > max_price ? 'text-red-500' : 'text-green-500'}`}>
        ₹{max_price} /Qt.
      </span>
    </div>
  )
}
