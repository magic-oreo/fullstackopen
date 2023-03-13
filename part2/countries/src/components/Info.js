import Languages from './Languages'
import Weather from './Weather'

const Info = ({ toShow }) => {
    const country = Object.assign({}, ...toShow)
    const languages = Object.values(toShow[0].languages)
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h3>languages:</h3>
            {languages.map(language =>
                <Languages
                    key={language}
                    name={language} />
            )}
            <p><img src={country.flags.png} alt='flag' /></p>
            <h2>Weather in {country.capital}</h2>
            <Weather city={country.capital} country={country.cca2} />
        </>
    )
}

export default Info