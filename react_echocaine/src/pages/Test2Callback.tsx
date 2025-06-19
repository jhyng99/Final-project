import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const code = q.get("code");
    const state = q.get("state");
    const savedState = sessionStorage.getItem("spotify_auth_state");

    if (state !== savedState || !code) {
      alert("유효하지 않은 접근입니다.");
      return;
    }

    const fetchToken = async () => {
      const data = new URLSearchParams();
      data.append("grant_type", "authorization_code");
      data.append("code", code);
      data.append("redirect_uri", "http://localhost:3000/callback");

      const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa("client_id:client_secret"),
          },
        }
      );

      const accessToken = res.data.access_token;
      sessionStorage.setItem("spotify_access_token", accessToken);
      navigate("/player"); // 다음 화면으로 이동
    };

    fetchToken();
  }, [navigate]);

  return <div>🔄 인증 중입니다...</div>;
};
