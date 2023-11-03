import React, { useEffect, useState } from 'react';
import './TableRow.scss';
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from '../utils/favorites';

import starRegular from "../img/star-regular.svg";
import starSolid from "../img/star-solid.svg";

export const TableRow = ({ ticker, color }) => {
  const [changedFields, setChangedFields] = useState({});
  const [isToggled, setIsToggled] = useState(isFavorite(ticker.ticker));

  const handleToggleFavorite = () => {
    if (isToggled) {
      removeFromFavorites(ticker.ticker);
    } else {
      addToFavorites(ticker.ticker);
    }
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    const fieldsToCheck = [
      'price',
      'change',
      'change_percent',
      'dividend',
      'yield',
    ];

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
  }, []);

  const renderCellWithAnimation = (fieldName) => {
    const isChanged = changedFields[fieldName];
    const cellClassName = isChanged ? 'animated' : '';

    let style = { backgroundColor: 'rgba(165,205,151, 50%)', color: '#274E13' };
    let arrow = '↑';
    let percent;

    if (fieldName === 'change_percent') {
      ticker['change_percent'] = Math.abs(ticker[fieldName]);
      percent = '%';
    }

    if (ticker.change < 0) {
      style = { backgroundColor: 'rgba(232,104,104, 50%)', color: '#7A0000' };
      arrow = '↓';
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
    <tr className="ticker-row">
      <td>
        <div className='ticker' style={{ backgroundColor: color }}>
          {ticker.ticker}
        </div>
      </td>
      <td>{ticker.name}</td>
      <td>{ticker.exchange}</td>
      {renderCellWithAnimation('price')}
      {renderCellWithAnimation('change')}
      {renderCellWithAnimation('change_percent')}
      {renderCellWithAnimation('dividend')}
      {renderCellWithAnimation('yield')}
      <td>
        <button className='favorites' onClick={handleToggleFavorite}>
          {isToggled ? (
            <img className='fav' src={starSolid} alt="Favorites" />
          ) : (
            <img className='fav' src={starRegular} alt="not-Favorites" />
          )}
        </button>
      </td>
    </tr>
  );
};
