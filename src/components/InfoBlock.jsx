import React from 'react';

const InfoBlock = (props) => {
  return (
    <div>
      <div>Выбран пользователь: <b>{props.person.firstName} {props.person.lastName}</b></div>
      <textarea value={props.person.description} readOnly />
      <div>Адрес проживания: <b>{props.person.address.streetAddress}</b></div>
      <div>Город: <b>{props.person.address.city}</b></div>
      <div>Провинция/штат: <b>{props.person.address.state}</b></div>
      <div>Индекс: <b>{props.person.address.zip}</b></div>
    </div>
  );
};

export default InfoBlock;