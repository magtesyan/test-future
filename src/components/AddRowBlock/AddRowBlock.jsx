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
    if (inputPhone.current.value.length > 0 &&
      inputId.current.value.length > 0 &&
      inputLastName.current.value.length > 0 &&
      inputFirsName.current.value.length > 0 &&
      inputEmail.current.value.length > 0) {
        setState({
          ...state,
          error: ``, 
        });
      } else {
        setState({
          ...state,
          error: `Fill the form`, 
        });
      }
  };

  const validateAll = () => {
    return validateNumberField(inputId.current.value, `id`) +
    validateLetterField(inputFirsName.current.value, `inputFirsName`) +
    validateLetterField(inputLastName.current.value, `inputLastName`) +
    validateEmailField(inputEmail.current.value, `inputEmail`) +
    validatePhoneField(inputPhone.current.value, `inputPhone`);
  };

  const validateNumberField = (value, fieldName) => {
    return !value || value.match(/^[0-9]+$/) === null ? `The field ${fieldName} should contain only digits | ` : ``;
  };

  const validateLetterField = (value, fieldName) => {
    return !value || value.match(/^[a-zA-z]+$/) === null ? `The field ${fieldName} should contain only letters | ` : ``;
  };

  const validateEmailField = (value, fieldName) => {
    return !value || value.match(/\S+@\S+\.\S+/) === null ? `The field ${fieldName} should be email format | ` : ``;
  };

  const validatePhoneField = (value, fieldName) => {
    return !value || value.length !== 13 ? `The field ${fieldName} should be phone format | ` : ``;
  };

  const onPhoneChange = (value) => {
    const parsedValue = parseInt(value.replace(/\D+/g,""))
    const numbersFromValue = parsedValue ? parsedValue.toString() : ``;
    inputPhone.current.value = value.length > 0 ? `(${numbersFromValue.slice(0,3)}` : ``;
    inputPhone.current.value += value.length > 4 ? `)${numbersFromValue.slice(3,6)}` : ``;
    inputPhone.current.value += value.length > 8 ? `-${numbersFromValue.slice(6)}` : ``;
    inputPhone.current.value = inputPhone.current.value.length > 13 ? inputPhone.current.value.slice(0,13) : inputPhone.current.value;
    validateEmptyField();
  };

  const onAddBtnClick = () => {
    const validationResult = validateAll();
    if (validationResult !== ``) {
      setState({
          ...state,
          error: validationResult
        });
    } else {
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
      <table className={classes.table}>
        <TableHeadings
          onSortDate={() => {}}
          selectedColumn={``}
          sorted={false}
        />
        <tbody>
          <tr>
            <td><input ref={inputId} onChange={() => validateEmptyField()} type="text" /></td>
            <td><input ref={inputFirsName} onChange={() => validateEmptyField()} type="text" /></td>
            <td><input ref={inputLastName} onChange={() => validateEmptyField()} type="text" /></td>
            <td><input ref={inputEmail} onChange={() => validateEmptyField()} type="text" /></td>
            <td><input ref={inputPhone} onChange={() => onPhoneChange(inputPhone.current.value)} type="text" /></td>
          </tr>
        </tbody>
      </table>
      <div className={classes.error}>{state.error}</div>
      {state.error === `` && <button className={`${classes.button} ${state.addButton}`}
        onClick={() => onAddBtnClick()}>Add Row</button> }
    </>
  );
};

export default AddRowBlock;