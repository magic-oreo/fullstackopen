import { useState, useEffect } from 'react'
import weatherService from '../services/weather'
import Icon from './Icon'

const Weather = ({ city, country }) => {
    const [request, setRequest] = useState('...')
    const [data, setData] = useState('...')
    const api_key = process.env.REACT_APP_API_KEY
    const limit = 1
    const location = Object.assign({}, ...request)
    const units = 'metric'

    useEffect(() => {
        weatherService.getLocation(city, country, limit, api_key)
            .then(data => {
                setRequest(data)

            })
    }, [city])

    useEffect(() => {
        if (location.lon && location.lat) {
            weatherService.getWeather(location.lat, location.lon, api_key, units)
                .then(data => {
                    setData(data)
                })
        }
    }, [request])

    return (
        <>
            temperature {data?.main?.temp} Celsius <br />
            <Icon data={data} />
            wind {data?.wind?.speed} m/s
        </>
    )
}

export default Weather