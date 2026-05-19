import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdLocalShipping,
  MdPayment,
  MdLocationOn,
  MdArrowBack,
} from "react-icons/md";

import { useCart } from "../cart/CartContext";
import Navbar from "../../shared/navbar/Navbar";
import Footer from "../../shared/footer/Footer";
import "./Checkout.css";

const DELIVERY_FEE = 160;

const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toLocaleDateString("en-KE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, cartTotal, cartCount } = useCart();

  const [address, setAddress] = useState({ name: "", phone: "", location: "" });
  const [editingAddress, setEditingAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="checkout-empty">
          <MdLocalShipping size={70} className="checkout-empty-icon" />
          <h2>Nothing to check out</h2>
          <p>Add items to your cart first.</p>
          <button
            className="checkout-empty-btn"
            onClick={() => navigate("/landingpage")}
          >
            Start Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const addressComplete = address.name && address.phone && address.location;
  const total = cartTotal + DELIVERY_FEE;

  const handleSaveAddress = () => {
    if (addressComplete) setEditingAddress(false);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) setPromoApplied(true);
  };

  const handlePlaceOrder = () => {
    if (!addressComplete) {
      setEditingAddress(true);
      return;
    }
    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h2 className="checkout-title">Place your order</h2>

        <div className="checkout-layout">
          <div className="checkout-steps">
            <div className="checkout-section">
              <div className="checkout-section-header">
                <div className="checkout-section-label">
                  {addressComplete && !editingAddress ? (
                    <MdCheckCircle size={20} className="step-icon step-done" />
                  ) : (
                    <MdRadioButtonUnchecked size={20} className="step-icon step-pending" />
                  )}
                  <span>1. DELIVERY ADDRESS</span>
                </div>
                {addressComplete && !editingAddress && (
                  <button
                    className="checkout-change-btn"
                    onClick={() => setEditingAddress(true)}
                  >
                    Change
                  </button>
                )}
              </div>

              {editingAddress ? (
                <div className="checkout-address-form">
                  <input
                    className="checkout-input"
                    placeholder="Full name"
                    value={address.name}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <input
                    className="checkout-input"
                    placeholder="Phone number (e.g. 0712 345 678)"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                  <input
                    className="checkout-input"
                    placeholder="Town / Area / Street"
                    value={address.location}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="checkout-save-btn"
                    disabled={!addressComplete}
                    onClick={handleSaveAddress}
                  >
                    Save Address
                  </button>
                </div>
              ) : (
                <div className="checkout-address-display">
                  <p className="checkout-address-name">{address.name}</p>
                  <p className="checkout-address-detail">
                    <MdLocationOn size={14} /> {address.location} &nbsp;|&nbsp;{" "}
                    {address.phone}
                  </p>
                </div>
              )}
            </div>
            <div className="checkout-section">
              <div className="checkout-section-header">
                <div className="checkout-section-label">
                  <MdLocalShipping size={20} className="step-icon step-done" />
                  <span>2. DELIVERY DETAILS</span>
                </div>
              </div>
              <div className="checkout-delivery-body">
                <p className="checkout-delivery-date">
                  Standard Delivery &mdash; estimated by{" "}
                  <strong>{getEstimatedDelivery()}</strong>
                </p>
                <div className="checkout-thumbnails">
                  {items.map(({ product, quantity }) => (
                    <div key={product.productId} className="checkout-thumb">
                      <img src={product.imageURL} alt={product.productName} />
                      {quantity > 1 && (
                        <span className="checkout-thumb-qty">x{quantity}</span>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="checkout-modify-cart"
                  onClick={() => navigate("/cart")}
                >
                  Modify cart
                </button>
              </div>
            </div>

            <button
              className="checkout-back-link"
              onClick={() => navigate("/cart")}
            >
              <MdArrowBack size={16} /> Go back &amp; continue shopping
            </button>
          </div>

          <div className="checkout-sidebar">
            <h3 className="checkout-sidebar-title">Order Summary</h3>

            <div className="checkout-sidebar-row">
              <span>
                Items total ({cartCount} {cartCount === 1 ? "item" : "items"})
              </span>
              <span>KSh {cartTotal.toLocaleString()}</span>
            </div>
            <div className="checkout-sidebar-row">
              <span>Delivery fees</span>
              <span>KSh {DELIVERY_FEE.toLocaleString()}</span>
            </div>
            <div className="checkout-sidebar-divider" />
            <div className="checkout-sidebar-row checkout-sidebar-total">
              <span>Total</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>

            <div className="checkout-promo">
              <input
                className="checkout-promo-input"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
              <button
                className="checkout-promo-btn"
                onClick={handleApplyPromo}
                disabled={promoApplied || !promoCode.trim()}
              >
                {promoApplied ? "Applied" : "Apply"}
              </button>
            </div>

            <button className="checkout-confirm-btn" onClick={handlePlaceOrder}>
              Confirm order
            </button>
            <p className="checkout-terms">
              By proceeding, you automatically accept our{" "}
              <span className="checkout-terms-link">Terms &amp; Conditions</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
