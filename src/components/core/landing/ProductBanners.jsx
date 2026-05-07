import React from "react";

import advert1 from '../../../asset/images/Bitmap.png';
import advert2 from '../../../asset/images/Group2.png';

const ProductBanners = () => {
  return (
    <div className="product-banners">

      <img
        src={advert1}
        alt="Banner 1"
        className="banner-main"
      />

      <img
        src={advert2}
        alt="Banner 2"
        className="banner-side"
      />

    </div>
  );
};

export default ProductBanners;