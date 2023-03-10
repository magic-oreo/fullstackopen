import Country from './Country'
import Languages from './Languages'

const InfoPanel = ({ toShow }) => {
    if (toShow.length > 10) {
        return (
            <>
                Too many matches, specify another filter
            </>
        )
    }
    if (toShow.length === 1) {
        const languages = Object.values(toShow[0].languages)
        return (
            <>
                <h1>{toShow[0].name.common}</h1>
                <p>capital: {toShow[0].capital}</p>
                <p>area: {toShow[0].area}</p>
                <h2>languages:</h2>
                {languages.map(language =>
                    <Languages
                        key={language}
                        name={language} />
                )}
                <p><img src={toShow[0].flags.png} alt='flag' /></p>
            </>
        )
    }

    return (
        <>
            {toShow.map(country =>
                <Country
                    key={country.name.common}
                    name={country.name.common} />
            )}
        </>
    )
}

export default InfoPanel