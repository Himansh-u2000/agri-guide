import React from 'react'
import SubHeader from '../common/SubHeader'
import icon1 from '../../assets/1.png'
import icon2 from '../../assets/2.png'
import icon3 from '../../assets/3.png'

export default function OurServices() {
  const services = [
    {
      name: 'Service 1',
      img: icon1,
      description: 'Discover the top trending and profitable crops across regions to boost your yield and market value!'
    },
    {
      name: 'Service 2',
      img: icon2,
      description: 'CropAdvisor provides personalized crop recommendations based on your soil type, region, and climate conditions.'
    },
    {
      name: 'Service 3',
      img: icon3,
      description: '24/7 Instant Support – No waiting time, get answers anytime.'
    }
  ]
  return (
    <div className='p-4'>
      <SubHeader label='Our Serices' />
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 p-4 max-w-7xl mx-auto">
        {
          services.map((service, index) => (
            <div key={index}>
              <h1 className='text-center font-semibold p-2'>{service.name}</h1>
              <div key={service} className="bg-white p-4 min-h-22 rounded-xl duration-200 ease-in-out shadow-md hover:shadow-2xl hover:cursor-pointer">
                <img src={service.img} alt="" className='w-1/2 mx-auto' />
                <p className="text-sm text-justify">{service.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
