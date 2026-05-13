import React from "react";

const ProductGrid = ({ products, onSelect, onAddToCart, searchKey, selectedCategory }) => {

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(searchKey.toLowerCase())
    )
    .filter(p =>
      selectedCategory ? p.categoryName === selectedCategory : true
    );

  return (
    <div className="product-section">

      {/* Product Grid */}
      <div className="product-grid">

        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">

            <div className="product-image-wrapper">
              <button className="product-image-btn" onClick={() => onSelect(product)}>
                <img src={product.imageURL} alt={product.name} />
              </button>
            </div>

            <div className="product-info">

              <div className="product-category">
                {product.categoryName}
              </div>

              <div className="product-name">
                {product.name}
              </div>

              <div className="product-price">
                KSh {product.price}
              </div>

              <div className="product-qty">
                Quantity {product.aggregate}
              </div>

            </div>

            <button
              className="add-to-cart"
              onClick={() => onAddToCart(product)}
            >
              ADD TO CART
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ProductGrid;