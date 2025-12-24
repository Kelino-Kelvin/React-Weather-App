import { getWeatherTheme } from "../utils/WeatherCardtheme";


function WeatherCard({ weather }) {

    const icon = weather.weather[0].icon;
    const description = weather.weather[0].description;

    const theme = weather
    ? getWeatherTheme(weather.weather[0].id)
    : { bg: "from-slate-300 to-slate-500", text: "text-gray-900" };

    return (
        <div className="flex justify-center mt-6">
            <div className={`flex flex-col px-3 pt-7 pb-10 w-[90%] rounded-[32px] ${theme.bg} ${theme.text}`}>
                <h2 className="text-2xl font-semibold pl-14">
                    {weather.name}, {weather.sys.country}
                </h2>

                <div className="flex h-[130px] justify-center items-end gap-8">
                    <div>
                        <div className=" h-[130px] aspect-square pt-7 overflow-hidden">
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt={description}
                                className="w-full h-[125px] aspect-square"
                            />
                        </div>
                        <p className="capitalize text-lg font-semibold text-center">
                            {weather.weather[0].description}
                        </p>
                    </div>

                    <p className="text-6xl font-bold h-full flex justify-between items-end pb-4">
                        {Math.round(weather.main.temp)}°C
                    </p>
                </div>

                <div className="flex mt-8 justify-center gap-4 px-3">
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
    )
}

export default WeatherCard