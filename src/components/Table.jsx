import React, { useState, useEffect } from 'react';
import { TABLE_HEADINGS, PAGINATION_PAGE_SIZE, SORT_TYPES } from './../const.js';
import Paginator from './Paginator.jsx';
import InfoBlock from './InfoBlock.jsx';

const Table = (props) => {
  const [state, setState] = useState({
    currentPage: 1,
    filteredData: props.filteredData,
    sorted: `asc`,
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

  const headings = TABLE_HEADINGS.map((heading) => {
    const sortedDefault = state.selectedColumn === heading ? state.sorted : SORT_TYPES.DESC;
    return (
      <td key={heading}>
        <button className={sortedDefault} onClick={() => onSortDate(heading, sortedDefault)}>{heading}</button>
      </td>
    );
  });

  const getCurrentPagePersons = (data, pageSize, currentPage) => {
    const lastPerson = pageSize * currentPage;
    return data.slice(lastPerson - pageSize, lastPerson)
  };

  const content = (getCurrentPagePersons(props.filteredData, PAGINATION_PAGE_SIZE, state.currentPage)).map((person) => {
    return (
      <tr key={`${person.id}-${person.email}`} onClick={() => onRowClick(person)}>
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
      <table>
        <thead>
          <tr>{headings}</tr>
        </thead>
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
      {Object.keys(state.infoBlockPerson).length && <InfoBlock
        person={state.infoBlockPerson}
      />}
    </>
  );
};

export default Table;