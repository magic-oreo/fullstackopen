import Languages from './Languages'

const Info = ({ toShow }) => {
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

export default Info