import React from 'react';

const Alert = ({messages, type}) => {
  renderMessages = () => {
    return messages.map(message =>{
      return <li>{message}</li>
    });
  }

  return(
    <div className={type}>
      <ul>
        {renderMessages()}
      </ul>
    </div>
  )
};

export default Alert;