"use client";

import { useWallet } from "@/hooks/useWallet";
import BalanceCard from "@/components/wallet/BalanceCard";

export default function WalletPage() {
  const { balance } = useWallet();

  return (
    <div className="p-10">
      <BalanceCard balance={balance} />
    </div>
  );
}
