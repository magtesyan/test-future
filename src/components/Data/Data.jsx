import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../api.js';
import { TABLE_HEADINGS } from '../../const.js';
import history from "../../history";
import Table from '../Table/Table.jsx';
import preloader from './../../assets/preloader.gif';
import AddRowBlock from '../AddRowBlock/AddRowBlock.jsx';
import Filter from '../Filter/Filter.jsx';
import classes from './Data.module.css';

const Data = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    data: {},
    filteredData: {},
    addRowBlock: false,
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

  const onAddRowBtnClicked = () => {
    setState({
      ...state,
      addRowBlock: !state.addRowBlock,
    });
  }

  const onRowAdd = (row) => {
    const dataCopy = state.data.slice();
    dataCopy.unshift(row);
    setState({
      ...state,
      data: dataCopy,
      filteredData: dataCopy
    });
  }

  
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
        <button className={classes.button} onClick={() => onAddRowBtnClicked()}>Add Row Form</button>
      </div>
      {state.addRowBlock && <AddRowBlock onRowAdd={onRowAdd} /> }
      <Filter onFilterChange={onFilterChange} />
      {state.isLoading && <img className={classes.img} src={preloader} alt="preloader" />}
      {!state.isLoading && state.data && <Table filteredData={state.filteredData} />}
      {!state.data && history.push('/')}
    </div>
  );
};

export default Data;