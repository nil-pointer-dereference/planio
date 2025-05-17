import api from "@/api/config";
import { useState } from "react";
import { useNavigate } from "react-router";

type RegisterData = {
  username: string;
  password: string;
  name: string;
  birthdate: string;
};

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
        navigate("/dayplan");
      } else {
        navigate("/questionnaire?step=1");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPosting(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsPosting(true);
      await api.post("/user/register", data);
      navigate("/questionnaire?step=1");
    } catch (e) {
      console.error(e);
    } finally {
      setIsPosting(false);
    }
  };

  return {
    isPosting,
    login,
    register,
  };
};

export default useAuth;
