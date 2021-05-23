import React from 'react';
import classes from './InfoBlock.module.css';

const InfoBlock = (props) => {
  return (
    <div className={classes.div}>
      <div>Выбран пользователь: <b>{props.person.firstName} {props.person.lastName}</b></div>
      {props.person.description && <textarea className={classes.textarea} value={props.person.description} readOnly />}
      {props.person.address && 
        <div>
          <div>Адрес проживания: <b>{props.person.address.streetAddress}</b></div>
          <div>Город: <b>{props.person.address.city}</b></div>
          <div>Провинция/штат: <b>{props.person.address.state}</b></div>
          <div>Индекс: <b>{props.person.address.zip}</b></div>
        </div>
      }
    </div>
  );
};

export default InfoBlock;