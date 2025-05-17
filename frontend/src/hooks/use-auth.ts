import api from "@/api/config";
import { useState } from "react";

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponse = {
  sessionId: string;
  username: string;
};

const useAuth = () => {
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsPosting(true);
      const response = await api.post<LoginResponse>("/login", credentials);
      localStorage.setItem("token", response.data.sessionId);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    login,
  };
};

export default useAuth;
