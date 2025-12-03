var express = require("express");
var router = express.Router();
var db = require("../db");

// GET all branches
router.get("/all", (req, res) => {
  const sql = `
    SELECT 
      id,
      ten AS name,
      dia_chi AS address,
      manager
    FROM chinhanh
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json({ msg: "Lỗi lấy danh sách chi nhánh" });
    }

    // Chuẩn dữ liệu trả về FE
    const branches = rows.map(b => ({
      id: b.id,
      name: b.name,
      manager: b.manager || "Không có",
      inventoryCount: 0  // sau này tính theo xuất kho
    }));

    res.json(branches);
  });
});

module.exports = router;
