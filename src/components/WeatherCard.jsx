import { getWeatherTheme } from "../utils/WeatherCardtheme";


function WeatherCard({ weather, demoName }) {

    const icon = weather.weather[0].icon;
    const description = weather.weather[0].description;

    const theme = weather
    ? getWeatherTheme(weather.weather[0].id)
    : { bg: "from-slate-300 to-slate-500", text: "text-gray-900" };

    return (
        <div className="flex justify-center mt-4">
            <div className={`flex flex-col px-3 pt-7 pb-10 w-[90%] rounded-[32px] ${theme.bg} ${theme.text}`}>
                <div className="text-center md:px-14 md:text-left">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        {demoName
                            ? `${demoName} - Today`
                            : `${weather.name}, ${weather.sys.country} - Today`
                        }
                        
                    </h2>
                </div>

                <div className="flex h-[130px] justify-center items-end gap-8">
                    <div className="">
                        <div className="md:h-[130px] aspect-square pt-4 md:pt-7 overflow-hidden">
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt={description}
                                className="w-full aspect-square"
                            />
                        </div>
                        <p className="capitalize md:text-lg font-semibold text-center">
                            {weather.weather[0].description}
                        </p>
                    </div>

                    <p className="text-4xl md:text-6xl font-bold h-full flex justify-between items-end pb-6 md:pb-4">
                        {Math.round(weather.main.temp)}°C
                    </p>
                </div>

                <div className="flex overflow-x-auto scrollbar mt-6 md:mt-8 md:px-3 pb-2">
                    <div className="flex gap-3 justify-center mx-auto">
                        <div className="weather-small-card">
                            <span>Feels like</span>
                            <span className="text-xl font-semibold">{Math.round(weather.main.feels_like)}°C</span>
                        </div>
                        <div className="weather-small-card">
                            <span>Humidity</span>
                            <span className="text-xl font-semibold">{weather.main.humidity}%</span>
                        </div>
                        <div className="weather-small-card">
                            <span>Wind</span>
                            <span className="text-xl font-semibold">{weather.wind.speed} m/s</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard