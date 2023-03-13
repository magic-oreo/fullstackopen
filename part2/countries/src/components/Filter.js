const Filter = ({ filter, setFilter }) => {
  
  return (
      <>
        find countries <input value={filter} onChange={(event) => setFilter(event.target.value)} />
      </>
    )
  }

export default Filter