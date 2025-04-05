import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleLoginHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
  const code = searchParams.get("code");
  console.log("받은 코드:", code);

  if (!code) {
    navigate("/");
    return;
  }

  fetch(`http://localhost:8080/auth/google/login?code=${code}`)
    .then(res => {
      console.log("응답상태:", res.status);
      if (!res.ok) throw new Error("토큰 요청 실패");
      return res.json();
    })
    .then(data => {
      console.log("받은 데이터:", data);
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      navigate("/mypage", { replace: true });
    })
    .catch(err => {
      console.error("에러:", err);
      navigate("/");
    });
}, [searchParams, navigate]);

  return (
    <div>
      구글 로그인 처리 중입니다🌐
    </div>
  );
};

export default GoogleLoginHandler;