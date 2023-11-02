import React, { useEffect, useState } from 'react';
import './TableRow.scss';

export const TableRow = ({ ticker }) => {
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    const fieldsToCheck = ['price', 'change', 'change_percent', 'dividend', 'yield'];

    const changes = {};
    fieldsToCheck.forEach((field) => {
      if (ticker[field] !== changedFields[field]) {
        changes[field] = true;
      }
    });

    setChangedFields(changes);

    setTimeout(() => {
      setChangedFields({});
    }, 500);
  }, [ticker]);

  const renderCellWithAnimation = (fieldName) => {
    const isChanged = changedFields[fieldName];
    const cellClassName = isChanged ? 'animated' : '';

    return (
      <td className={cellClassName}>{ticker[fieldName]}</td>
    );
  };

  return (
    <tr className='table-row'>
      <td>
        <div className='ticker'>{ticker.ticker}</div>
      </td>
      <td>{ticker.name}</td>
      <td>{ticker.exchange}</td>
      {renderCellWithAnimation('price')}
      {renderCellWithAnimation('change')}
      {renderCellWithAnimation('change_percent')}
      {renderCellWithAnimation('dividend')}
      {renderCellWithAnimation('yield')}
    </tr>
  );
};
