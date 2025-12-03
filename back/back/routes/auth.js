const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password, full_name, email } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length > 0)
        return res.status(400).json({ msg: "Username đã tồn tại!" });

      const hashed = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO users (username, password, full_name, email, role)
        VALUES (?, ?, ?, ?, 'CUSTOMER')
      `;

      db.query(sql, [username, hashed, full_name, email], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });

        res.json({ msg: "Đăng ký thành công!" });
      });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length === 0)
        return res.status(400).json({ msg: "Sai username hoặc password" });

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ msg: "Sai username hoặc password" });

      res.json({
        msg: "Login thành công!",
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          role: user.role,
          email: user.email
        }
      });
    }
  );
});

module.exports = router;
