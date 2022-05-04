import React from 'react'

const [disable, setDisable] = React.useState(false)

const DisableButton = () => {
  return (
    <div>
      <button disabled={disable} onClick={() => setDisable(true)}>
        Click to Disable!
      </button>
    </div>
  )
}

export default DisableButton
