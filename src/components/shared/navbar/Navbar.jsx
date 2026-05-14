import React from "react";
import { useNavigate } from "react-router-dom";
import { MdChat, MdNotifications, MdShoppingCart, MdSearch } from "react-icons/md";

import { useCart } from "../../core/cart/CartContext";
import IconButton from "../../core/landing/IconButton";
import logo from "../../../asset/images/logo.png";
import avatar from "../../../asset/images/profile_photo.png";
import "./Navbar.css";

const Navbar = ({ searchValue = "", onSearch }) => {
  const navigate = useNavigate();
  const { cartTotal, cartCount } = useCart();

  const handleSearch = (e) => {
    if (onSearch) onSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && !onSearch) {
      navigate("/landingpage");
    }
  };

  return (
    <div className="navbar">

      <div className="navbar-logo" onClick={() => navigate("/landingpage")}>
        <img src={logo} alt="Logo" />
      </div>

      <div className="navbar-top-right">
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          <span className="cart-total">KSh {cartTotal.toLocaleString()}</span>
          <MdShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="cart-count-badge">{cartCount}</span>
          )}
        </button>

        <IconButton icon={MdChat} badge={1} />
        <IconButton icon={MdNotifications} badge={1} />

        <button className="avartar">
          <img src={avatar} alt="avatar" />
        </button>

        <button className="sell-btn">SELL</button>
      </div>

      <div className="navbar-search-section">
        <p className="search-text">Enjoy our collection at the touch of a button</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Type your search here"
            className="search-input"
            value={searchValue}
            onChange={handleSearch}
            onKeyDown={handleSearchSubmit}
          />
          <MdSearch className="search-icon" size={20} />
        </div>
      </div>

    </div>
  );
};

export default Navbar;
