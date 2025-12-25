import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from './config/env';
import './styles.css';
import SearchBox from './components/SearcBox';
import WeatherCard from './components/WeatherCard';
import ForecastDiv from './components/ForecastSection';
import LoadingSpinner from './assets/LoadingSpinner';



function WeatherApp() {
    
    // catch the city from searchBox
    const [cityQuery, setCityQuery] = useState(null);
    const handleCitySelect = (city) => {
        setCityQuery(city)
    }

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    useEffect(() => {
        if (!cityQuery) return

        const fetchweatherData = async () =>  {
            setWeather(null);
            setForecast(null)

            try {
                setLoading(true);
                setError(null);

                const [currentRes, forecastRes] = await Promise.all([
                    fetch(`${BASE_URL}/data/2.5/weather?lat=${cityQuery.lat}&lon=${cityQuery.lon}&units=metric&appid=${API_KEY}`),
                    fetch(`${BASE_URL}/data/2.5/forecast?lat=${cityQuery.lat}&lon=${cityQuery.lon}&units=metric&appid=${API_KEY}`)
                ])
                if(!currentRes.ok || !forecastRes.ok) {
                    throw new Error('Error Fetching Weather');
                }

                const weatherData = await currentRes.json();
                const forecastData = await forecastRes.json();
                setWeather(weatherData);
                setForecast(forecastData.list);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchweatherData();

    }, [cityQuery])

    return <main className='w-full max-w-[600px] mx-auto px-3 pt-3'>
        <h1 className='text-xl md:text-3xl font-semibold text-center'>
            Makeshift Weather App
        </h1>

        <SearchBox onCitySelect={handleCitySelect} />
        <p className='text-center text-sm font-light mt-2'>In local areas, data may be gotten from the nearest city</p>

        <div>
            {loading && (  
                <div className='h-[100px] flex justify-center items-center '>
                    <LoadingSpinner searcBarRef={false} />
                </div>
            )}
            {error && (
                <p>{error}</p>
            )}
            {weather && (
                <WeatherCard weather={weather} />
            )}
            {forecast && (
                <ForecastDiv forecast={forecast}/>
            )}
        </div>
    </main>
}

export default WeatherApp