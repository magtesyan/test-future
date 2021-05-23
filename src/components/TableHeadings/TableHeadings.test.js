import React from 'react';
import {Router} from "react-router-dom";
import history from "../../history.js";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TableHeadings from './TableHeadings.jsx';

test('Headings Sorting Callback is Working', () => {
  const onSortDate = jest.fn();
  render(
    <Router
      history={history}
    >
      <TableHeadings onSortDate={onSortDate} />
    </Router>
  );
  const heading = screen.getByText('id');
  userEvent.click(heading);
  expect(onSortDate).toHaveBeenCalledTimes(1);
});