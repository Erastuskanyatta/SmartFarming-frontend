import React from "react";
import SignedImage from "../../shared/SignedImage";

const ProductGrid = ({ products, onSelect, searchKey, selectedCategory }) => {
  const filteredProducts = products
    .filter(p => p.productName.toLowerCase().includes(searchKey.toLowerCase()))
    .filter(p => selectedCategory ? p.category.categoryName === selectedCategory : true);

  return (
    <div className="product-section">
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.productId} className="product-card">

            <div className="product-image-wrapper">
              <button className="product-image-btn" onClick={() => onSelect(product)}>
                <SignedImage
                  fileId={product.productFile?.[0]?.fileId}
                  alt={product.productName}
                  fallback={<div className="product-img-placeholder">{product.category.categoryName}</div>}
                />
              </button>
            </div>

            <div className="product-info">
              <div className="product-category">{product.category.categoryName}</div>
              <div className="product-name">{product.productName}</div>
              <div className="product-price">KSh {product.price.toLocaleString()}</div>
              <div className="product-qty">Qty: {product.stockQuantity}</div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
