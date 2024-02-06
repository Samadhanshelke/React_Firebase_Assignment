import { useEffect, useState } from 'react';
import cloudImg from '../assets/clouds-svgrepo-com.svg'
import axios from 'axios';
import { IoSunnyOutline } from "react-icons/io5";
// import DaysData from '../components/DaysData';
import { RotatingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
function HomePage() {
    const [city,setCity] = useState();
    const [data,setData] = useState(null);
    const[temp,setTemp] = useState(null)
    const [Loading,setLoading] = useState(true)
    const formatDate = (date) => {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const ampm = date.getHours() < 12 ? 'AM' : 'PM';
        const month = months[date.getMonth()];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const year = date.getFullYear();
      
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}, ${dayOfWeek}, ${month} ${day}, ${year}`;
      };
      
      const date = new Date(); // Replace this with your desired date
      const formattedDate = formatDate(date);

      function celsiusToFahrenheit(k) {
        return ((k - 273.15) * 9/5 + 32).toFixed(2);
      }
     
      

      const handleSearch  = async()=>{
        if(city == ""){
          toast.error("Field is Empty")
          return
        }
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=51d2507fccc3f97cadac8826f8d8419f`)
         setData(response.data)
         if(response.data){
          setLoading(false)
         }
        const temperatureInCelsius = response.data.list[0].main.temp;
        const temperatureInFahrenheit = celsiusToFahrenheit(temperatureInCelsius);
        console.log(temperatureInFahrenheit);
        setTemp(temperatureInFahrenheit)
        console.log('data',data?.list[0]?.weather[0]?.main)
      }
      useEffect(()=>{
           handleSearch()
         
      },[])


      
  return (
    <div className="m-auto flex justify-center bg-[#f2f6fa] h-[100vh] items-center">
         <div className="w-11/12 bg-[#fffefe] rounded-lg shadow-md h-[500px] border flex items-center justify-center">
                <div className=" flex gap-y-10 flex-col justify-center items-center">
                           <div className="flex flex-col gap-y-2 items-start">
                                <label htmlFor="city" className="font-semibold text-[20px]">Your City</label>
                                <input value={city} onChange={(e)=>setCity(e.target.value)} className="px-4 py-2 rounded border-2 border-black focus:outline-none" placeholder="Search City..." type="text" name="city" id="city" />
                                <button type='submit' onClick={handleSearch} className='px-4 py-2 hover:bg-sky-400 bg-sky-600 text-white rounded'>Search</button>
                           </div>
                            {
                              Loading ? (<div className='flex justify-center items-center h-full'>
  <RotatingLines
    visible={true}
    height={40}
    width={40}
    color='black'
    strokeWidth={5}
    animationDuration={0.75}
    ariaLabel='loading-spinner'
  />
</div>) : (
                                  <div className=" flex gap-y-10 flex-col justify-center items-center">
                                          <div className="flex justify-center items-center flex-col ps-2 text-[20px]">
                                          <h1>{formattedDate}</h1>
                                          <div className='flex items-center mt-4 justify-center gap-x-4'>
                                          {
                                            data?.list[0]?.weather[0]?.main == "Clear"
                                              ? <IoSunnyOutline className='text-[80px] text-yellow-4 00'/>
                                              : <img src={cloudImg} className='w-28' alt="" />
                                          }
                                          
                                          <span className='text-4xl font-bold'>{Math.round(temp)} <sup>o</sup>F</span>
                                          </div>
                                          <h1 className='text-4xl font-bold'>{data?.list[0]?.weather[0]?.main}</h1>
                                      </div>
                                      <div className='flex justify-between gap-x-6'>
                                          <div className='flex flex-col justify-center items-center'>
                                              <span className='text-gray-500 text-[18px]'>Humidity</span>
                                              <span className='text-[24px] font-semibold'>{data?.list[0]?.main?.humidity} %</span>
                                          </div>
                                          <div className='flex flex-col justify-center items-center'>
                                              <span className='text-gray-500 text-[18px]'>Wind Speed</span>
                                              <span className='text-[24px] font-semibold'>{data?.list[0]?.wind?.speed} m/s</span>
                                          </div>
                                      </div>
                                  </div>
                              )
                            }
                          
                </div>
                
         </div>
    </div> 
  )
}

export default HomePage