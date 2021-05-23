import React, { useState, useEffect } from 'react';
import { PAGINATION_PAGE_SIZE, SORT_TYPES } from '../../const.js';
import Paginator from '../Paginator/Paginator.jsx';
import InfoBlock from '../InfoBlock.jsx';
import TableHeadings from '../TableHeadings/TableHeadings.jsx';
import classes from './Table.module.css';

const Table = (props) => {
  const [state, setState] = useState({
    currentPage: 1,
    filteredData: props.filteredData,
    sorted: SORT_TYPES.ASC,
    selectedColumn: null,
    infoBlockPerson: {},
  });

  useEffect(() => {
    setState({
      ...state,
      filteredData: props.filteredData,
    })},
  [props.filteredData]);

  const totalPersonsCount = state.filteredData.length;

  const onPageChanged = (page) => setState({
    ...state,
    currentPage: page,
  });

  const onSortDate = (column, sortedDefault) => {
    const sortedData = sortedDefault === SORT_TYPES.ASC ? SORT_TYPES.DESC : SORT_TYPES.ASC;
    const sortParameter = sortedData === SORT_TYPES.ASC ? 1 : -1;
    setState({
      ...state,
      filteredData: state.filteredData.sort((personA, personB) => personA[column] > personB[column] ? sortParameter : -sortParameter),
      sorted: sortedData,
      selectedColumn: column,
    });
  };

  const onRowClick = (person) => {
    setState({
      ...state,
      infoBlockPerson: person,
    });
  }

  const getCurrentPagePersons = (data, pageSize, currentPage) => {
    const lastPerson = pageSize * currentPage;
    return data.slice(lastPerson - pageSize, lastPerson)
  };

  const content = (getCurrentPagePersons(props.filteredData, PAGINATION_PAGE_SIZE, state.currentPage)).map((person) => {
    return (
      <tr key={`${person.id}-${person.email}-${Math.random()}`} onClick={() => onRowClick(person)}>
        <td>{person.id}</td>
        <td>{person.firstName}</td>
        <td>{person.lastName}</td>
        <td>{person.email}</td>
        <td>{person.phone}</td>
      </tr>
    );
  });


  return (
    <>
      <table className={classes.table}>
        <TableHeadings
          onSortDate={onSortDate}
          selectedColumn={state.selectedColumn}
          sorted={state.sorted}
        />
        <tbody>
          {content}
        </tbody>
      </table>
      <Paginator
        currentPage={state.currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalPersonsCount}
        pageSize={PAGINATION_PAGE_SIZE}
      />
      {Object.keys(state.infoBlockPerson).length !== 0 && 
      <InfoBlock
        person={state.infoBlockPerson}
      />}
    </>
  );
};

export default Table;