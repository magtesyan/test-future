import React, { useState, useRef } from 'react';
import TableHeadings from './TableHeadings';

const AddRowBlock = (props) => {
  const inputId = useRef(null);
  const inputFirsName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPhone = useRef(null);

  const [state, setState] = useState({
    error: ``,
  });

  const validateEmptyField = (value, fieldName) => {
    if (value === ``) {
      setState({
        ...state,
        error: `The field ${fieldName} is required`
      });
    }
  };

  const validateNumberField = (value, fieldName) => {
    validateEmptyField(value, fieldName);
    if (value && value.match(/^[0-9]+$/) === null) {
      setState({
        ...state,
        error: `The field ${fieldName} shoud contain only digits`
      });
    }
  };

  const validateLetterField = (value, fieldName) => {
    validateEmptyField(value, fieldName);
    if (value && value.match(/^[a-zA-z]+$/) === null) {
      setState({
        ...state,
        error: `The field ${fieldName} shoud contain only letters`
      });
    }
  };

  const validateEmailField = (value, fieldName) => {
    validateEmptyField(value, fieldName);
    if (value && value.match(/\S+@\S+\.\S+/) === null) {
      setState({
        ...state,
        error: `The field ${fieldName} shoud be email format`
      });
    }
  };

  const validatePhoneField = (value, fieldName) => {
    if (value.length !== 13) {
      setState({
        ...state,
        error: `The field ${fieldName} shoud be phone format`
      });
    }
  };

  const onPhoneChange = (value) => {
    const parsedValue = parseInt(value.replace(/\D+/g,""))
    const numbersFromValue = parsedValue ? parsedValue.toString() : ``;
    inputPhone.current.value = value.length > 0 ? `(${numbersFromValue.slice(0,3)}` : ``;
    inputPhone.current.value += value.length > 4 ? `)${numbersFromValue.slice(3,6)}` : ``;
    inputPhone.current.value += value.length > 8 ? `-${numbersFromValue.slice(6)}` : ``;
    inputPhone.current.value = inputPhone.current.value.length > 13 ? inputPhone.current.value.slice(0,13) : inputPhone.current.value;
  };

  const validateAllFields = (id, firstName, lastName, email, phone) => {
    setState({
      ...state,
      error: ``
    });
    validateNumberField(id, `id`);
    validateLetterField(firstName, `firstName`);
    validateLetterField(lastName, `lastName`);
    validateEmailField(email, `email`);
    validatePhoneField(phone, `phone`);
    if (state.error === ``) {
      const newRow = {
        id: inputId.current.value,
        firstName: inputFirsName.current.value,
        lastName: inputLastName.current.value,
        email: inputEmail.current.value,
        phone: inputPhone.current.value
      };
      props.onRowAdd(newRow);
    }
  };

  return (
    <>
      <table>
        <TableHeadings
          onSortDate={() => {}}
          selectedColumn={``}
          sorted={false}
        />
        <tbody>
          <tr>
            <td><input ref={inputId} type="text" /></td>
            <td><input ref={inputFirsName} type="text" /></td>
            <td><input ref={inputLastName} type="text" /></td>
            <td><input ref={inputEmail} type="text" /></td>
            <td><input ref={inputPhone} onChange={() => onPhoneChange(inputPhone.current.value)} type="text" /></td>
          </tr>
        </tbody>
      </table>
      <div>{state.error}</div>
      <button
        onClick={() => validateAllFields(
          inputId.current.value,
          inputFirsName.current.value,
          inputLastName.current.value,
          inputEmail.current.value,
          inputPhone.current.value
      )}>Add Row</button>
    </>
  );
};

export default AddRowBlock;