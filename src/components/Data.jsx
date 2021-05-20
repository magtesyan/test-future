import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from './../api.js';
import Table from './Table.jsx';
import preloader from './../assets/preloader.gif';

const Data = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    data: {}
  });

  state.isLoading && getData(props.dataType)
  .then((res) => {
    setState({
      isLoding: false,
      data: res
    })
  });

  return (
    <div>
      <div>
        <Link to="/">Main</Link>
      </div>
      {state.isLoading && <img src={preloader} alt="preloader" />}
      {!state.isLoading && <Table data={state.data} />}
    </div>
  );
};

export default Data;