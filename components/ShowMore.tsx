'use client'
 
import { CustomButton } from '.' 
import { ShowMoreProps } from '@/types';

const ShowMore = ({pageNumber, isNext, setLimit} : ShowMoreProps) => {
 

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10

        setLimit(newLimit)
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