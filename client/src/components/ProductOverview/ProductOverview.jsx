import React, { useState, useContext, lazy, Suspense } from 'react';
import ProductContext from '../../context/products/ProductContext';
import '../../styles/sections/_products.scss';

import ProductStarRating from './product-star-rating/product-star-rating.component.jsx';
import ProductImageGallery from './product-image-gallery/product-image-gallery.component.jsx';
import ProductStyleSelector from './product-style-selector/product-style-selector.component.jsx'
import ProductDropdown from './product-dropdown/product-dropdown.component.jsx';
import ProductSocialMedia from './product-social-media/product-social-media.component.jsx';
import ProductExpandedView from './product-expanded-view/product-expanded-view.component.jsx';
import ProductNavbar from './product-navbar/product-navbar.component.jsx';

import GreenCheckmark from '../../../assets/greenCheckmark.svg';

const ProductImageGalleryComponent = lazy(() => import('./product-image-gallery/product-image-gallery.component.jsx'))
const ProductExpandedViewComponent = lazy(() => import('./product-expanded-view/product-expanded-view.component.jsx'))

import './ProductOverview.styles.scss';



const ProductOverview = () => {
  const productContext = useContext(ProductContext);
  const { productInfo, currentStyle } = productContext;
  const [expandView, setExpandView] = useState(false);

  const handleExpandView = () => {
    setExpandView(!expandView)
  }

  return (
    <div className="product-overview-background">
    <div className="product-overview">
      <ProductNavbar />
      <div className="product-overview-message">
        <span>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE /DISCOUNT <b>OFFER</b> -- <u>NEW PRODUCT HIGHLIGHT</u></span>
      </div>

      <div className="product-overview-container">
        <div className={!expandView ? "product-overview-container-left" : "product-overview-container-left active"}>
          {!expandView ?
          <Suspense fallback={<p>Loading...</p>}>
              <ProductImageGalleryComponent expandView={handleExpandView}/>
                {/* <ProductImageGallery expandView={handleExpandView}/>  */}
          </Suspense>
          :
          <Suspense fallback={<p>Loading...</p>}>
              <ProductExpandedViewComponent expandView={handleExpandView} />
              {/* <ProductExpandedView expandView={handleExpandView}/> */}
          </Suspense>
          }
        </div>

        <div className={!expandView ? "product-overview-container-right" : "product-overview-container-right active"}>
          <ProductStarRating />
          <div className="product-overview-details">
            <h4 className="product-style-title">{productInfo.category}</h4>
            <h1 className="product-name">{productInfo.name}</h1>

            {currentStyle && currentStyle.sales_price === 'null'? <h3>$ {currentStyle.original_price}</h3> :currentStyle && currentStyle.sales_price !== 'null'? <div> <strike style={{ color: "red"}}>$ {currentStyle.original_price}</strike><h3>$ {currentStyle.sales_price}</h3></div>: <></>}
          </div>

          <h4>Select Style <span style={{ fontWeight: '20'}}>&gt; {(currentStyle && currentStyle.name) && currentStyle.name}</span></h4>
          <ProductStyleSelector />
          <ProductDropdown />
          <ProductSocialMedia />
        </div>
      </div>

      <div className="product-overview-description">
          <div className="product-overview-description-left">
            <h3>{productInfo.slogan}</h3>
            <p className="product-overview-description-left-body">{productInfo.description}</p>
          </div>
          <hr className="product-overview-description-divider" />
          <div className="product-overview-description-right">
            {productInfo.features && productInfo.features.map(({ feature, value }) => (
              <div className="product-overview-description-feature">
                  <img src={GreenCheckmark} alt="green-checkmark" style={{ height: '25px', width: '25px', marginRight: '10px' }}/>
                  <h5>{feature}: {value}</h5>
              </div>
            ))}
           </div>
      </div>
    </div>
    </div>
  );
};

export default ProductOverview;