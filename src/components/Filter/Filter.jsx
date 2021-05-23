import React, { useRef } from 'react';
import classes from './Filter.module.css';

const Filter = (props) => {
  const inputFind = useRef(null);

  return (
    <div className={classes.div}>
      <input ref={inputFind} type="text" />
      <button className={classes.button} onClick={() => {props.onFilterChange(inputFind.current.value)}}>FIND</button>
    </div>
  );
};

export default Filter;