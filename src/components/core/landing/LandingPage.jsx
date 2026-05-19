import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './LandingPage.css';

import Footer from "../../shared/footer/Footer";
import CategoryList from "./CategoryList";
import ProductGrid from "./ProductGrid";
// import ProductBanners from "./ProductBanners";
import Navbar from "../../shared/navbar/Navbar";
import SellModal from "./SellModal";

import { products as initialProducts } from "./products";

const LandingPage = () => {
    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState(initialProducts);
    const [showSellModal, setShowSellModal] = useState(false);

    const handleAddProduct = (newProduct) => {
        const nextId = products.reduce((max, p) => Math.max(max, p.productId), 0) + 1;
        setProducts((prev) => [
            ...prev,
            { ...newProduct, productId: nextId, imageURL: null },
        ]);
    };

    return (
        <div className="page-container">
            <div className="content">
                <div className="main-layout">
                    <div className="main-content">

                        <Navbar
                            searchValue={searchKey}
                            onSearch={setSearchKey}
                            onSellClick={() => setShowSellModal(true)}
                        />

                        <div className="main-content">
                            <div className="page-body">
                                <div className="sidebar">
                                    <CategoryList
                                        products={products}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                </div>
                                <div className="content-area">

                                    {/* <ProductBanners /> */}

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

            <Footer />

            {showSellModal && (
                <SellModal
                    onClose={() => setShowSellModal(false)}
                    onSubmit={handleAddProduct}
                />
            )}
        </div>
    );
};

export default LandingPage;
