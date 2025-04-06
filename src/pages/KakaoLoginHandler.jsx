import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

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

  fetch(`http://localhost:8080/auth/kakao?code=${code}`)
    .then(res => {
      if (!res.ok) throw new Error("토큰 요청 실패");
      return res.json();
    })
    .then(data => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      navigate("/mainpagemap", { replace: true });
    })
    .catch(err => {
      console.error(err);
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