import React from 'react'
import Toggable from '../components/Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog,blogs,setBlogs,raiseLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const deleteBlog = async (blog) => {
    if (window.confirm('Do you really want to remove the blog?')) {
      console.log(blog.id)
      await blogService.remove(blog)

      setBlogs(blogs.filter(blogg => blogg.id !== blog.id))
    }
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Toggable buttonLabel='details'>
        <p>Likes {blog.likes}
          <button onClick={() => raiseLikes(blog)}>
              like
          </button>
          <button onClick={() => deleteBlog(blog)}>
              DELETE
          </button>
        </p>
        <p>Url {blog.url}</p>
      </Toggable>
    </div>
  )
}

export default Blog
