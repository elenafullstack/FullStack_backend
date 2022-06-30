import PropTypes from 'prop-types'

const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
    }) => {
      

      return (
    <form onSubmit={handleSubmit}>
       <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
          placeholder='write title'
          />
       </div>
       <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
          placeholder='write author'
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
          placeholder='write url'
        />
      </div>
      <button type="submit">create</button>
    </form>  
    )

   }

  BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }
  
  export default BlogForm