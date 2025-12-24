import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from './config/env';
import './styles.css';
import SearchBox from './components/SearcBox';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './assets/LoadingSpinner';



function WeatherApp() {
    
    // catch the city from searchBox
    const [cityQuery, setCityQuery] = useState(null);
    const handleCitySelect = (city) => {
        setCityQuery(city)
    }

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    useEffect(() => {
        if (!cityQuery) return

        const fetchweather = async () =>  {
            setWeather(null);

            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${BASE_URL}/data/2.5/weather?lat=${cityQuery.lat}&lon=${cityQuery.lon}&units=metric&appid=${API_KEY}`
                );
                if(!res.ok) {
                    throw new Error('Error Fetching Weather');
                }

                const data = await res.json();
                setWeather(data);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchweather();

    }, [cityQuery])

    return <main className='w-full max-w-[600px] mx-auto px-3 pt-3'>
        <h1 className='text-3xl font-semibold text-center'>
            Makeshift Weather App
        </h1>

        <SearchBox onCitySelect={handleCitySelect} />

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
        </div>
    </main>
}

export default WeatherApp