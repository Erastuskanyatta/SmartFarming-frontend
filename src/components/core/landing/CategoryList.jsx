import React from "react";
import { MdPhoneAndroid, MdCheckroom, MdHome } from "react-icons/md";

import Category from "./Category";
 
import { products } from "./products";

const categoryConfig = [
    { categoryName: "Grains", icon: MdPhoneAndroid },
    { categoryName: "Animals", icon: MdCheckroom },
    { categoryName: "Fisheries", icon: MdHome },
];

const categories = categoryConfig.map(cat => ({
    ...cat,
    total: products.filter(p => p.categoryName === cat.categoryName).length,
}));

const CategoryList = ({ setSelectedCategory }) => {
    return (
        <div className="category-sidebar">
            <p className="category-title">CATEGORIES</p>

            {categories.map((cat, i) => (
                <Category
                    key={i}
                    title={cat.categoryName}
                    icon={cat.icon}
                    total={cat.total}
                    onClick={() => setSelectedCategory(cat.categoryName)}
                />
            ))}
        </div>
    );
};

export default CategoryList;
