import { useState } from 'react'

const LoginForm = ({ createUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    createUser({
      username, password,
    })
    setUsername('')
    setPassword('')

  }


  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
           username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
          />
        </div>
        <div>
           password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm