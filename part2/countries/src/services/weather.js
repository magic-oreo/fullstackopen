import axios from 'axios'

const getLocation = async (city, country, limit, api_key) => {
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${limit}&appid=${api_key}`)

    const response = await request
    return response.data
}

const getWeather = async (lat, lon, api_key, units) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)

    const response = await request
    return response.data
}

export default { getLocation, getWeather}