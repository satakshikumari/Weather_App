import Axios from 'axios';

export const fetchWeather = async (cityId) => {
    try {
        const response = await Axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=af9d6284967a16ffd24b0a074e0478e2`
        );
        console.log("response",response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
