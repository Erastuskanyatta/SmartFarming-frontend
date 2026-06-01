import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdStar, MdStarHalf, MdStarOutline, MdArrowBack, MdShoppingCart, MdLocalShipping, MdStorefront } from "react-icons/md";

import { useCart } from "../cart/CartContext";
import Navbar from "../../shared/navbar/Navbar";
import Footer from "../../shared/footer/Footer";
import ApiService from "../../../services/ApiService";
import SignedImage from "../../shared/SignedImage";

import "./ProductDetail.css";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<MdStar key={i} className="star filled" />);
    } else if (rating >= i - 0.5) {
      stars.push(<MdStarHalf key={i} className="star filled" />);
    } else {
      stars.push(<MdStarOutline key={i} className="star" />);
    }
  }
  return <span className="star-row">{stars}</span>;
};

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateQuantity, removeFromCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((p) => p.productId === productId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

    useEffect(() => {
    ApiService.getProducts()
      .then(res => {
        setProducts(res.data.content);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="pd-not-found"><p>Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <p>Product not found.</p>
        <button className="pd-back-btn" onClick={() => navigate("/landingpage")}>
          <MdArrowBack /> Back to products
        </button>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const sellerProducts = product.seller
    ? products.filter(p => p.seller === product.seller && p.productId !== product.productId).slice(0, 4)
    : [];

  const relatedProducts = products.filter(
    (p) => p.category.categoryName === product.category.categoryName && p.productId !== product.productId
  ).slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="pd-page">

      <div className="pd-topbar">
        <button className="pd-back-btn" onClick={() => navigate("/landingpage")}>
          <MdArrowBack size={18} /> Back
        </button>
        <span className="pd-breadcrumb">
          {product.category.categoryName} &rsaquo; {product.productName}
        </span>
      </div>

      <div className="pd-main">

        <div className="pd-image-section">
          <SignedImage fileId={product.productFile?.[0]?.fileId} alt={product.productName} className="pd-main-image" />
        </div>

        <div className="pd-info-section">

          <span className="pd-category-badge">{product.category.categoryName}</span>
          <h1 className="pd-title">{product.productName}</h1>

          <div className="pd-rating-row">
            <StarRating rating={product.rating ?? 0} />
            {product.rating
              ? <><span className="pd-rating-value">{product.rating}</span>
                  <span className="pd-review-count">({product.reviewCount ?? 0} ratings)</span></>
              : <span className="pd-review-count">No ratings yet</span>
            }
          </div>

          <div className="pd-price-row">
            <span className="pd-price">KSh {product.price.toLocaleString()}</span>
            <span className="pd-original-price">KSh {product.originalPrice.toLocaleString()}</span>
            <span className="pd-discount-badge">-{discount}%</span>
          </div>

          <div className="pd-stock">
            <span className={product.stockQuantity < 20 ? "pd-stock-low" : "pd-stock-ok"}>
              {product.stockQuantity < 20
                ? `Only ${product.stockQuantity} left`
                : `In Stock (${product.stockQuantity} units)`}
            </span>
          </div>

          {(() => {
            const cartQty = items.find((i) => i.product.productId === product.productId)?.quantity ?? 0;
            const displayQty = cartQty > 0 ? cartQty : quantity;

            const handleMinus = () => {
              if (cartQty > 1) updateQuantity(product.productId, cartQty - 1);
              else if (cartQty === 1) removeFromCart(product.productId);
              else setQuantity((q) => Math.max(1, q - 1));
            };

            const handlePlus = () => {
              if (cartQty > 0) addToCart(product, 1);
              else setQuantity((q) => Math.min(product.stockQuantity, q + 1));
            };

            return (
              <div className="pd-qty-row">
                <span className="pd-qty-label">Quantity:</span>
                <div className="pd-qty-control">
                  <button className="pd-qty-btn" onClick={handleMinus} disabled={displayQty <= 1 && cartQty === 0}>
                    -
                  </button>
                  <span className="pd-qty-value">{displayQty}</span>
                  <button className="pd-qty-btn" onClick={handlePlus} disabled={displayQty >= product.stockQuantity}>
                    +
                  </button>
                </div>
                {cartQty > 0 && (
                  <div className="pd-qty-added">{cartQty} item{cartQty > 1 ? "s" : ""} added</div>
                )}
              </div>
            );
          })()}

          <button className="pd-add-to-cart" onClick={handleAddToCart}>
            <MdShoppingCart size={18} /> ADD TO CART
          </button>

          <div className="pd-delivery-section">
            <p className="pd-delivery-title">
              <MdLocalShipping size={16} /> Delivery Options
            </p>
            {product.deliveryOptions?.length > 0
              ? product.deliveryOptions.map((opt, i) => (
                  <div key={i} className="pd-delivery-row">
                    <span className="pd-delivery-type">{opt.type}</span>
                    <span className="pd-delivery-price">KSh {opt.price}</span>
                  </div>
                ))
              : <p className="pd-delivery-row">Delivery information not available.</p>
            }
          </div>

          <div className="pd-seller-section">
            <MdStorefront size={16} />
            <span>Sold by <strong>{product.seller ?? "Unknown Seller"}</strong></span>
          </div>

        </div>
      </div>

      <div className="pd-tabs-section">
        <div className="pd-tabs">
          {["description", "specifications", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`pd-tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="pd-tab-content">
          {activeTab === "description" && (
            <p className="pd-description">{product.description}</p>
          )}
          {activeTab === "reviews" && (
            <div className="pd-reviews-placeholder">
              {product.rating
                ? <>
                    <StarRating rating={product.rating} />
                    <p>{product.rating} out of 5 — {product.reviewCount ?? 0} verified ratings</p>
                  </>
                : <StarRating rating={0} />
              }
              <p className="pd-no-reviews">No written reviews yet.</p>
            </div>
          )}
          {activeTab === "specifications" && (
            product.specifications?.length > 0 ? (
              <table className="pd-specs-table">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i}>
                      <td className="pd-spec-label">{spec.name}</td>
                      <td className="pd-spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No specifications available.</p>
            )
          )}
        </div>
      </div>

      {sellerProducts.length > 0 && (
        <div className="pd-related-section">
          <h3 className="pd-related-title">More items from {product.seller}</h3>
          <div className="pd-related-grid">
            {sellerProducts.map((p) => (
              <div
                key={p.productId}
                className="pd-related-card"
                onClick={() => navigate(`/product/${p.productId}`)}
              >
                <SignedImage fileId={p.productFile?.[0]?.fileId} alt={p.productName} />
                <p className="pd-related-name">{p.productName}</p>
                <p className="pd-related-price">KSh {p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="pd-related-section">
          <h3 className="pd-related-title">Related Products</h3>
          <div className="pd-related-grid">
            {relatedProducts.map((p) => (
              <div
                key={p.productId}
                className="pd-related-card"
                onClick={() => navigate(`/product/${p.productId}`)}
              >
                <SignedImage fileId={p.productFile?.[0]?.fileId} alt={p.productName} />
                <p className="pd-related-name">{p.productName}</p>
                <p className="pd-related-price">KSh {p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
