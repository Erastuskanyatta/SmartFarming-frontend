import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './LandingPage.css';

import Footer from "../../shared/footer/Footer";
import CategoryList from "./CategoryList";
import ProductGrid from "./ProductGrid";
import ProductBanners from "./ProductBanners";
import Navbar from "../../shared/navbar/Navbar";

import { products } from "./products";

const LandingPage = () => {
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="page-container">
            <div className="content">
                <div className="main-layout">
                    <div className="main-content">

                        <Navbar searchValue={searchKey} onSearch={setSearchKey} />

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
                                        onSelect={(p) => navigate(`/product/${p.productId}`)}
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
