import React, { useState } from "react";
import "./SellModal.css";

const CATEGORIES = ["Animals", "Grains", "Fisheries"];

const EMPTY_FORM = {
  productName: "",
  categoryName: "",
  price: "",
  originalPrice: "",
  aggregate: "",
  inStock: "",
  description: "",
};

const EMPTY_SPEC = { label: "", value: "" };

const SellModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [newSpec, setNewSpec] = useState(EMPTY_SPEC);
  const [specError, setSpecError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSpecFieldChange = (e) => {
    const { name, value } = e.target;
    setNewSpec((prev) => ({ ...prev, [name]: value }));
    setSpecError("");
  };

  const handleAddSpec = () => {
    if (!newSpec.label.trim() || !newSpec.value.trim()) {
      setSpecError("Both label and value are required.");
      return;
    }
    setSpecifications((prev) => [...prev, { label: newSpec.label.trim(), value: newSpec.value.trim() }]);
    setNewSpec(EMPTY_SPEC);
  };

  const handleRemoveSpec = (index) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.productName.trim()) newErrors.productName = "Product name is required.";
    if (!form.categoryName) newErrors.categoryName = "Please select a category.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price.";
    if (!form.aggregate || isNaN(form.aggregate) || Number(form.aggregate) <= 0)
      newErrors.aggregate = "Enter a valid quantity.";
    if (!form.inStock || isNaN(form.inStock) || Number(form.inStock) <= 0)
      newErrors.inStock = "Enter number of available stock.";
    if (!form.description.trim()) newErrors.description= "Description is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      productName: form.productName.trim(),
      categoryName: form.categoryName,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : Number(form.price),
      aggregate: Number(form.aggregate),
      inStock: Number(form.inStock),
      description: form.description.trim(),
      specifications,
      rating: 0,
      reviewCount: 0,
      seller: "You",
      deliveryOptions: [
        { type: "Instant Delivery", price: 400 },
        { type: "Pickup Station", price: 70 },
        { type: "Door Delivery", price: 160 },
      ],
    });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="sell-modal-overlay" onClick={handleOverlayClick}>
      <div className="sell-modal">
        <div className="sell-modal-header">
          <h2>List a Product for Sale</h2>
          <button className="sell-modal-close" onClick={onClose}>&#x2715;</button>
        </div>

        <form className="sell-modal-form" onSubmit={handleSubmit}>

          <div className="sell-form-group">
            <label>Product Name <span className="required">*</span></label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="e.g. Fresh Tilapia (5kg)"
            />
            {errors.productName && <span className="sell-error">{errors.productName}</span>}
          </div>

          <div className="sell-form-group">
            <label>Category <span className="required">*</span></label>
            <select name="categoryName" value={form.categoryName} onChange={handleChange}>
              <option value="">-- Select a category --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.categoryName && <span className="sell-error">{errors.categoryName}</span>}
          </div>

          <div className="sell-form-row">
            <div className="sell-form-group">
              <label>Price (KSh) <span className="required">*</span></label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 1500"
                min="1"
              />
              {errors.price && <span className="sell-error">{errors.price}</span>}
            </div>

            <div className="sell-form-group">
              <label>Original Price (KSh)</label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="e.g. 2000"
                min="1"
              />
            </div>
          </div>

          <div className="sell-form-row">
            <div className="sell-form-group">
              <label>Quantity Available <span className="required">*</span></label>
              <input
                type="number"
                name="aggregate"
                value={form.aggregate}
                onChange={handleChange}
                placeholder="e.g. 50"
                min="1"
              />
              {errors.aggregate && <span className="sell-error">{errors.aggregate}</span>}
            </div>

            <div className="sell-form-group">
              <label>In Stock <span className="required">*</span></label>
              <input
                type="number"
                name="inStock"
                value={form.inStock}
                onChange={handleChange}
                placeholder="e.g. 20"
                min="1"
              />
              {errors.inStock && <span className="sell-error">{errors.inStock}</span>}
            </div>
          </div>

          <div className="sell-form-group">
            <label>Description <span className="required">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your product..."
            />
             {errors.description && <span className="sell-error">{errors.description}</span>}
          </div>

          {/* Specifications */}
          <div className="sell-form-group">
            <label>Specifications</label>

            {specifications.length > 0 && (
              <ul className="spec-list">
                {specifications.map((spec, i) => (
                  <li key={i} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-sep">:</span>
                    <span className="spec-value">{spec.value}</span>
                    <button
                      type="button"
                      className="spec-remove-btn"
                      onClick={() => handleRemoveSpec(i)}
                    >&#x2715;</button>
                  </li>
                ))}
              </ul>
            )}

            <div className="spec-add-row">
              <input
                type="text"
                name="label"
                value={newSpec.label}
                onChange={handleSpecFieldChange}
                placeholder="Label (e.g. Weight)"
              />
              <input
                type="text"
                name="value"
                value={newSpec.value}
                onChange={handleSpecFieldChange}
                placeholder="Value (e.g. 5 kg)"
              />
              <button type="button" className="spec-add-btn" onClick={handleAddSpec}>
                + Add
              </button>
            </div>
            {specError && <span className="sell-error">{specError}</span>}
          </div>

          <div className="sell-modal-actions">
            <button type="button" className="sell-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="sell-submit-btn">List Product</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SellModal;
