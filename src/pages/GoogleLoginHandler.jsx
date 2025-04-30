import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/AxiosInstance";
import Loading from "./Loading";

const GoogleLoginHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (!accessToken) {
      console.error("Access Token 없음");
      navigate("/");
      return;
    }

    axios.post("/auth/google", { accessToken })
      .then((res) => {
        const { accessToken: jwt, refreshToken } = res.data;
        localStorage.setItem("access_token", jwt);
        localStorage.setItem("refresh_token", refreshToken);
        navigate("/mypage");
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        navigate("/");
      });
  }, [navigate]);

  return <Loading />;
};


export default GoogleLoginHandler;
