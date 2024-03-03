import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [search, setSearch] = useState("bhimdatta")
  const [data, setData] = useState(null)
  const [city, setCity] = useState("")



  const fetchApi = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URI}q=${search}&appid=${import.meta.env.VITE_API_KEY}`)
    const { data } = res
    setData(data)

  }
  const handelClick = () => {
    setSearch(city)
    setCity('')
    console.log(city);
  }

  useEffect(() => {
    try {
      fetchApi()
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }, [handelClick])

  return (
    <div className='w-full h-screen bg-slate-800 flex justify-center items-center'>
      <div className='w-[300px] h-[480px] bg-slate-500 text-center p-2 rounded-lg '>
        <h2 className='uppercase text-3xl text-white font-poppins font-bold'>wheather app</h2>
        <div>
          <div className='w-full h-[40px] bg-white rounded-full flex items-center my-2'>
            <input className='py-1 px-4  boredr-none outline-none rounded-full w-[70%]' type="text" placeholder='search here...' value={city} onChange={(e) => setCity(e.target.value)} />
            <button className='text-white  bg-slate-800 hover:bg-slate-900 px-1 py-2 rounded-full w-[32%]' onClick={handelClick}>Search</button>
          </div>
          <div>
            <div className='flex justify-center'>
              <img className="w-[100px] h-[100px]" src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt="" />
            </div>
            <div>
              <h3 className='text-2xl text-white font-bold  capitalize'><span className='capitalize'>{data.name}</span>, {data?.sys.country}</h3>
              <p className='text-3xl font-semibold text-white'>{Math.round(data?.main.temp - 273.15)}<sup>o</sup>C</p>
              <p className='text-2xl font-semibold text-white'>{data?.weather[0].main}</p>
            </div>
          </div>
          <div>
            <div className='mt-4 flex justify-evenly'>

              <div className='w-[130px] h-[150px] bg-white flex justify-center items-center flex-col rounded-xl'>
                <img className='w-[50px] h-[50px]' src="https://cdn-icons-png.flaticon.com/128/3949/3949060.png" alt="" />
                <h3 className='text-xl font-semibold'>Wind</h3>
                <p className='text-l font-semibold'>{data?.wind.speed} Km/h</p>
              </div>
              <div className='w-[130px] h-[150px] bg-white flex justify-center items-center flex-col rounded-xl'>
                <img className='w-[50px] h-[50px]' src="https://cdn-icons-png.flaticon.com/128/6566/6566344.png" alt="" />
                <h3 className='text-xl font-semibold'>Humidity</h3>
                <p className='text-l font-semibold'>{data?.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App