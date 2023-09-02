'use client'

import { useState } from 'react'
import { CustomButton } from '.'
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import { ShowMoreProps } from '@/types';

const ShowMore = ({pageNumber, isNext} : ShowMoreProps) => {

    const route = useRouter() 

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10

        const newPathname = updateSearchParams('limit', `${newLimit}`)

 
        route.push(newPathname)
    } 
    

  return (
    <div className='w-ful flex-center gap-5 mt-10'>
        {!isNext && (
            <CustomButton 
                title='Show More' 
                containerStyles='rounded-full bg-primary-blue' textStyles='text-white text-[14px] leading-[17px] font-bold'  
                handleClick={handleNavigation}
            /> 
        )}
    </div>
  )
}

export default ShowMore