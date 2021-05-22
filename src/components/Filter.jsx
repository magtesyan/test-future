import React from 'react';

const Filter = (props) => {
  return (
    <>
      <input type="text" onChange={(evt) => {props.onFilterChange(evt.target.value)}} />
    </>
  );
};

export default Filter;