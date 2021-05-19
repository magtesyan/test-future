import React from 'react';
import { Link } from "react-router-dom";

const LoadButton = (props) => {
  return (
    <div>
      <Link to="/">Load {props.name} data</Link>
    </div>
  )
}

export default LoadButton;