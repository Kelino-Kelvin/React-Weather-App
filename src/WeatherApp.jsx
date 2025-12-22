import './styles.css'
import SearchBox from './components/SearcBox'

function WeatherApp() {

    const handleCitySelect = (city) => {
        console.log('Selected city:', city)
    }

    return <main className='w-full max-w-[600px] mx-auto px-3 pt-3'>
        <h1 className='text-3xl font-semibold text-center'>
            Makeshift Weather App
        </h1>

        <SearchBox onCitySelect={handleCitySelect} />
    </main>
}

export default WeatherApp