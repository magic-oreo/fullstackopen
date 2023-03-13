import Info from './Info'

const View = ({ viewCountry }) => {
    if (viewCountry === undefined || viewCountry.length === 0) {
        return (
            <></>
        )
    }

    return (
        <>
            <Info toShow={viewCountry} />
        </>
    )
}

export default View