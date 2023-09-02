'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image'

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fetchCars } from '@/utils'
import { yearsOfProduction, fuels } from '@/constants';

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)
  
  // search states
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  // filter states
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2020)

  // pagination states
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || 'Toyota',
        year: year || 2020,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result) 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
    

  }

  useEffect(() => {
    getCars() 
    console.log(allCars)
  }, [fuel,year, limit, manufacturer, model])
 

  return (
    <main className="overflow-hidden">
       <Hero/>

       <div className='mt-10 padding-x padding-y max-width' id='discover'>
            <div className='home__text-container'>
                <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
                <p>Explore the cars you might like</p>
            </div>

            <div className='home__filters'>
                <SearchBar 
                  setManufacturer={setManufacturer}
                  setModel={setModel}
                />

                <div className='home__filter-container'>
                  <CustomFilter options={fuels} setFilter={setFuel} />
                  <CustomFilter options={yearsOfProduction} setFilter={setYear} />
                </div>
            </div>

            {allCars.length > 0 ? (
              <section>
                <div className='home__cars-wrapper'>
                  {allCars?.map((car) => <CarCard car={car} />)}
                </div>

                {loading && (
                  <div className='w-full mt-16 flex-center'>
                    <Image 
                      src='/loader.svg'
                      width={50}
                      height={50}
                      alt='loading'
                      className='object-contain'
                    />
                  </div>
                )}

                <ShowMore 
                  pageNumber={limit/ 10}
                  isNext={(limit) > allCars.length}
                  setLimit={setLimit}
                /> 
              </section>
              
            ) : (
              <div className='home__error-container'>
                <h2 className='text-black text-xl font-bold'>
                  Oops, no result
                </h2>
              </div>
            )} 
       </div>
    </main>
  )
}
