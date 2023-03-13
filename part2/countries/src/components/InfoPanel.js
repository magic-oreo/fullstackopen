import Country from './Country'
import Info from './Info'

const InfoPanel = ({ toShow, setView }) => {

    if (toShow.length > 10) {
        return (
            <>
                Too many matches, specify another filter
            </>
        )
    }
    if (toShow.length === 1) {
        return <Info toShow={toShow} />
    }

    return (
        <>
            {toShow.map(country =>
                <Country
                    key={country.name.common}
                    name={country.name.common} 
                    setView={setView} />
            )}
        </>
    )
}

export default InfoPanel