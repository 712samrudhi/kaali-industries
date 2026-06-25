const express = require("express");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const path = require("path");

const app = express();

// ================= MIDDLEWARE =================
const allowedOrigins = [
    "http://localhost:3000",
    "https://nutrientfert.com",
    "https://www.nutrientfert.com"
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS: " + origin));
        }
    },
    credentials: true
}));

app.use(express.json());

// ================= STATIC IMAGES =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= SERVE REACT BUILD =================
app.use(express.static(path.join(__dirname, "build")));

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ==================================================
// ================= ADMIN LOGIN =====================
// ==================================================
app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        if (result.length > 0) {
            res.json({ success: true, admin: result[0], message: "Login Successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
    });
});

// ==================================================
// ================= REGISTER ========================
// ==================================================
app.post("/register", (req, res) => {
    const { name, email, mobile, address, username, password } = req.body;
    const sql = `INSERT INTO farmers (name, email, mobile, address, username, password) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, email, mobile, address, username, password], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Registration Failed" });
        }
        res.json({ success: true, message: "Registration Successful" });
    });
});

// ==================================================
// ================= LOGIN ==========================
// ==================================================
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM farmers WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Login Error" });
        }
        if (result.length > 0) {
            const farmer = result[0];
            const formattedFarmer = {...farmer, farmer_id: farmer.id };
            res.json({ success: true, farmer: formattedFarmer, message: "Login Success" });
        } else {
            res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    });
});

// ==================================================
// ================= ADD PRODUCT =====================
// ==================================================
app.post("/add-product", upload.single("image"), (req, res) => {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name || !price || !category || !image) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }
    const sql = `INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, price, category, image], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "DB Error" });
        }
        res.json({ success: true, message: "Product Added Successfully" });
    });
});

// ==================================================
// ================= GET PRODUCTS ====================
// ==================================================
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// ==================================================
// ================= DELETE PRODUCT ==================
// ==================================================
app.delete("/product/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Delete Failed" });
        }
        res.json({ success: true, message: "Product Deleted" });
    });
});

// ==================================================
// ================= UPDATE PRODUCT ==================
// ==================================================
app.put("/product/:id", (req, res) => {
    const id = req.params.id;
    const { name, price, category } = req.body;
    const sql = `UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?`;
    db.query(sql, [name, price, category, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Update Failed" });
        }
        res.json({ success: true, message: "Product Updated" });
    });
});

// ==================================================
// ============ RELATED PRODUCTS =====================
// ==================================================
app.get("/related-products/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT category FROM products WHERE id = ?", [id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).json({ message: "Error" });
        }
        const category = result[0].category;
        db.query("SELECT * FROM products WHERE category = ? AND id != ?", [category, id], (err2, result2) => {
            if (err2) return res.status(500).json({ message: "DB Error" });
            res.json(result2);
        });
    });
});

// ==================================================
// ============ PRODUCT DETAILS ======================
// ==================================================
app.get("/product-details/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM product_details WHERE productId = ?";
    db.query(sql, [productId], (err, result) => {
        if (err) return res.status(500).json({ success: false });
        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }
        const product = result[0];
        try {
            product.variants = JSON.parse(product.variants || "[]");
        } catch {
            product.variants = [];
        }
        res.json(product);
    });
});

// ==================================================
// ========= GET ALL PRODUCT DETAILS ================
// ==================================================
app.get("/all-product-details", (req, res) => {
    db.query("SELECT * FROM product_details ORDER BY id DESC", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        const products = result.map(item => {
            try {
                item.variants = JSON.parse(item.variants || "[]");
            } catch {
                item.variants = [];
            }
            return item;
        });
        res.json(products);
    });
});

// ==================================================
// ========= DELETE PRODUCT DETAILS =================
// ==================================================
app.delete("/product-details/:id", (req, res) => {
    db.query("DELETE FROM product_details WHERE id = ?", [req.params.id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ success: true, message: "Deleted Successfully" });
    });
});

// ==================================================
// ========= UPDATE PRODUCT DETAILS =================
// ==================================================
app.put("/product-details/:id", (req, res) => {
    const { productId, productName, specification, about, keyBenefits, modeOfAction, recommendedApplication, suitableCrops, features, variants } = req.body;
    const sql = `UPDATE product_details SET productId=?, productName=?, specification=?, about=?, keyBenefits=?, modeOfAction=?, recommendedApplication=?, suitableCrops=?, features=?, variants=? WHERE id=?`;
    db.query(sql, [productId, productName, specification, about, keyBenefits, modeOfAction, recommendedApplication, suitableCrops, features, JSON.stringify(variants || []), req.params.id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ success: true, message: "Updated Successfully" });
    });
});

// ==================================================
// ============ ADD PRODUCT DETAILS ==================
// ==================================================
const detailsUpload = upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
]);

app.post("/product-details", detailsUpload, (req, res) => {
    const { productId, productName, specification, about, keyBenefits, modeOfAction, recommendedApplication, suitableCrops, features, variants } = req.body;
    const image1 = (req.files && req.files.image1 && req.files.image1[0]) ? req.files.image1[0].filename : null;
    const image2 = (req.files && req.files.image2 && req.files.image2[0]) ? req.files.image2[0].filename : null;
    const image3 = (req.files && req.files.image3 && req.files.image3[0]) ? req.files.image3[0].filename : null;
    const image4 = (req.files && req.files.image4 && req.files.image4[0]) ? req.files.image4[0].filename : null;
    const sql = `INSERT INTO product_details(productId, productName, specification, about, keyBenefits, modeOfAction, recommendedApplication, suitableCrops, features, variants, image1, image2, image3, image4) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.query(sql, [productId, productName, specification, about, keyBenefits, modeOfAction, recommendedApplication, suitableCrops, features, variants, image1, image2, image3, image4], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, message: "Saved Successfully" });
    });
});

// ==================================================
// ================= SAVE ORDER =================
// ==================================================
app.post("/api/orders", (req, res) => {
    const { farmer_id, name, phone, address, city, pincode, paymentMethod, items, totalPrice } = req.body;
    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: "No Items Found" });
    }
    let completed = 0;
    items.forEach((item) => {
        const subtotal = Number(item.price) * Number(item.qty);
        const sql = `INSERT INTO orders(farmer_id, name, phone, address, city, pincode, paymentMethod, productName, productImage, variant, price, quantity, subtotal, total) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(sql, [farmer_id, name, phone, address, city, pincode, paymentMethod, item.name, item.image, item.ml, item.price, item.qty, subtotal, totalPrice], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: "Database Error" });
            }
            completed++;
            if (completed === items.length) {
                res.json({ success: true, message: "Order Placed Successfully" });
            }
        });
    });
});

// ==================================================
// ================= GET ALL ORDERS =================
// ==================================================
app.get("/api/orders", (req, res) => {
    const sql = `SELECT * FROM orders ORDER BY id DESC`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, orders: result });
    });
});

// ==================================================
// ================= GET FARMER ORDERS =================
// ==================================================
app.get("/api/orders/:farmer_id", (req, res) => {
    const farmer_id = req.params.farmer_id;
    const sql = `SELECT * FROM orders WHERE farmer_id = ? ORDER BY id DESC`;
    db.query(sql, [farmer_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, orders: result });
    });
});

// ==================================================
// ================= UPDATE ORDER STATUS =================
// ==================================================
app.put("/api/orders/:id", (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    let sql = `UPDATE orders SET status = ?`;
    let values = [status];
    if (status === "Shipped") sql += `, shipped_date = NOW()`;
    if (status === "Out For Delivery") sql += `, delivery_date = NOW()`;
    if (status === "Delivered") sql += `, delivered_date = NOW()`;
    sql += ` WHERE id = ?`;
    values.push(id);
    db.query(sql, values, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, message: "Order Status Updated" });
    });
});

// ==================================================
// ================= MANAGE USERS ====================
// ==================================================
app.get("/users", (req, res) => {
    db.query("SELECT * FROM farmers ORDER BY id DESC", (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json(result);
    });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM farmers WHERE id = ?", [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Delete Failed" });
        }
        res.json({ success: true, message: "User Deleted Successfully" });
    });
});

// ==================================================
// ================= CONTACT FORM ===================
// ==================================================
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const sql = `INSERT INTO contact_messages(name, email, message) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, message], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, message: "Message Sent Successfully" });
    });
});

// ==================================================
// ============ GET ALL CONTACT MESSAGES ============
// ==================================================
app.get("/contact-messages", (req, res) => {
    const sql = `SELECT * FROM contact_messages ORDER BY id DESC`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, messages: result });
    });
});

// ==================================================
// ================= FEEDBACK =======================
// ==================================================
app.post("/feedback", (req, res) => {
    const { name, phone, rating, feedback } = req.body;
    const sql = "INSERT INTO feedback(name, phone, rating, feedback) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, phone, rating, feedback], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ success: true, message: "Feedback Saved" });
    });
});

// ==================================================
// ================= TEST ROUTE =====================
// ==================================================
app.get("/test", (req, res) => {
    res.json({ message: "Backend Working ✅" });
});

// ==================================================
// ======= REACT FRONTEND - CATCH ALL ROUTE =========
// ==================================================
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// ==================================================
// ================= SERVER START ====================
// ==================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});