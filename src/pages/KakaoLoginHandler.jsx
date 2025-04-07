import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "../api/AxiosInstance";

const KakaoLoginHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
  const code = searchParams.get("code");
  if (!code) {
    navigate("/");
    return;
  }

  if (sessionStorage.getItem("kakao_oauth_code") === code) {
    // 이미 처리된 코드라면 중복 요청 방지
    navigate("/mypage");
    return;
  }

  sessionStorage.setItem("kakao_oauth_code", code);

  const existingToken = localStorage.getItem("access_token");
  if(existingToken) {
    navigate("/mypage");
    return;
  }

  axios.get("/auth/kakao", {
      params: { code }
    })
    .then((res) => {
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/mainpagemap", { replace: true });
    })
    .catch((err) => {
      console.error("카카오 로그인 실패:", err.response?.data || err.message);
      navigate("/");
    });

}, [searchParams, navigate]);

    return (
      <div>
        카카오 로그인중입니다람쥐🐿️
      </div>
    )
}
export default KakaoLoginHandler