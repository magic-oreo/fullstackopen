import { useState, useEffect } from 'react'
import axios from 'axios'
import InfoPanel from './components/InfoPanel'
import Filter from './components/Filter'
import View from './components/View'

const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [view, setView] = useState('')
  const toShow = data.filter(data => data.name.common.toLowerCase().includes(filter.toLowerCase()))
  const viewCountry = toShow.filter(data => data.name.common === view)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setData(response.data)
      })
  }, [])

  useEffect(() => {
    setView(filter)
  }, [filter])

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <br />
      <InfoPanel toShow={toShow} setView={setView} />
      <View viewCountry={viewCountry} />
    </>
  )
}

export default App;