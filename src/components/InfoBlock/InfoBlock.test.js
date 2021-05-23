import { render } from 'react-dom';
import React from 'react';
import InfoBlock from "./InfoBlock.jsx";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it(`Info Block is Rendered`, () => {
  const personMock = {
    id: 100,
    firstName: 'Aaa',
    lastName: 'BBB',
    address: {}
  }

  act(() => {
    render(
      <InfoBlock
        person={personMock}
      />,
      container
    );
  });
  expect(container.querySelectorAll("b")[0].textContent).toBe(personMock.firstName + ' ' + personMock.lastName);
});