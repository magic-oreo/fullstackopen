const Country = ({ name, setView }) => {
    return (
      <>
        {name}        
        <button onClick={() => setView(name)}>
          show
        </button><br />
      </>
    )
  }

export default Country