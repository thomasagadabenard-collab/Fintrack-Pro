import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = ({ setIsLoggedIn }) => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    setErrors({ 
      ...errors,
      [e.target.name]: ''
    });
  }

  const handleError = () => {

    const err = {}

    if (!formData.username) {
      err.username = "Name cannot be empty"
    }

    if (!formData.email) {
      err.email = "Email cannot be empty"
    } else if (!formData.email.includes("@")) {
      err.email = "Invalid email"
    }

    if (!formData.password) {
      err.password = "Password cannot be empty"
    } else if (formData.password.length !== 6) {
      err.password = "Password should be 6 characters"
    }

    setErrors(err)

    return Object.keys(err).length === 0
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const isValid = handleError()

    if (isValid) {

      setErrors({});

      setIsLoggedIn(true)

      alert("Login successful")

      navigate('/dashboard')
    }
  }

  return (
    <section className='login-wrapper'>

      <form className='login-form' onSubmit={handleSubmit}>

        <h1>Login Details</h1>

        <input
          type="text"
          name="username"
          placeholder='Enter your name'
          value={formData.username}
          onChange={handleChange}
        />

        {errors.username && <small>{errors.username}</small>}

        <input
          type="email"
          name="email"
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && <small>{errors.email}</small>}

        <input
          type="password"
          name="password"
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
        />

        {errors.password && <small>{errors.password}</small>}

        <div className='inp-small-btn'>
          
          <div className='inp-small'>
            <input type="checkbox" name="" id="" className='form-checkbox' />
            <small>Remember password</small>
          </div>

          <button type='submit' className='form-btn'>Submit</button>
        </div>

      </form>

    </section>
  )
}

export default LogIn

