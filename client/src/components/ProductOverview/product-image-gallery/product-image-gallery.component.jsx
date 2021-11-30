import React, { useContext, useState, useEffect, useRef } from 'react';
import ProductContext from '../../../context/products/ProductContext';

import leftArrow from '../../../../assets/backArrow.svg';
import rightArrow from '../../../../assets/forwardArrow.svg';
import upArrow from '../../../../assets/upArrow.svg';
import downArrow from '../../../../assets/downArrow.svg';

import './product-image-gallery.styles.scss';

const ProductImageGallery = ({ expandView }) => {
  const productContext = useContext(ProductContext);
  const { currentStyle } = productContext;
  const [page, setPage] = useState(0);
  const [height, setHeight] = useState(0);
  const [displayUpArrow, setDisplayUpArrow] = useState(false)
  const [displayDownArrow, setDisplayDownArrow] = useState(true)
  const ref = useRef(null);

  const handleClick = (e) => {
    const currentIndex = Number(e.target.name);
    setPage(currentIndex);
  }

  const handlePageChange = (e) => {
    if (e.target.name === "back") {
      if (page === 0) {
        setPage(currentStyle && currentStyle.photos.length - 1)
      } else {
        setPage(page - 1)
      }
    } else {
      if(currentStyle && currentStyle.photos){
      if (page === currentStyle.photos.length - 1) {
        setPage(0)
      } else {
        setPage(page + 1)
      }
    }
    }
  }

   const handleLoad = () => {
     var element = ref.current;
    if (ref.current.clientHeight) {
      setHeight(ref.current.clientHeight)
      element.addEventListener('scroll', () => {
        setDisplayUpArrow(element.scrollTop > 0);
        setDisplayDownArrow(element.scrollTop < element.scrollHeight - element.clientHeight);
      });
    }
  }

  const handleScroll = (height) => {
    ref.current.scrollTop -= height
  }

    if (currentStyle && !currentStyle.photos) {
      return <p>Loading...</p>
    } else {
    return (
      <div className="product-image-gallery-container">

        <div className="product-image-gallery-main">
            <img src={leftArrow} style={{ height: '30px', width: '30px'}} className="left-arrow" onClick={handlePageChange} name="back" value={page} alt="left-arrow"/>

            {currentStyle && currentStyle.photos.map((photo, index) => {
              if (page === index) {
                return (
                  <img className="image-gallery-main" alt="image-gallery-main" src={photo.photo_url} onClick={expandView}/>
                )
              }
            })}
            <img src={rightArrow} className="right-arrow" onClick={handlePageChange} name="front" style={{ height: '30px', width: '30px'}} value={page} alt="right-arrow"/>
        </div>

        <div className="product-image-gallery-thumbnail-container" >
          <img src={upArrow} alt="up-arrow" className={displayUpArrow ? "up-arrow" : "up-arrow active"} style={{ height: '25px', width: '25px'}} onClick={() => handleScroll(height/2)}/>

          <div className="product-image-gallery-thumbnail-display" ref={ref} onLoad={handleLoad}>
            {currentStyle && currentStyle.photos && currentStyle.photos.map((photo, index, key) => (
              <div key={index}>
                <img src={photo.thumbnail_url} className={ page === index ? "image-gallery-thumbnail active" : "image-gallery-thumbnail" } onClick={handleClick} name={index} />
              </div>
            ))}
          </div>

          <img src={downArrow} alt="down-arrow" className={displayDownArrow ? "down-arrow" : "down-arrow active"}  style={{ height: '25px', width: '25px'}} onClick={() => handleScroll(-1 * (height/2))}/>
        </div>

      </div>
    )};
}

export default ProductImageGallery