import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {


  const [ title, setTitle] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <p>title:</p>
        <input className="titleinput"
          id='title'
          value={title}
          onChange={handleTitleChange}
        />
        <p>author:</p>
        <input className="authorinput"
          id='author'
          value={author}
          onChange={handleAuthorChange}
        />
        <p>url:</p>
        <input className="urlinput"
          id='url'
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit">submit new blog</button>
      </form>
    </div>
  )
}

export default BlogForm

