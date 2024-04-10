import { useState, useEffect } from "react";
import { useGetCities } from "../services/apiCities";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { fetchWeather } from "../services/fetchWeather";
import "./Cities.scss";


export default function Cities() {
  const { cities, isCitiesLoading, error } = useGetCities();
  const [initialCities, setInitialCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [weather, updateWeather] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (cities && cities.results) {
      setInitialCities(cities.results);
    }
  }, [cities]);

  if (isCitiesLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!cities || !cities.results || cities.results.length === 0) {
    return <p>No cities found.</p>;
  }

  // Function to sort cities based on column and direction
  const sortCities = (column) => {
    console.log("collimn", column)
    console.log("Sort Column Before Update:", sortColumn);
    console.log("Sort Direction Before Update:", sortDirection);

    if (column === sortColumn) {
      // Toggle sort direction if sorting the same column
      setSortDirection(prevDirection => (prevDirection === "asc" ? "desc" : "asc"));
    } else {
      // Set new sort column and default to ascending direction
      setSortColumn(column);
      setSortDirection("asc");
    }

    console.log("Sort Column After Update:", sortColumn);
    console.log("Sort Direction After Update:", sortDirection);
  };



  // Sort function based on column
  const sortedCities = () => {
    let sorted = [...filteredCities];
    if (sortColumn) {
      sorted = sorted.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        if (columnA < columnB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (columnA > columnB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  
  const handleCityClick = async (cityId, cityName) => {
    try {
      const weatherData = await fetchWeather(cityId); // Fetch weather data using the hook
      console.log("heree", weatherData)
      navigate(`/weather`, { state: { weatherData, cityName } }); // Pass weather data and cityName as state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleRightClick = async (e, cityId, cityName) => {
    e.preventDefault();
    e.target.classList.remove('hovered');
    e.target.classList.add('right-clicked');

    try {
      const weatherData = await fetchWeather(cityId); 

      // Store data in localStorage
      window.localStorage.setItem('weatherData', JSON.stringify(weatherData));
      window.localStorage.setItem('cityName', cityName);

      // Open weather page in a new tab
      const url = `/weather`; 
      window.open(url, '_blank');
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  // Filter cities based on search query
  const filteredCities = searchQuery ? initialCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : initialCities;

  // Update suggestions based on search query
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]); // Clear suggestions if search query is empty
    } else {
      // Filter suggestions based on input query
      const suggestedCountries = cities.results.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase())
      ).map(city => city.name);

      setSuggestions(suggestedCountries);
    }
  };

  // Update search query when suggestion clicked
  const handleSuggestionClick = (cityName) => {
    setSearchQuery(cityName);
    setSuggestions([]); // Clear suggestions after selection
  };



  // Render suggestions
  const renderSuggestions = () => {
    return (
      <ul>
        {suggestions.map((country, index) => (
          <li key={index} onClick={() => handleSuggestionClick(country)}>
            {country}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        {/* Search bar with suggestions */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a city"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {renderSuggestions()}
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <div>
                City Name <FaSortUp onClick={() => sortCities("name")} />
                  {/* {sortColumn === "name" && (
                    sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />
                  )} */}
                </div>
              </th>
              <th>
                <div >
                  Country <FaSortUp onClick={() => sortCities("cou_name_en")} />
                  {/* {sortColumn === "cou_name_en" && (
                    sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />
                  )} */}
                </div>
              </th>
              <th>
                <div >
                  Timezone <FaSortUp onClick={() => sortCities("timezone")} />
                  {/* {sortColumn === "timezone" && (
                    sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />
                  )} */}
                </div>
              </th>
              <th>
                <div>
                  Population <FaSortUp onClick={() => sortCities("population")} />
                  {/* {sortColumn === "population" && (
                    sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />
                  )} */}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCities().map(city => (
              <tr key={city.id}>
                <td className="city-name" onClick={() => handleCityClick(city.name)} onContextMenu={(e) => handleRightClick(e, city.name)}>{city.name} </td>
                <td>{city.cou_name_en}</td>
                <td>{city.timezone}</td>
                <td>{city.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
