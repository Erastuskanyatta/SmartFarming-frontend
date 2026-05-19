import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDelete,
  MdShoppingCart,
  MdArrowBack,
  MdLocalShipping,
} from "react-icons/md";

import { useCart } from "./CartContext";
import Navbar from "../../shared/navbar/Navbar";
import Footer from "../../shared/footer/Footer";
import "./Cart.css";

const DELIVERY_FEE = 160; // constant delivery fee for now, can be made dynamic based on location or other factors in the future

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-empty">
          <MdShoppingCart size={80} className="cart-empty-icon" />
          <h2>Your cart is empty!</h2>
          <p>Browse our products and add items to your cart.</p>

          <button
            className="cart-start-shopping"
            onClick={() => navigate("/landingpage")}
          >
            Start Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const total = cartTotal + DELIVERY_FEE;

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {/* Header */}
        <div className="cart-header">
          <button
            className="cart-back-btn"
            onClick={() => navigate("/landingpage")}
          >
            <MdArrowBack size={18} /> Continue Shopping
          </button>
          <h2 className="cart-title">
            <MdShoppingCart size={22} /> Cart ({cartCount}{" "}
            {cartCount === 1 ? "item" : "items"})
          </h2>
        </div>

        <div className="cart-layout">
          {/* Left: Items */}
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <img
                  src={product.imageURL}
                  alt={product.productName}
                  className="cart-item-img"
                  onClick={() => navigate(`/product/${product.id}`)}
                />

                <div className="cart-item-details">
                  <p
                    className="cart-item-name"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.productName}
                  </p>
                  <p className="cart-item-seller">Sold by {product.seller}</p>
                  <p className="cart-item-unit-price">
                    KSh {product.price.toLocaleString()} / unit
                  </p>

                  <div className="cart-item-actions">
                    <div className="cart-qty-control">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="cart-qty-value">{quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.aggregate}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <MdDelete size={18} /> Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-subtotal">
                  KSh {(product.price * quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>

            <div className="cart-summary-row">
              <span>
                Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
              </span>
              <span>KSh {cartTotal.toLocaleString()}</span>
            </div>

            <div className="cart-summary-row">
              <span className="cart-delivery-label">
                <MdLocalShipping size={15} /> Delivery
              </span>
              <span>KSh {DELIVERY_FEE.toLocaleString()}</span>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              PROCEED TO CHECKOUT
            </button>

            <button
              className="cart-continue-btn"
              onClick={() => navigate("/landingpage")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
