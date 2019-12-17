import React from 'react';

const Section = ({data: {id, title, complete, comments_attributes}, newComment, instructions, handleChange, inspection}) => {

  function renderComments() {
    const sortedComments = comments_attributes.sort((a,b) => a.id - b.id)
    return (
      <div className={
          `comments collapsible 
          ${complete && sortedComments.length === 0 && newComment === "" ? "hidden":""}`}>
        <h3>Comments:</h3>
        {sortedComments.map((comment, i) =>{
          return (
            <div className="comment" key={i}>
              <strong>{comment.user.fullname}: </strong>{comment.content}
            </div>
          )
        })}
        <input type="textarea" name={title} value={newComment} onChange={handleChange} inspection={inspection} className={`collapsible ${complete && newComment === "" ? "hidden":""}`} placeholder="New comment" />
      </div>
    )
  }
  
  return(
    <div className={`form-group ${complete ? "complete":"incomplete"}`} id={`section-${id}`} >
      <h2>{title}</h2>
      <div className={`collapsible ${complete ? "hidden":""}`} >
        <div className="instructions-text">
          <ul>
            {instructions.split('\n').map(line => {
              return <li>{line}</li>
            })}
          </ul>
        </div>

      </div>
      <div className="form-check completed-group">
        <label className="toggleButton">
          <input type="checkbox" checked={complete} onChange={handleChange} name={title} inspection={inspection} />
          <div>
            <svg viewBox="0 0 44 44">
                <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
            </svg>
          </div>
        </label>
        <label htmlFor={title} className={`collapsible ${complete ? "hidden":""}`}>Section Completed?</label>
      </div>

      {renderComments()}
    </div>
  )
}

export default Section;