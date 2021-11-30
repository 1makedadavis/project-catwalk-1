import React, { useContext, useState, useEffect, useRef } from 'react';
import ProductContext from '../../../context/products/ProductContext';

import leftArrow from '../../../../assets/backArrow.svg';
import rightArrow from '../../../../assets/forwardArrow.svg';
import upArrow from '../../../../assets/upArrow.svg';
import downArrow from '../../../../assets/downArrow.svg';
import expandIcon from '../../../../assets/expand.svg';

import './product-expanded-view.styles.scss';

const ProductExpandedView = ({ expandView }) => {
  const productContext = useContext(ProductContext);
  const { currentStyle } = productContext;
  const [page, setPage] = useState(0);
  const [height, setHeight] = useState(0);
  const [zoom, setZoom] = useState();
  const [zoomState, setZoomState] = useState(false);
  const ref = useRef(null);


  const handleClick = (e) => {
    const currentIndex = Number(e.target.name);
    setPage(currentIndex);
  }

  const handlePageChange = (e) => {
    if (e.target.name === "back") {
      if (page === 0) {
        setPage(currentStyle.photos.length - 1)
      } else {
        setPage(page - 1)
      }
    } else {
      if (page === currentStyle.photos.length - 1) {
        setPage(0)
      } else {
        setPage(page + 1)
      }
    }
  }

  const handleLoad = () => {
    if (ref.current.clientHeight) {
      setHeight(ref.current.clientHeight)
    }
  }

  const handleScroll = (height) => {
    ref.current.scrollTop -= height
  }

  const handleZoom = (e, photoUrl) => {
    setZoomState(!zoomState);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;

    setZoom({
      backgroundImage: `url(${photoUrl})`,
      backgroundPosition: `${x}% ${y}%`,
    })
  }

  const handleMouseMove = (e, photoUrl) => {
   const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setZoom({
      backgroundImage: `url(${photoUrl})`,
      backgroundPosition: `${x}% ${y}%`
    })
  }

    if (!currentStyle.photos) {
      return <p>Loading...</p>
    } else {
    return (
      <div className="expanded-view-container">
          <div className="expanded-view-gallery-main">
          <img src={expandIcon} className="expand-icon" style={{ height: '25px', width: '25px' }} onClick={expandView}/>
                  <img src={leftArrow} style={{ height: '30px', width: '30px'}} className={!zoomState ? "expanded-view-left-arrow" : "expanded-view-left-arrow active"} onClick={handlePageChange} name="back" value={page}/>
                    {currentStyle.photos.map((photo, index) => {
                      if (page === index) {
                        return (
                          <figure onClick={(e) => handleZoom(e, photo.photo_url)} style={!zoom ? { backgroundImage: `url(${photo.photo_url})`, backgroundPosition: '0% 0%'} : zoom} onMouseMove={(e) => handleMouseMove(e, photo.photo_url)}>
                            <img className={!zoomState ? "expanded-view-main" : "expanded-view-main active"} src={photo.photo_url} />
                          </figure>
                        )
                      }
                    })}
                    <img src={rightArrow} style={{ height: '30px', width: '30px'}} className={!zoomState ?"expanded-view-right-arrow" : "expanded-view-right-arrow active"} onClick={handlePageChange} name="front" value={page}/>
          </div>

        <div className="expanded-view-thumbnail-container" >
            {currentStyle.photos && currentStyle.photos.map((photo, index, key) => (
              <>
                { !zoomState ? <img src={photo.thumbnail_url} className={ page === index ? "expanded-view-thumbnail active" : "expanded-view-thumbnail" } onClick={handleClick} name={index} /> : null}
              </>
            ))}
        </div>

      </div>
    )};
}

export default ProductExpandedView