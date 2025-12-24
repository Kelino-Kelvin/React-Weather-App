export function getWeatherTheme(weatherId) {
    // Base direction for all gradients
    const direction = "bg-gradient-to-br"; 

    // 2xx: Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
        return {
            // Dark, ominous theme
            bg: `${direction} from-gray-700 via-gray-800 to-black`, 
            text: "text-white"
        };
    }

    // 3xx & 5xx: Drizzle and Rain
    if (weatherId >= 300 && weatherId < 600) {
        return {
            // Moody blue/grey rain theme
            bg: `${direction} from-blue-600 via-blue-700 to-gray-800`, 
            text: "text-white"
        };
    }

    // 6xx: Snow
    if (weatherId >= 600 && weatherId < 700) {
        return {
            // Bright, icy theme
            bg: `${direction} from-slate-100 via-slate-200 to-sky-100`, 
            text: "text-gray-900"
        };
    }

    // 7xx: Atmosphere (Mist, Smoke, Haze)
    if (weatherId >= 700 && weatherId < 800) {
        return {
            // Muted, hazy theme
            bg: `${direction} from-gray-300 via-gray-200 to-gray-100`, 
            text: "text-gray-900"
        };
    }

    // 800: Clear Sky
    if (weatherId === 800) {
        return {
            // Clear, vibrant sky theme
            bg: `${direction} from-sky-400 via-blue-500 to-indigo-500`, 
            text: "text-white"
        };
    }

    // Default (80x and other unhandled codes)
    return {
        // Cloudy or default gray theme
        bg: `${direction} from-slate-400 via-slate-500 to-slate-600`, 
        text: "text-white"
    };
}