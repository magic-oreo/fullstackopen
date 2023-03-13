const Icon = ({ data }) => {
    if (data === '...') return null
    return (
        <>
            <img src={'https://openweathermap.org/img/wn/' + data?.weather?.[0].icon + '.png'} alt='' /> <br />
        </>
    )
}

export default Icon