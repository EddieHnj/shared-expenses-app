const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ذخیره هزینه‌ها در حافظه
let expenses = [];

// ثبت هزینه جدید
app.post("/api/expense", (req, res) => {
  const { payer, amount } = req.body;
  expenses.push({ payer, amount });
  res.json({ message: "Expense added" });
});

// محاسبه بالانس‌ها
app.get("/api/balance", (req, res) => {
  // مثال ساده: همه هزینه‌ها جمع بشه و تقسیم بر تعداد افراد
  const people = [...new Set(expenses.map(e => e.payer))];
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const share = total / people.length;

  let balances = {};
  people.forEach(p => {
    const paid = expenses.filter(e => e.payer === p).reduce((s, e) => s + e.amount, 0);
    balances[p] = paid - share;
  });

  res.json(balances);
});

app.listen(5000, () => console.log("Server running on port 5000"));
