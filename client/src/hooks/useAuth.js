import { loginUser, registerUser } from "@/services/auth.service";
import { removeToken, setToken } from "@/utils/token";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const login = async data => {
    const res = await loginUser(data);
    setToken(res.data.token);
    router.push("/dashboard");
  };

  const register = async data => {
    const res = await registerUser(data);
    router.push("/login");
  };

  const logout = async () => {
    removeToken();
    router.push("/login");
  };
  return { login, register, logout };
};
