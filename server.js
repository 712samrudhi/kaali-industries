const express = require("express");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();

// ================= UPLOADS FOLDER CHECK =================
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ================= CRASH SAFETY NET =================
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err.message);
    if (err.code === "ECONNRESET" || err.message.includes("Connection lost")) {
        console.log("DB connection issue - continuing...");
        return;
    }
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.message);
});

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
app.use(express.urlencoded({ extended: true }));

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

const detailsUpload = upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
]);

// ==================================================
// ================= ADMIN LOGIN =====================
// ==================================================
app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });
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
    db.query(`INSERT INTO farmers (name, email, mobile, address, username, password) VALUES (?, ?, ?, ?, ?, ?)`, [name, email, mobile, address, username, password], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Registration Failed" });
        res.json({ success: true, message: "Registration Successful" });
    });
});

// ==================================================
// ================= LOGIN ==========================
// ==================================================
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM farmers WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Login Error" });
        if (result.length > 0) {
            const farmer = result[0];
            res.json({ success: true, farmer: {...farmer, farmer_id: farmer.id }, message: "Login Success" });
        } else {
            res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    });
});

// ==================================================
// ================= ADD PRODUCT =====================
// ==================================================
app.post("/api/add-product", upload.single("image"), (req, res) => {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!name || !price || !category || !image) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }
    db.query(`INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)`, [name, price, category, image], (err) => {
        if (err) {
            console.log(err);
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
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Delete Failed" });
        res.json({ success: true, message: "Product Deleted" });
    });
});

// ==================================================
// ================= UPDATE PRODUCT (with image) =====
// ==================================================
app.put("/product/:id", upload.single("image"), (req, res) => {
    const id = req.params.id;
    const { name, price, category } = req.body;

    if (req.file) {
        const image = req.file.filename;
        db.query(`UPDATE products SET name=?, price=?, category=?, image=? WHERE id=?`, [name, price, category, image, id], (err) => {
            if (err) return res.status(500).json({ success: false, message: "Update Failed" });
            res.json({ success: true, message: "Product Updated" });
        });
    } else {
        db.query(`UPDATE products SET name=?, price=?, category=? WHERE id=?`, [name, price, category, id], (err) => {
            if (err) return res.status(500).json({ success: false, message: "Update Failed" });
            res.json({ success: true, message: "Product Updated" });
        });
    }
});

// ==================================================
// ============ RELATED PRODUCTS =====================
// ==================================================
// FIX: pehle ye "products" table use karat hota, pan detail page
// "product_details" table cha data dakhavto. Ata donhi consistent
// aahet — "product_details" table आणि "productId" column वापरतो,
// जेणेकरून navigate(`/product/${item.productId}`) barobar chalel.
app.get("/related-products/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM product_details WHERE productId = ?", [id], (err, result) => {
        if (err || result.length === 0) return res.json([]); // silently empty, error nahi
        // Related products sathi category column nasel tar,
        // sagle products (current sodun) dakhava — category asel tar filter kara
        db.query("SELECT * FROM product_details WHERE productId != ? LIMIT 8", [id], (err2, result2) => {
            if (err2) return res.status(500).json({ message: "DB Error" });
            res.json(result2);
        });
    });
});

// ==================================================
// ============ PRODUCT DETAILS ======================
// ==================================================
// FIX (IMPORTANT): Admin panel (ManageProductDetails.jsx) dropdown
// "id" (primary key) pathavto, pan public site product page
// "productId" (jasa "NF-001") pathavu shakto. Aadhi ha route FAKT
// "productId" column check karat hota, tyamule admin panel numeric
// ids sathi (jase 11, 6) 404 yet hota.
// Ata donhi "id" (primary key) आणि "productId" match karto,
// jyamule kontyahi baju var (admin ki public) 404 yenar nahi.
app.get("/product-details/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM product_details WHERE id = ? OR productId = ?", [id, id], (err, result) => {
        if (err) return res.status(500).json({ success: false });
        if (result.length === 0) return res.status(404).json({ success: false, message: "Not Found" });
        const product = result[0];
        try { product.variants = JSON.parse(product.variants || "[]"); } catch { product.variants = []; }
        try { product.customSections = JSON.parse(product.customSections || "[]"); } catch { product.customSections = []; }
        res.json(product);
    });
});

// ==================================================
// ========= GET ALL PRODUCT DETAILS ================
// ==================================================
app.get("/all-product-details", (req, res) => {
    db.query("SELECT * FROM product_details ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json(err);
        const products = result.map(item => {
            try { item.variants = JSON.parse(item.variants || "[]"); } catch { item.variants = []; }
            try { item.customSections = JSON.parse(item.customSections || "[]"); } catch { item.customSections = []; }
            return item;
        });
        res.json(products);
    });
});

// ==================================================
// ========= DELETE PRODUCT DETAILS =================
// ==================================================
// FIX: admin panel madhe delete admin "id" (primary key) vaparat
// asel tar ithe "id" thevla aahe. Jar admin panel productId
// vaparat asel tar khali "productId" kara.
app.delete("/product-details/:id", (req, res) => {
    db.query("DELETE FROM product_details WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Deleted Successfully" });
    });
});

// ==================================================
// ========= UPDATE PRODUCT DETAILS (with images) ===
// ==================================================
// NOTE: Admin panel (edit form) baricha "id" (primary key) pass
// karto asa gृहीत dharla aahe, karan edit link sadharan admin
// dashboard chya "id" var based asto. Jar tumcha admin panel
// productId pass karत असेल, tar "WHERE id=?" laa "WHERE productId=?"
// kara.
app.put("/product-details/:id", detailsUpload, (req, res) => {
    const {
        productId,
        productName,
        specification,
        about,
        keyBenefits,
        modeOfAction,
        recommendedApplication,
        suitableCrops,
        features,
        variants,
        customSections,
        oldImage1,
        oldImage2,
        oldImage3,
        oldImage4
    } = req.body;

    const image1 = (req.files && req.files.image1) ? req.files.image1[0].filename : oldImage1;
    const image2 = (req.files && req.files.image2) ? req.files.image2[0].filename : oldImage2;
    const image3 = (req.files && req.files.image3) ? req.files.image3[0].filename : oldImage3;
    const image4 = (req.files && req.files.image4) ? req.files.image4[0].filename : oldImage4;

    db.query(`UPDATE product_details SET productId=?, productName=?, specification=?, about=?,
        keyBenefits=?, modeOfAction=?, recommendedApplication=?, suitableCrops=?,
        features=?, variants=?, customSections=?, image1=?, image2=?, image3=?, image4=?
        WHERE id=?`, [productId, productName, specification, about, keyBenefits, modeOfAction,
            recommendedApplication, suitableCrops, features, variants, customSections,
            image1, image2, image3, image4, req.params.id
        ],
        (err) => {
            if (err) { console.log(err); return res.status(500).json(err); }
            res.json({ success: true, message: "Updated Successfully" });
        });
});

// ==================================================
// ============ ADD PRODUCT DETAILS ==================
// ==================================================
app.post("/product-details", detailsUpload, (req, res) => {
    const {
        productId,
        productName,
        specification,
        about,
        keyBenefits,
        modeOfAction,
        recommendedApplication,
        suitableCrops,
        features,
        variants,
        customSections
    } = req.body;

    const image1 = (req.files && req.files.image1) ? req.files.image1[0].filename : null;
    const image2 = (req.files && req.files.image2) ? req.files.image2[0].filename : null;
    const image3 = (req.files && req.files.image3) ? req.files.image3[0].filename : null;
    const image4 = (req.files && req.files.image4) ? req.files.image4[0].filename : null;

    db.query(`INSERT INTO product_details(productId, productName, specification, about,
        keyBenefits, modeOfAction, recommendedApplication, suitableCrops,
        features, variants, customSections, image1, image2, image3, image4)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [productId, productName, specification, about, keyBenefits, modeOfAction,
            recommendedApplication, suitableCrops, features, variants, customSections,
            image1, image2, image3, image4
        ],
        (err) => {
            if (err) return res.status(500).json({ success: false, message: "Database Error" });
            res.json({ success: true, message: "Saved Successfully" });
        });
});

// ==================================================
// ================= SAVE ORDER =====================
// ==================================================
app.post("/api/orders", (req, res) => {
    const { farmer_id, name, phone, address, city, pincode, paymentMethod, items, totalPrice } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ success: false, message: "No Items Found" });

    const orderId = crypto.randomUUID();

    let completed = 0;
    let failed = false;

    items.forEach((item) => {
        const subtotal = Number(item.price) * Number(item.qty);
        db.query(`INSERT INTO orders (order_id, farmer_id, name, phone, address, city, pincode, paymentMethod,
            productName, productImage, variant, price, quantity, subtotal, total, status)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [orderId, farmer_id, name, phone, address, city, pincode, paymentMethod,
                item.name, item.image, item.ml, item.price, item.qty, subtotal, totalPrice, "Ordered"
            ],
            (err) => {
                if (err) {
                    console.log(err);
                    if (!failed) {
                        failed = true;
                        return res.status(500).json({ success: false, message: "Database Error" });
                    }
                    return;
                }
                completed++;
                if (completed === items.length && !failed) {
                    res.json({ success: true, message: "Order Placed Successfully", order_id: orderId });
                }
            });
    });
});

// ==================================================
// ================= GET ALL ORDERS (grouped) =======
// ==================================================
app.get("/api/orders", (req, res) => {
    db.query("SELECT * FROM orders ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });
        res.json({ success: true, orders: groupOrders(result) });
    });
});

// ==================================================
// ================= GET FARMER ORDERS (grouped) ====
// ==================================================
app.get("/api/orders/farmer/:farmer_id", (req, res) => {
    db.query("SELECT * FROM orders WHERE farmer_id = ? ORDER BY id DESC", [req.params.farmer_id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });
        res.json({ success: true, orders: groupOrders(result) });
    });
});

// ==================================================
// ================= UPDATE ORDER STATUS (by order_id)
// ==================================================
app.put("/api/orders/:order_id", (req, res) => {
    const { status } = req.body;
    const orderId = req.params.order_id;

    let sql = `UPDATE orders SET status = ?`;
    let values = [status];
    if (status === "Shipped") sql += `, shipped_date = NOW()`;
    if (status === "Out For Delivery") sql += `, delivery_date = NOW()`;
    if (status === "Delivered") sql += `, delivered_date = NOW()`;

    if (orderId.startsWith("single-")) {
        const realId = orderId.replace("single-", "");
        sql += ` WHERE id = ?`;
        values.push(realId);
    } else {
        sql += ` WHERE order_id = ?`;
        values.push(orderId);
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log("UPDATE ERROR:", err);
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        console.log("Rows affected:", result.affectedRows, "| orderId:", orderId, "| status:", status);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Order not found — no rows updated" });
        }
        res.json({ success: true, message: "Order Status Updated" });
    });
});

// ==================================================
// ========= HELPER: group order rows by order_id ===
// ==================================================
function groupOrders(rows) {
    const grouped = {};
    rows.forEach((row) => {
        const key = row.order_id || `single-${row.id}`;
        if (!grouped[key]) {
            grouped[key] = {
                order_id: key,
                farmer_id: row.farmer_id,
                name: row.name,
                phone: row.phone,
                address: row.address,
                city: row.city,
                pincode: row.pincode,
                paymentMethod: row.paymentMethod,
                total: row.total,
                status: row.status || "Ordered",
                created_at: row.created_at,
                shipped_date: row.shipped_date,
                delivery_date: row.delivery_date,
                delivered_date: row.delivered_date,
                items: [],
            };
        }
        grouped[key].items.push({
            id: row.id,
            productName: row.productName,
            productImage: row.productImage,
            variant: row.variant,
            price: row.price,
            quantity: row.quantity,
            subtotal: row.subtotal,
        });
    });
    return Object.values(grouped);
}

// ==================================================
// ================= MANAGE USERS ===================
// ==================================================
app.get("/users", (req, res) => {
    db.query("SELECT * FROM farmers ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });
        res.json(result);
    });
});

app.delete("/users/:id", (req, res) => {
    db.query("DELETE FROM farmers WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Delete Failed" });
        res.json({ success: true, message: "User Deleted Successfully" });
    });
});

// ==================================================
// ================= CONTACT FORM ===================
// ==================================================
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, message: "All fields are required" });
    db.query("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)", [name, email, message], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });
        res.json({ success: true, message: "Message Sent Successfully" });
    });
});

// ==================================================
// ============ GET ALL CONTACT MESSAGES ============
// ==================================================
app.get("/contact-messages", (req, res) => {
    db.query("SELECT * FROM contact_messages ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });
        res.json({ success: true, messages: result });
    });
});

// ==================================================
// ================= FEEDBACK =======================
// ==================================================
app.post("/feedback", (req, res) => {
    const { name, phone, rating, feedback } = req.body;
    db.query("INSERT INTO feedback(name, phone, rating, feedback) VALUES (?, ?, ?, ?)", [name, phone, rating, feedback], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Feedback Saved" });
    });
});

// ==================================================
// ================= TEST ROUTE =====================
// ==================================================
app.get("/test", (req, res) => {
    res.json({ message: "Backend Working" });
});

// ==================================================
// ======= REACT FRONTEND - CATCH ALL ROUTE =========
// ==================================================
app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// ==================================================
// ================= SERVER START ====================
// ==================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});