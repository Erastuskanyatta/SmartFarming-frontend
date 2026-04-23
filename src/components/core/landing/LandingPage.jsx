import React from "react";

import css from './LandingPage.css'

import logo from '../../../asset/images/logo.png';
import avartar from '../../../asset/images/profile_photo.png';

import { MdChat, MdNotifications, MdShoppingCart } from "react-icons/md";

import IconButton from "./IconButton";
import Footer from "./Footer";

const LandingPage = () => {
    return (
        <div className="page-container">

            <div className="content">
                <div className="navigationBar">

                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>

                    <div className="top-right">
                        <button className="cart-btn">
                            <span className="cart-total">KSh. 0.0</span>
                            <MdShoppingCart size={20} />
                        </button>

                        <IconButton icon={MdChat} badge={1} />
                        <IconButton icon={MdNotifications} badge={1} />

                        <button className="avartar">
                            <img src={avartar} alt="avatar" />
                        </button>

                        <button className="sell-btn">SELL</button>
                    </div>

                    {/* Search Section */}
                    <div className="search-section">
                        <p className="search-text">
                            Enjoy our collection at the touch of a button
                        </p>

                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Type your search here"
                                className="search-input"
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />

        </div>
    );
};

export default LandingPage;
