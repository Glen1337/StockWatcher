import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
    <div>
      <button className="back button tiny left" onClick={browserHistory.goBack}>Back</button>
    </div>
  )
}

export default BackButton;
