// Prelude
import { useState, useEffect } from "react"
import { API_KEY, BASE_URL } from "../config/env";
import LoadingSpinner from "../assets/LoadingSpinner";

function SearchBox({onCitySelect}) {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);


    useEffect(() => {
        if (selectedCity) return;

        // avoid unnecessary calls
        if (query.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        const fetchCities = async () => {
            try {
                setLoading(true);
                setError(null);
                setSuggestions([]);

                const res = await fetch(
                    `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
                );
                
                if (!res.ok) {
                    throw new Error('Failed to fetch cities')
                }

                const data = await res.json();
                setSuggestions(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }
        
        const timer = setTimeout(fetchCities, 400);
        return () => clearTimeout(timer);
    }, [query, selectedCity]);


    function handleSelect(city) {
        setQuery(
            `${city.name}${(city.name !== city.state) ? `, ${city.state}` : ''}, ${city.country}`
        );
        setSelectedCity(city);
        setSuggestions([]);
        onCitySelect(city);
    }

    const showWrapperBorder = loading || suggestions.length > 0;
    

    return (
        <div className="mt-4 flex items-center flex-col relative">
            <input
                type="text"
                className="border bg-white text-black outline-none h-full rounded-[30px] py-3 px-3 w-[80%]"
                placeholder="Search weather by city"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedCity(null);
                }}
            />

            <div className={`w-[75%] bg-neutral-950 ${showWrapperBorder ? 'border-2 border-blue-800' : ''} rounded-xl overflow-hidden absolute top-[60px] flex flex-col`}>
                {loading && (
                    <div className="mx-auto my-2">
                        <LoadingSpinner searchBarRef={true}/>
                    </div>
                )}
                {error && <p>{error}</p>}

                {suggestions.length > 0 && (
                    <ul
                        className=""
                    >
                        {suggestions.map((city) => {
                            return (    
                                <li
                                    key={`${city.lat}-${city.lon}`}
                                    onClick={() => handleSelect(city)}
                                    className="hover:bg-neutral-100 hover:text-black p-2 cursor-pointer"
                                >
                                    {
                                        `${city.name}${(city.name !== city.state) ? `, ${city.state}` : ''}, ${city.country}`
                                    }
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SearchBox