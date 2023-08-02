import React, { useState } from 'react'

const Wheater = () => {
  const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
  const API_KEY = 'ec7f0614528425634c699a30590352e0';
  const [ciudad, setCiudad] = useState('')
  const [data, setData] = useState(null)
  const difKelvin = 273.15
  const handleCambioCiudad = (e)=>{
    setCiudad(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(ciudad.length > 0) fetchClima();
    console.log(data)
  }
  const fetchClima = async ()=>{
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setData(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className='container'>
        <h1>Aplicacion del clima</h1>
        <form  onSubmit={handleSubmit}>
            <input type="text" value={ciudad} onChange={handleCambioCiudad}></input>
            <button type="submit">Buscar</button>
        </form>
        {
          data && (
            <div>
              <p>{data.name}</p>
              <p>Temperatura: {parseInt(data?.main?.temp - difKelvin)}°C</p>
              <p>Temperatura: {data?.weather[0]?.description}</p>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />

            </div>
          )
        }
      </div>
    </>
  )
}

export default Wheater
