import React from 'react'
import blogService from '../services/blogs'
const Login = ({ Blog,blogs,setBlogs,user,loginUser,logoutUser,username,handlePasswordChange,handleUsernameChange,password }) => {
  const sortedBlogs = blogs
  const raiseLikes = async (blog) => {
    console.log(blog.id)
    const updatedBlog = await blogService.likesUp(blog)
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }
  function compare( a, b ) {
    if ( a.likes > b.likes){
      return -1
    }
    if ( a.likes < b.likes ){
      return 1
    }
    return 0
  }
  sortedBlogs.sort(compare)

  if (user === null) {
    return(
      <form onSubmit={loginUser}>
        <p>username:</p>
        <input
          value={username}
          onChange={handleUsernameChange}
        />
        <p>password:</p>
        <input
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    )
  }
  return(
    <div>
      <p>{user.name} logged in</p>
      <button onClick={logoutUser}>logout</button>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={sortedBlogs} raiseLikes={raiseLikes}/>
      )}

    </div>

  )

}
export default Login

