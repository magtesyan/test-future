import React from 'react';
import { Link } from 'react-router-dom';
import classes from './LoadButton.module.css';

const LoadButton = (props) => {
  return (
    <div>
      <Link className={classes.a} to={`/${props.name}`}>Load {props.name} data</Link>
    </div>
  );
};

export default LoadButton;