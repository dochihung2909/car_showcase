'use client'

import { useState,Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'

import { SearchManufacturerProps } from '@/types' 
import { manufacturers } from '@/constants'

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {

    const [query, setQuery] = useState('')  

    const filteredManufacturers = 
    query === '' 
        ? manufacturers 
        : manufacturers.filter ((item) => (
            item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        )) 
        
  return (
    <div className='search-manufacturer'>
        <Combobox value={selected} onChange={setSelected}>
            <div className='relative w-full'>
                <Combobox.Button className='absolute top-[14px]'>
                    <Image
                        src='/car-logo.svg'
                        width={20}
                        height={20}
                        alt='Car Logo'
                        className='ml-4'
                    /> 
                </Combobox.Button>

                <Combobox.Input 
                    className='search-manufacturer__input' placeholder='Volkswagen'
                    displayValue={(manufacturer: string) => manufacturer} 
                    onChange={(e) => setQuery(e.target.value)}
                >

                </Combobox.Input>

                <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    afterLeave={() => setQuery('')}
                > 
                    <Combobox.Options> 
                        {filteredManufacturers.map((item) => (
                            <Combobox.Option
                                key={item}
                                value={item}
                                className={({active}) => `relative search-manufacturer__option cursor-pointer  ${active ? 'bg-primary-blue text-gray-900' : 'text-gray-900'}`}
                            > 
                                {item}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer