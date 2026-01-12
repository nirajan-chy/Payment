export default function BalanceCard({ balance }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-gray-500">Wallet Balance</h2>
      <p className="text-3xl font-bold mt-2">Rs {balance}</p>
    </div>
  );
}
