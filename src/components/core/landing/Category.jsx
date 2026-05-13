import React from "react";

const Category = ({ title, icon: Icon, total, onClick }) => {
  return (
    <div className="category-item" onClick={onClick}>
      <Icon size={28} className="category-icon" />

      <div className="category-info">
        <button className="category-btn">{title}</button>
        <div className="category-total">{total} items</div>
      </div>
    </div>
  );
};

export default Category;
