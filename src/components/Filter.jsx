import React, { useRef } from 'react';

const Filter = (props) => {
  const inputFind = useRef(null);

  return (
    <>
      <input ref={inputFind} type="text" />
      <button onClick={() => {props.onFilterChange(inputFind.current.value)}}>Find</button>
    </>
  );
};

export default Filter;