import React from "react";

import './LandingPage.css';

import logo from '../../../asset/images/logo.png';
import avartar from '../../../asset/images/profile_photo.png';

import { MdChat, MdNotifications, MdShoppingCart, MdSearch } from "react-icons/md";

import IconButton from "./IconButton";
import Footer from "./Footer";
import CategoryList from "./CategoryList";
import ProductGrid from "./ProductGrid";
import ProductBanners from "./ProductBanners";

import { products } from "./products";
import { useState } from "react";

const LandingPage = () => {
    const [searchKey, setSearchKey] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="page-container">
            <div className="content">
                <div className="main-layout">
                    <div className="main-content">

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
                                    <MdSearch className="search-icon" size={20} />
                                </div>
                            </div>

                        </div>

                        <div className="main-content">
                            <div className="page-body">
                                <div className="sidebar">
                                    <CategoryList setSelectedCategory={setSelectedCategory} />
                                </div>
                                <div className="content-area">

                                    <ProductBanners />

                                    <ProductGrid
                                        products={products}
                                        searchKey={searchKey}
                                        selectedCategory={selectedCategory}
                                        onSelect={(p) => console.log(p)}
                                        onAddToCart={(p) => console.log(p)}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* FOOTER */}
            <Footer />

        </div>
    );
};

export default LandingPage;
