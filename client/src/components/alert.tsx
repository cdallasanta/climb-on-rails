import React from 'react'

type AlertProps = {
  messages: string[];
  type: "alert-success" | "alert-danger" | "alert-warning" | "alert-info";
}

const Alert = ({messages, type}: AlertProps) => {
  const renderMessages = () => {
    return messages.map((message: string) => {
      return <li>{message}</li>
    })
  }

  return (
    <div className={type}>
      <ul>
        {renderMessages()}
      </ul>
    </div>
  )
}

export default Alert;