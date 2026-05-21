import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle, MdArrowBack } from "react-icons/md";

import { useCart } from "../cart/CartContext";
import Navbar from "../../shared/navbar/Navbar";
import Footer from "../../shared/footer/Footer";
import "./Payment.css";

const DELIVERY_FEE = 160;

const Payment = () => {
  const navigate = useNavigate();
  const { items, cartTotal } = useCart();

  const [selected, setSelected] = useState(null);
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = cartTotal + DELIVERY_FEE;

  if (items.length === 0 && !paid) {
    return (
      <>
        <Navbar />
        <div className="payment-empty">
          <p>Nothing to pay for.</p>
          <button
            className="payment-empty-btn"
            onClick={() => navigate("/landingpage")}
          >
            Go Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (paid) {
    return (
      <>
        <Navbar />
        <div className="payment-success">
          <MdCheckCircle size={80} className="payment-success-icon" />
          <h2>Payment Successful!</h2>
          <p>Your order has been confirmed. Thank you for shopping with us.</p>
          <button
            className="payment-success-btn"
            onClick={() => navigate("/landingpage")}
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const canPay =
    (selected === "mobilemoney" && phone.replace(/\s/g, "").length >= 10) ||
    (selected === "card" &&
      card.number.replace(/\s/g, "").length === 16 &&
      card.name.trim() &&
      card.expiry.length === 5 &&
      card.cvv.length === 3);

  const handlePay = () => {
    if (!canPay) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 1800);
  };

  const formatCardNumber = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  return (
    <>
      <Navbar />
      <div className="payment-page">

        <div className="payment-summary-bar">
          <div className="payment-summary-row">
            <span className="payment-summary-label">ORDER SUMMARY</span>
            <button
              className="payment-see-details"
              onClick={() => navigate("/checkout")}
            >
              SEE DETAILS &rsaquo;
            </button>
          </div>
          <div className="payment-summary-total-row">
            <span className="payment-total-label">TOTAL TO PAY</span>
            <span className="payment-total-amount">
              KSh {total.toLocaleString()}
            </span>
          </div>
        </div>


        <div className="payment-methods-section">
          <p className="payment-section-heading">CHOOSE A PAYMENT METHOD</p>

          <div
            className={`payment-option ${selected === "mobilemoney" ? "active" : ""}`}
            onClick={() => setSelected("mobilemoney")}
          >
            <div className="payment-option-top">
              <div className="payment-option-left">
                <span
                  className={`payment-radio ${selected === "mobilemoney" ? "checked" : ""}`}
                />
                <span className="payment-option-name">Mobile Money</span>
              </div>
              <div className="payment-badges">
                <span className="badge badge-airtel">Airtel</span>
                <span className="badge badge-mpesa">M-PESA</span>
              </div>
            </div>

            {selected === "mobilemoney" && (
              <div
                className="payment-fields"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="payment-field-label">Phone number</label>
                <input
                  className="payment-input"
                  placeholder="e.g. 0712 345 678"
                  value={phone}
                  maxLength={13}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^\d\s]/g, ""))
                  }
                />
                <p className="payment-field-hint">
                  You will receive an M-Pesa / Airtel Money STK push prompt.
                </p>
              </div>
            )}
          </div>

          <div
            className={`payment-option ${selected === "card" ? "active" : ""}`}
            onClick={() => setSelected("card")}
          >
            <div className="payment-option-top">
              <div className="payment-option-left">
                <span
                  className={`payment-radio ${selected === "card" ? "checked" : ""}`}
                />
                <span className="payment-option-name">Pay with Bank Cards</span>
              </div>
              <div className="payment-badges">
                <span className="badge badge-mastercard">Mastercard</span>
                <span className="badge badge-visa">VISA</span>
              </div>
            </div>

            {selected === "card" && (
              <div
                className="payment-fields"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="payment-field-label">Card number</label>
                <input
                  className="payment-input"
                  placeholder="0000 0000 0000 0000"
                  value={card.number}
                  onChange={(e) =>
                    setCard((prev) => ({
                      ...prev,
                      number: formatCardNumber(e.target.value),
                    }))
                  }
                />
                <label className="payment-field-label">Name on card</label>
                <input
                  className="payment-input"
                  placeholder="Full name"
                  value={card.name}
                  onChange={(e) =>
                    setCard((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <div className="payment-card-row">
                  <div className="payment-card-half">
                    <label className="payment-field-label">Expiry</label>
                    <input
                      className="payment-input"
                      placeholder="MM/YY"
                      value={card.expiry}
                      maxLength={5}
                      onChange={(e) =>
                        setCard((prev) => ({
                          ...prev,
                          expiry: formatExpiry(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="payment-card-half">
                    <label className="payment-field-label">CVV</label>
                    <input
                      className="payment-input"
                      placeholder="•••"
                      value={card.cvv}
                      maxLength={3}
                      onChange={(e) =>
                        setCard((prev) => ({
                          ...prev,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className={`payment-pay-btn${!canPay ? " disabled" : ""}${loading ? " loading" : ""}`}
          onClick={handlePay}
          disabled={!canPay || loading}
        >
          {loading ? "Processing…" : `PAY NOW: KSh ${total.toLocaleString()}`}
        </button>

        <p className="payment-legal">
          By tapping &ldquo;PAY NOW&rdquo; you accept our{" "}
          <span className="payment-link">Payment Terms &amp; Conditions</span>,{" "}
          <span className="payment-link">General Terms and Conditions</span>, and{" "}
          <span className="payment-link">Privacy Notice</span>.
        </p>

        <p className="payment-security-note">
          <strong>Please note:</strong> we will never ask you for your password,
          PIN, CVV or full card details over the phone or via email.
        </p>

        <button
          className="payment-back-link"
          onClick={() => navigate("/checkout")}
        >
          <MdArrowBack size={15} /> Back to checkout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
