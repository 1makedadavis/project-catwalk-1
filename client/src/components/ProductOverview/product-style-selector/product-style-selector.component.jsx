import React, { useState, useContext, useEffect, Fragment } from 'react';
import ProductContext from '../../../context/products/ProductContext';

import CheckMark from '../../../../assets/checkmark.svg';

import './product-style-selector.styles.scss';

const ProductStyleSelector = () => {
  const { productStyles : { results }, getCurrentStyle } = useContext(ProductContext);
  const [selected, setSelected] = useState({});

  const handleClick = (e) => {
    console.log("NAME", e.target.name);
    getCurrentStyle(e.target.name);
    setSelected({ id: e.target.name });
  }

  return (
    <div className="product-style-container">
      {results && results.map((style, i, key) => (
        <div className="product-style-icon-container" key={style.id}>
          {!selected.id && i === 0 ?
          <>
          <img src={CheckMark} className="checkmark active" />
          <img className="product-style-icon" src={style.photos[0].thumbnail_url} name={style.id} onClick={handleClick}/>
          </>
          :
          <>
            <img src={CheckMark} className={selected.id == style.id ? "checkmark active" : "checkmark"}/>
            <img className="product-style-icon" src={style.photos[0].thumbnail_url} name={style.id} onClick={handleClick}/>
          </>
          }
        </div>
      ))}
    </div>
  )
}

export default ProductStyleSelector