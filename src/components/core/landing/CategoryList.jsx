import React, { useState, useEffect } from "react";
import {
    MdGrain, MdPets, MdEco, MdLocalFlorist, MdLocalDrink,
    MdWater, MdYard, MdCategory
} from "react-icons/md";

import Category from "./Category";
import ApiService from "../../../services/ApiService";

const ICON_MAP = {
    Grains: MdGrain,
    Animals: MdPets,
    Vegetables: MdEco,
    Fruits: MdLocalFlorist,
    Dairy: MdLocalDrink,
    Poultry: MdPets,
    Aquaculture: MdWater,
    Fertilizers: MdYard,
};

const CategoryList = ({ products, setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);

      const categoriesWithMeta = categories.map(cat => ({
        ...cat,
        icon: ICON_MAP[cat.categoryName] ?? MdCategory,
        total: products.filter(p => p.category.categoryName === cat.categoryName).length,
    }));

    useEffect(() => {
        ApiService.getCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error("Failed to load categories", err));
    }, []);

  
    return (
        <div className="category-sidebar">
            <p className="category-title">CATEGORIES</p>

            {categoriesWithMeta.map(cat => (
                <Category
                    key={cat.categoryId}
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
