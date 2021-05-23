import React from 'react';
import { TABLE_HEADINGS, SORT_TYPES } from './../const.js';

const TableHeadings = (props) => {
  const headings = TABLE_HEADINGS.map((heading) => {
    const sortedDefault = props.selectedColumn === heading ? props.sorted : SORT_TYPES.DESC;
    return (
      <td key={heading}>
        <button className={sortedDefault} onClick={() => props.onSortDate(heading, sortedDefault)}>{heading}</button>
      </td>
    );
  });

  return (
    <thead>
      <tr>
        {headings}
      </tr>
    </thead>
  );
};

export default TableHeadings;