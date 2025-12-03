var express = require("express");
var router = express.Router();
var db = require("../db");

// ===================== CREATE ORDER =====================
router.post("/", async (req, res) => {
  const { full_name, address, phone, items, total_price } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ msg: "Giỏ hàng trống!" });
  }

  const insertOrderSql = `
    INSERT INTO order_history (full_name, address, phone, total_price)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    insertOrderSql,
    [full_name, address, phone, total_price],
    (err, orderResult) => {
      if (err) {
        console.log("Error inserting order:", err);
        return res.status(500).json({ msg: "Lỗi tạo đơn hàng" });
      }

      const orderId = orderResult.insertId;

      const itemSql = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `;

      items.forEach(item => {
        db.query(
          itemSql,
          [orderId, item.product_id, item.quantity, item.price],
          (err2) => {
            if (err2) console.log("Error inserting order_item:", err2);
          }
        );

        const updateStockSql = `
          UPDATE mathang 
          SET soLuongTon = soLuongTon - ?
          WHERE id = ?
        `;

        db.query(updateStockSql, [item.quantity, item.product_id], (err3) => {
          if (err3) console.log("Error updating stock:", err3);
        });
      });

      return res.status(200).json({
        msg: "Đặt hàng thành công",
        order_id: orderId
      });
    }
  );
});


// ===================== GET ALL ORDERS (ADMIN) =====================
router.get("/all", (req, res) => {
  const sql = `
    SELECT *
    FROM order_history
    ORDER BY order_date DESC
  `;

  db.query(sql, (err, orders) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Lỗi khi lấy danh sách đơn hàng" });
    }

    res.json(orders);
  });
});


// ===================== GET ORDER DETAIL ITEMS =====================
router.get("/:orderId/items", (req, res) => {
  const orderId = req.params.orderId;

  const sql = `
    SELECT 
      oi.*, 
      m.tenMatHang, 
      m.image_url
    FROM order_items oi
    JOIN mathang m ON oi.product_id = m.id
    WHERE oi.order_id = ?
  `;

  db.query(sql, [orderId], (err, items) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Lỗi lấy chi tiết đơn hàng" });
    }

    res.json(items);
  });
});

module.exports = router;
