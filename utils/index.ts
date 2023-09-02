import { CarProps, FilterProps } from "@/types";
import axios from "axios";      

export async function fetchCars(filter : FilterProps) {
  const {manufacturer, year, fuel, limit, model} = filter
    const options = {
        method: 'GET',
        url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
        params: {
          make: manufacturer,
          year,
          fuel_type: fuel,
          limit,
          model,
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
          'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
      };

    let res 
    await axios.request(options).then(response => res = response.data).catch(error => console.log(error));
 
    return res || []
}
export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car: CarProps, angle?:string) => {

}

export const updateSearchParams = (type:string, value:string) => {
  const searchParams = new URLSearchParams(window.location.search)  
 
  searchParams.set(type, value) 

  const newPathname = `${window.location.pathname}?${searchParams.toString()}` 

  return newPathname
}

