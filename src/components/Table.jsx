import React, { useState } from 'react';
import { TABLE_HEADINGS, PAGINATION_PAGE_SIZE } from './../const.js';
import Paginator from './Paginator.jsx';

const Table = (props) => {
  const [state, setState] = useState({
    currentPage: 1,
  });

  const totalPersonsCount = props.data.length;

  const onPageChanged = (page) => setState({
    ...state,
    currentPage: page,
  });

  const headings = TABLE_HEADINGS.map((heading) => {
    return (
      <td key={heading}>{heading}</td>
    );
  });

  const getCurrentPagePersons = (data, pageSize, currentPage) => {
    const lastPerson = pageSize * currentPage;
    return data.slice(lastPerson - pageSize, lastPerson)
  }

  const content = (getCurrentPagePersons(props.data, PAGINATION_PAGE_SIZE, state.currentPage)).map((person) => {
    return (
      <tr key={`${person.id}-${person.email}`}>
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
    </>
  );
};

export default Table;