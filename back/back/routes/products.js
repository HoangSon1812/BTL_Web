var express = require("express");
var router = express.Router();
var db = require("../db");

// Lấy tất cả sản phẩm
router.get("/", function (req, res) {
  const sql = "SELECT * FROM mathang ORDER BY id ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ msg: "Lỗi server!" });
    }

    res.json(results);
  });
});

// Thêm sản phẩm mới
router.post("/", (req, res) => {
  const { tenMatHang, soLuongTon, donGia, image_url, moTa } = req.body;
  const sql = "INSERT INTO mathang (`tenMatHang`, `soLuongTon`, `donGia`, `image_url`, `moTa`) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [tenMatHang, soLuongTon, donGia, image_url, moTa], (err, result) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ msg: "Lỗi thêm sản phẩm", error: err.message });
    }
    res.json({ msg: "Thêm thành công", id: result.insertId });
  });
});

// Cập nhật sản phẩm
router.put("/:id", (req, res) => {
  console.log("PUT REQUEST RECEIVED for ID:", req.params.id);

  const { tenMatHang, soLuongTon, donGia, image_url, moTa } = req.body;
  const sql = "UPDATE mathang SET `tenMatHang`=?, `soLuongTon`=?, `donGia`=?, `image_url`=?, `moTa`=? WHERE id=?";

  db.query(sql, [tenMatHang, soLuongTon, donGia, image_url, moTa, req.params.id], (err, result) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ msg: "Lỗi cập nhật sản phẩm", error: err.message, debug_id: req.params.id });
    }
    console.log("Update result:", result);
    res.json({ msg: "Cập nhật thành công", debug_id: req.params.id, debug_body: req.body, result });
  });
});

// Xóa sản phẩm
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM mathang WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ msg: "Lỗi xóa sản phẩm", error: err.message });
    }
    res.json({ msg: "Xóa thành công" });
  });
});

module.exports = router;
