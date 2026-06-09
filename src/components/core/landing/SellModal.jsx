import React, { useEffect, useState } from "react";
import "./SellModal.css";

import ApiService from "../../../services/ApiService";

const EMPTY_FORM = {
  productName: "",
  categoryName: "",
  price: "",
  originalPrice: "",
  stockQuantity: "",
  description: "",
};

const toDataURL = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });

const EMPTY_SPEC = { label: "", value: "" };

const SellModal = ({ onClose, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [newSpec, setNewSpec] = useState(EMPTY_SPEC);
  const [specError, setSpecError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadedFileId, setUploadedFileId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | uploading | done | error
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | done | error
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(await toDataURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
    setUploadedFileId(null);
    setUploadStatus("uploading");
    try {
      const res = await ApiService.uploadFile(file);
      setUploadedFileId(res.data.fileId);
      setUploadStatus("done");
    } catch {
      setUploadStatus("error");
      setErrors((prev) => ({ ...prev, image: "Image upload failed. Please try again." }));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setUploadedFileId(null);
    setUploadStatus("idle");
  };

  // TOD0 on removing the image, call the delete endpoint to delete it from DB

  const handleRetryUpload = async () => {
    if (!imageFile) return;
    setUploadedFileId(null);
    setUploadStatus("uploading");
    setErrors((prev) => ({ ...prev, image: "" }));
    try {
      const res = await ApiService.uploadFile(imageFile);
      setUploadedFileId(res.data.fileId);
      setUploadStatus("done");
    } catch {
      setUploadStatus("error");
      setErrors((prev) => ({ ...prev, image: "Image upload failed. Please retry or choose a different image." }));
    }
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
    if (!form.stockQuantity || isNaN(form.stockQuantity) || Number(form.stockQuantity) <= 0)
      newErrors.stockQuantity = "Enter a valid stock quantity.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!imageFile) newErrors.image = "Product image is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (uploadStatus === "uploading") newErrors.image = "Image is still uploading, please wait.";
    if (uploadStatus === "error") newErrors.image = "Image upload failed. Please re-select the image.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError("");
    try {
      const payload = {
        productName: form.productName.trim(),
        categoryName: form.categoryName,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        description: form.description.trim(),
        productFileId: uploadedFileId,
        specifications: specifications.map((s) => ({ name: s.label, value: s.value })),
      };
      const res = await ApiService.createProduct(payload);
      setSubmitStatus("done");
      onSubmit(res.data);
      onClose();
    } catch (err) {
      setSubmitStatus("error");
      const detail = err?.data?.detail || err?.data?.message || "Failed to create product. Please try again.";
      setSubmitError(detail);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    ApiService.getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  return (
    <div className="sell-modal-overlay" onClick={handleOverlayClick}>
      <div className="sell-modal">
        <div className="sell-modal-header">
          <h2>Add a Product for Sale</h2>
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
              {categories.map((cat) => (
                <option value={cat.categoryName}>{cat.categoryName}</option>
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

          <div className="sell-form-group">
            <label>Stock Quantity <span className="required">*</span></label>
            <input
              type="number"
              name="stockQuantity"
              value={form.stockQuantity}
              onChange={handleChange}
              placeholder="e.g. 50"
              min="1"
            />
            {errors.stockQuantity && <span className="sell-error">{errors.stockQuantity}</span>}
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

          <div className="sell-form-group">
            <label>Product Image <span className="required">*</span></label>
            {imagePreview ? (
              <div className="image-preview-wrap">
                <img src={imagePreview} alt="Product preview" className="image-preview" />
                {uploadStatus === "uploading" && <span className="image-upload-status">Uploading...</span>}
                {uploadStatus === "done" && <span className="image-upload-status image-upload-ok">Uploaded</span>}
                <button type="button" className="image-remove-btn" onClick={handleRemoveImage} disabled={uploadStatus === "uploading"}>
                  &#x2715; Remove
                </button>
              </div>
            ) : (
              <label className="image-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <span className="image-upload-icon">&#128247;</span>
                <span className="image-upload-text">Click to upload image</span>
                <span className="image-upload-hint">PNG, JPG, WEBP up to 10MB</span>
              </label>
            )}
            {errors.image && <span className="sell-error">{errors.image}</span>}
          </div>

          {submitError && <p className="sell-error" style={{ marginBottom: "8px" }}>{submitError}</p>}

          <div className="sell-modal-actions">
            <button type="button" className="sell-cancel-btn" onClick={onClose} disabled={submitStatus === "submitting"}>Cancel</button>
            <button type="submit" className="sell-submit-btn" disabled={uploadStatus === "uploading" || submitStatus === "submitting"}>
              {uploadStatus === "uploading" ? "Uploading image..." : submitStatus === "submitting" ? "Saving..." : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SellModal;
