import React from 'react';
import {Router} from "react-router-dom";
import history from "../../history.js";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './Filter.jsx';

test('Add Row Btn Click', () => {
  const onFilterChange = jest.fn();
  render(
    <Router
      history={history}
    >
      <Filter onFilterChange={onFilterChange} />
    </Router>
  );
  const findBtn = screen.getByText('FIND');
  userEvent.click(findBtn);
  expect(onFilterChange).toHaveBeenCalledTimes(1);
});