"use client";

import { sendMoney } from "@/services/wallet.service";
import { useState } from "react";

export default function TransferForm() {
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    await sendMoney({ toUserId, amount });
    alert("Money sent");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Receiver User ID"
        value={toUserId}
        onChange={e => setToUserId(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
  );
}
