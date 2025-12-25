
function ForecastDiv({ forecast }) {
    // reduce list to 5 day intervals at 12:00pm
    const getDailyForecast = (list) => {
        const daily = [];

        list.forEach(item => {
            if(item.dt_txt.includes('12:00:00')) {
                daily.push(item);
            }
        })

        return daily.slice(0, 4);
    }

    // then collate into an array. (easy manipulation)
    const dailyForecast = forecast ? getDailyForecast(forecast) : [];

    return (
        <div className="my-6 grid grid-cols-2 gap-3 px-8">
            {dailyForecast.length > 0 && (
                dailyForecast.map(day => (
                    <div
                        key={day.dt}
                        className={`bg-white/70 backdrop-blur rounded-[16px] p-3 text-center text-black`}
                    >
                        <p className="font-semibold">
                            {new Date(day.dt_txt).toLocaleDateString("en-US", {
                                weekday: "long"
                            })}
                        </p>

                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt={day.weather[0].description}
                            className="mx-auto"
                        />

                        <p className="font-bold">
                            {Math.round(day.main.temp)}°C
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default ForecastDiv