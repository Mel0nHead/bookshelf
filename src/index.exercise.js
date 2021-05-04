import {Logo} from 'components/logo'
import React from 'react'
import ReactDOM from 'react-dom'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function LoginForm({buttonText, onSubmit}) {
  const handleSubmit = e => {
    e.preventDefault()
    const {
      target: {username, password},
    } = e

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form name="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />

      <button type="submit">{buttonText}</button>
    </form>
  )
}

function App() {
  const [openDialog, setOpenDialog] = React.useState('none') // `none`, `login` or `register`
  const handleClose = () => setOpenDialog('none')

  const handleSubmit = formData => {
    console.log('form data', formData)
  }

  return (
    <>
      <Dialog
        onDismiss={handleClose}
        isOpen={openDialog === 'login'}
        aria-label="Login dialog"
      >
        <LoginForm buttonText="Login" onSubmit={handleSubmit} />
      </Dialog>

      <Dialog
        onDismiss={handleClose}
        isOpen={openDialog === 'register'}
        aria-label="Register dialog"
      >
        <LoginForm buttonText="Register" onSubmit={handleSubmit} />
      </Dialog>

      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenDialog('login')}>Login</button>
      <button onClick={() => setOpenDialog('register')}>Register</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
