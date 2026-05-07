import React from "react";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <div className="newsletter-text">
          SIGN UP TO OUR NEWSLETTER
          <br />
          <span>Be the first to receive our promotions</span>
        </div>

        <div className="newsletter-form">
          <input
            type="text"
            placeholder="Enter your email address"
            className="newsletter-input"
          />
          <button className="newsletter-button">
            SUBSCRIBE
          </button>
        </div>
      </div>

      <hr className="footer-line" />

      <div className="footer-title">Stay Connected</div>

      <div className="social-icons">
        <button className="social-btn">
          <FaFacebookF size={18} />
        </button>

        <button className="social-btn">
          <FaTwitter size={18} />
        </button>

        <button className="social-btn">
          <FaInstagram size={18} />
        </button>
      </div>

      <div className="footer-links">
        <a href="#">How to Shop</a>
        <a href="#">About Us</a>
        <a href="#">Terms & Conditions</a>
      </div>


      <div className="footer-links">
        <a href="#">My Account</a>
        <a href="#">My Orders</a>
        <a href="#">Track My Order</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Returns Policy</a>
        <a href="#">Refunds Policy</a>
      </div>

      <div className="footer-links">
        <a href="#">FAQs</a>
        <a href="#">Shipping & Delivery Policy</a>
        <a href="#">Customer Service</a>
      </div>

    </footer>
  );
};

export default Footer;