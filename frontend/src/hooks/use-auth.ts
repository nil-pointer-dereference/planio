import api from "@/api/config";
import { useState } from "react";
import { useNavigate } from "react-router";

type LoginCredentials = {
  username: string;
  password: string;
};

type LoginResponse = {
  sessionId: string;
  username: string;
  formCompleted: boolean;
};

const useAuth = () => {
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsPosting(true);
      const { data } = await api.post<LoginResponse>(
        "/user/login",
        credentials,
      );
      localStorage.setItem("token", data.sessionId);
      if (data.formCompleted) {
        //TODO: navigate to task list 
        navigate("/");
      } else {
        navigate("/questionnaire?step=1")
      }
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
