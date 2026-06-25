import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ManageProductDetails() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    productName: "",
    specification: "",
    about: "",
    keyBenefits: "",
    modeOfAction: "",
    recommendedApplication: "",
    suitableCrops: "",
    features: "",
    variants: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/all-product-details`
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editData = (item) => {
    setEditId(item.id);

    setForm({
      productId: item.productId || "",
      productName: item.productName || "",
      specification: item.specification || "",
      about: item.about || "",
      keyBenefits: item.keyBenefits || "",
      modeOfAction: item.modeOfAction || "",
      recommendedApplication:
        item.recommendedApplication || "",
      suitableCrops: item.suitableCrops || "",
      features: item.features || "",
      variants: item.variants || [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleVariantChange = (
    index,
    field,
    value
  ) => {
    const updated = [...form.variants];

    updated[index][field] = value;

    setForm({
      ...form,
      variants: updated,
    });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        {
          ml: "",
          price: "",
        },
      ],
    });
  };

  const removeVariant = (index) => {
    const updated = [...form.variants];

    updated.splice(index, 1);

    setForm({
      ...form,
      variants: updated,
    });
  };

  const updateData = async () => {
    try {
      await axios.put(
        `${BASE_URL}/product-details/${editId}`,
        form
      );

      alert("Product Updated Successfully");

      setEditId(null);

      setForm({
        productId: "",
        productName: "",
        specification: "",
        about: "",
        keyBenefits: "",
        modeOfAction: "",
        recommendedApplication: "",
        suitableCrops: "",
        features: "",
        variants: [],
      });

      loadData();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const deleteData = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `${BASE_URL}/product-details/${id}`
      );

      alert("Deleted Successfully");

      loadData();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Manage Product Details
      </h2>

      {editId && (
        <div style={styles.editBox}>
          <h3>Edit Product</h3>

          <input
            type="text"
            placeholder="Product ID"
            value={form.productId}
            onChange={(e) =>
              setForm({
                ...form,
                productId: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Product Name"
            value={form.productName}
            onChange={(e) =>
              setForm({
                ...form,
                productName: e.target.value,
              })
            }
            style={styles.input}
          />

          <textarea
            placeholder="Specification"
            value={form.specification}
            onChange={(e) =>
              setForm({
                ...form,
                specification: e.target.value,
              })
            }
            style={styles.textarea}
          />

          <textarea
            placeholder="About"
            value={form.about}
            onChange={(e) =>
              setForm({
                ...form,
                about: e.target.value,
              })
            }
            style={styles.textarea}
          />

          <textarea
            placeholder="Key Benefits"
            value={form.keyBenefits}
            onChange={(e) =>
              setForm({
                ...form,
                keyBenefits: e.target.value,
              })
            }
            style={styles.textarea}
          />

          <textarea
            placeholder="Mode Of Action"
            value={form.modeOfAction}
            onChange={(e) =>
              setForm({
                ...form,
                modeOfAction: e.target.value,
              })
            }
            style={styles.textarea}
          />

          <textarea
            placeholder="Recommended Application"
            value={form.recommendedApplication}
            onChange={(e) =>
              setForm({
                ...form,
                recommendedApplication:
                  e.target.value,
              })
            }
            style={styles.textarea}
          />

          <textarea
            placeholder="Suitable Crops"
            value={form.suitableCrops}
            onChange={(e) =>
              setForm({
                ...form,
                suitableCrops: e.target.value,
              })
            }
            style={styles.textarea}
          />

          <textarea
            placeholder="Features"
            value={form.features}
            onChange={(e) =>
              setForm({
                ...form,
                features: e.target.value,
              })
            }
            style={styles.textarea}
          />

          <h3>Product Variants</h3>

          {form.variants.map(
            (variant, index) => (
              <div
                key={index}
                style={styles.variantRow}
              >
                <input
                  type="text"
                  placeholder="ML"
                  value={variant.ml}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "ml",
                      e.target.value
                    )
                  }
                  style={styles.variantInput}
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "price",
                      e.target.value
                    )
                  }
                  style={styles.variantInput}
                />

                <button
                  type="button"
                  onClick={() =>
                    removeVariant(index)
                  }
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            )
          )}

          <button
            type="button"
            onClick={addVariant}
            style={styles.editBtn}
          >
            + Add Variant
          </button>

          <div style={styles.buttonRow}>
            <button
              onClick={updateData}
              style={styles.updateBtn}
            >
              Update Product
            </button>

            <button
              onClick={() =>
                setEditId(null)
              }
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {data.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            style={styles.card}
          >
            <h3>{item.productName}</h3>

            <p>
              <b>Product ID:</b>{" "}
              {item.productId}
            </p>

            <p>
              <b>Specification:</b>{" "}
              {item.specification}
            </p>

            <p>
              <b>About:</b> {item.about}
            </p>

            <p>
              <b>Key Benefits:</b>{" "}
              {item.keyBenefits}
            </p>

            <p>
              <b>Mode Of Action:</b>{" "}
              {item.modeOfAction}
            </p>

            <p>
              <b>Recommended Application:</b>{" "}
              {item.recommendedApplication}
            </p>

            <p>
              <b>Suitable Crops:</b>{" "}
              {item.suitableCrops}
            </p>

            <p>
              <b>Features:</b>{" "}
              {item.features}
            </p>

            <p>
              <b>Variants:</b>
            </p>

            {item.variants?.map(
              (v, index) => (
                <div key={index}>
                  {v.ml} - ₹{v.price}
                </div>
              )
            )}

            <div style={styles.buttonRow}>
              <button
                onClick={() =>
                  editData(item)
                }
                style={styles.editBtn}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteData(item.id)
                }
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "20px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  editBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    minHeight: "80px",
  },

  variantRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  variantInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  editBtn: {
    background: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  updateBtn: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#757575",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ManageProductDetails;
