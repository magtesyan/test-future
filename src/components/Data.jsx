import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from './../api.js';
import { TABLE_HEADINGS } from './../const.js';
import Table from './Table.jsx';
import preloader from './../assets/preloader.gif';
import Filter from './Filter.jsx';

const Data = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    data: {},
    filteredData: {},
  });

  const onFilterChange = (text) => {
    const newData = state.data.filter((person) => {
      const personValues = TABLE_HEADINGS.map((column) => person[column]);
      const findStr = (str) => {
        return str.toString().indexOf(text) !== -1;
      }
      return personValues.some(findStr)
    });

    setState({
      ...state,
      filteredData: newData,
    });
  };

  
  state.isLoading && getData(props.dataType)
  .then((res) => {
    setState({
      isLoding: false,
      data: res,
      filteredData: res
    });
  });

  return (
    <div>
      <div>
        <Link to="/">Main</Link>
      </div>
      <Filter onFilterChange={onFilterChange} />
      {state.isLoading && <img src={preloader} alt="preloader" />}
      {!state.isLoading && <Table filteredData={state.filteredData} />}
    </div>
  );
};

export default Data;