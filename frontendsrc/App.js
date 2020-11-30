import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import Login from './components/Login'
import MSG from './components/MSG'
import blogService from './services/blogs'
import loginService from './services/logins'
// eslint-disable-next-line no-undef
require('express-async-errors')

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage] = useState(null)

  const blogFormRef = useRef()
  console.log(blogs)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    tempMessage({
      content:'page loaded',
      mType: 'success'
    } ,5000)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(storedUser.token)
      setUser(storedUser)
    }
  }, [])

  const tempMessage = (tmessage,mstime) => {
    setMessage(tmessage)
    setTimeout(() => {setMessage(null)}, mstime)
  }

  const loginUser = async (event) => {
    event.preventDefault()
    const nameObject = {
      username: username,
      password: password
    }
    try{
      const user = await loginService.sendLogin(nameObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      tempMessage({
        content:'successful login',
        mType: 'success'
      } ,5000)
    }catch(exception){
      tempMessage({
        content:'wrong credentials',
        mType: 'error'
      } ,5000)
    }
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const createBlog = async (nameObject) => {

    event.preventDefault()
    try{

      const response = await blogService.create(nameObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      tempMessage({
        content:'New blog added to list',
        mType: 'success'
      } ,5000)
    }catch(exception){
      tempMessage({
        content:'Error creating blog',
        mType: 'error'
      } ,5000)
    }
  }




  return (
    <div>
      <MSG message={message} />
      <h2>blogs</h2>

      <Login
        Blog={Blog}
        setBlogs={setBlogs}
        blogs={blogs}
        user={user}
        loginUser={loginUser}
        logoutUser={logoutUser}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Toggable>

    </div>
  )
}

export default App