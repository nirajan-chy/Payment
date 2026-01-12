import { getBalance } from "@/services/wallet.service";
import { useState, useEffect } from "react";

export const useWallet = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance().then(res => {
      setBalance(res.data.balance);
    });
  }, []);

  return { balance };
};
