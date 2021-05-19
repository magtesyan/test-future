import React from 'react';
import Button from './LoadButton.jsx';
import { dataTypes } from '../const.js';

const Main =() => {
  const buttons = dataTypes.map((dataType) => { 
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
}

export default Main;