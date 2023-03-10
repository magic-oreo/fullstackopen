import { useState, useEffect } from 'react'
import axios from 'axios'
import InfoPanel from './components/InfoPanel'
import Filter from './components/Filter'

const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const toShow = data.filter(data => data.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setData(response.data)
      })
  }, [])

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <InfoPanel toShow={toShow} />
    </>
  )
}

export default App;