import axios from "../api/AxiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "./Loading";

const GoogleLoginHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const code = searchParams.get("code");
  if (!code) {
    navigate("/");
    return;
  }

  if(sessionStorage.getItem("google_oauth_code") === code) {
    // 이미 처리된 코드라면 중복 요청 방지
    navigate("/mypage");
    return;
  }

  sessionStorage.setItem("google_oauth_code", code);

  const existingToken = localStorage.getItem("access_token");
  if(existingToken) {
    navigate("/mypage");
    return;
  }

  axios.get("/auth/google", {
    params: { code }
  })
  .then((res) => {
    const {accessToken, refreshToken } = res.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    setTimeout(() => {
      navigate("/mypage", { replace: true });
    }, 1300);
  })
  .catch((err) => {
    console.error("구글 로그인 실패:", err.response?.data || err.message);
    navigate("/");
  })
  .finally(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

}, [searchParams, navigate]);

  if(loading) {
    return <Loading />
  }

  return null;
};

export default GoogleLoginHandler;