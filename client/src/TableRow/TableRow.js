import React, { useEffect, useState } from 'react';
import './TableRow.scss';

export const TableRow = ({ ticker, color }) => {
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

    let style = { backgroundColor: "rgba(165,205,151, 30%)", color: "#275214" }
    let arrow = '↑';
    let percent;

    if (fieldName === 'change_percent') {
      ticker['change_percent'] = Math.abs(ticker[fieldName]);
      percent = '%'
    }

    if (ticker.change < 0) {
      style = { backgroundColor: "rgba(232,104,104, 30%)", color: '#B95353' }
      arrow = '↓'
    }

    return (
      <td className={cellClassName}>
        <div className='cell' style={style}>
        {`${arrow} ${ticker[fieldName]} ${percent ? percent : ''}`}
        </div>

      </td>
    );
  };

  return (
    <tr className='table-row'>
      <td>
        <div className='ticker' style={{ backgroundColor: color }}>{ticker.ticker}</div>
      </td>
      <td>{ticker.name}</td>
      <td>{ticker.exchange}</td>
      {renderCellWithAnimation('price')}
      {renderCellWithAnimation('change')}
      {renderCellWithAnimation('change_percent')}
      {renderCellWithAnimation('dividend')}
      {renderCellWithAnimation('yield')}
      <td></td>
    </tr>
  );
};
