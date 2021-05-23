import React, { useState, useRef } from 'react';
import TableHeadings from '../TableHeadings/TableHeadings';
import classes from './AddRowBlock.module.css';

const AddRowBlock = (props) => {
  const inputId = useRef(null);
  const inputFirsName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPhone = useRef(null);

  const [state, setState] = useState({
    error: `Fill the form`
  });

  const validateEmptyField = () => {
    if (inputPhone.current.value.length === 13 &&
      inputId.current.value.length > 0 &&
      inputLastName.current.value.length > 0 &&
      inputFirsName.current.value.length > 0 &&
      inputEmail.current.value.length > 0) {
      return true;
      } 
  };

  const validateNumberField = (value, fieldName) => {
    setState({
      ...state,
      error: !value || value.match(/^[0-9]+$/) === null ? `The field ${fieldName} shoud contain only digits` : ``, 
    });
    validateEmptyField();
  };

  const validateLetterField = (value, fieldName) => {
    setState({
      ...state,
      error: !value || value.match(/^[a-zA-z]+$/) === null ? `The field ${fieldName} shoud contain only letters` : ``
    });
    validateEmptyField();
  };

  const validateEmailField = (value, fieldName) => {
    setState({
      ...state,
      error: !value || value.match(/\S+@\S+\.\S+/) === null ? `The field ${fieldName} shoud be email format` : ``
    });
    validateEmptyField();
  };

  const validatePhoneField = (value, fieldName) => {
    setState({
      ...state,
      error: !value || value.length !== 13 ? `The field ${fieldName} shoud be phone format` : ``
    });
    validateEmptyField();
  };

  const onPhoneChange = (value) => {
    const parsedValue = parseInt(value.replace(/\D+/g,""))
    const numbersFromValue = parsedValue ? parsedValue.toString() : ``;
    inputPhone.current.value = value.length > 0 ? `(${numbersFromValue.slice(0,3)}` : ``;
    inputPhone.current.value += value.length > 4 ? `)${numbersFromValue.slice(3,6)}` : ``;
    inputPhone.current.value += value.length > 8 ? `-${numbersFromValue.slice(6)}` : ``;
    inputPhone.current.value = inputPhone.current.value.length > 13 ? inputPhone.current.value.slice(0,13) : inputPhone.current.value;
    validatePhoneField(inputPhone.current.value, `phone`);
  };

  const onAddBtnClick = () => {
    const newRow = {
      id: inputId.current.value,
      firstName: inputFirsName.current.value,
      lastName: inputLastName.current.value,
      email: inputEmail.current.value,
      phone: inputPhone.current.value
    };
    props.onRowAdd(newRow);
  };

  return (
    <>
      <table className={classes.table}>
        <TableHeadings
          onSortDate={() => {}}
          selectedColumn={``}
          sorted={false}
        />
        <tbody>
          <tr>
            <td><input ref={inputId} onChange={() => validateNumberField(inputId.current.value, `id`)} type="text" /></td>
            <td><input ref={inputFirsName} onChange={() => validateLetterField(inputFirsName.current.value, `inputFirsName`)} type="text" /></td>
            <td><input ref={inputLastName} onChange={() => validateLetterField(inputLastName.current.value, `inputLastName`)} type="text" /></td>
            <td><input ref={inputEmail} onChange={() => validateEmailField(inputEmail.current.value, `inputEmail`)} type="text" /></td>
            <td><input ref={inputPhone} onChange={() => onPhoneChange(inputPhone.current.value)} type="text" /></td>
          </tr>
        </tbody>
      </table>
      <div className={classes.error}>{state.error}</div>
      {state.error === `` && validateEmptyField() && <button className={`${classes.button} ${state.addButton}`}
        onClick={() => onAddBtnClick()}>Add Row</button> }
    </>
  );
};

export default AddRowBlock;