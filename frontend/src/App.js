import { useState } from "react";

function App() {
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [balances, setBalances] = useState({});

  const addExpense = async () => {
    await fetch("https://musical-zebra-975vq9qpvpv6c9vgg-5000.app.github.dev/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payer, amount: Number(amount) }),
    });
    getBalance();
  };

  const getBalance = async () => {
    const res = await fetch("https://musical-zebra-975vq9qpvpv6c9vgg-5000.app.github.dev/api/expense");
    const data = await res.json();
    setBalances(data);
  };

  return (
    <div>
      <h2>ثبت هزینه</h2>
      <input placeholder="پرداخت‌کننده" value={payer} onChange={e => setPayer(e.target.value)} />
      <input placeholder="مبلغ" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={addExpense}>ثبت</button>

      <h2>وضعیت حساب‌ها</h2>
      <button onClick={getBalance}>محاسبه</button>
      <ul>
        {Object.entries(balances).map(([person, balance]) => (
          <li key={person}>{person}: {balance}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
