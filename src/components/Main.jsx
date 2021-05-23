import React from 'react';
import Button from './LoadButton/LoadButton.jsx';
import { DATA_TYPES } from './../const.js';

const Main =() => {
  const buttons = DATA_TYPES.map((dataType) => { 
    return (
      <Button
        key={`button_${dataType}`}
        name={dataType}
      />
    );
  });

  return (
    <>
      {buttons}
    </>
  );
};

export default Main;