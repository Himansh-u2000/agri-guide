import React from 'react'

export default function TrendCardMobile({
  img = "https://img.freepik.com/free-vector/corn-plant-growing-with-soil-cartoon_1308-100337.jpg",
  commodity = "WHEAT",
  min_price = 45,
  max_price = 50,
}) {
  return (
    <div className='rounded-xl shadow-xs hover:shadow-2xl flex justify-evenly bg-white p-2 mx-auto w-full'>
      <div className="flex flex-col gap-4">
        <img src={img} alt="img" className='w-20 h-20' />
        <h1 className='font-semibold text-xs'>
          {commodity.toUpperCase()}
        </h1>
      </div>
      <div className="flex flex-col gap-4 justify-center">
        <div className='text-sm'>Last Week:{' '}
          <span >
            ₹
            {min_price}
            /Qt.
          </span>
        </div>
        <div className='text-sm'>Today:{' '}
          <span className={min_price > max_price ? 'text-red-500 text-base' : 'text-green-500 text-base'}>
            ₹
            {max_price}
            /Qt.
          </span>
        </div>
      </div>
    </div>
  )
}
