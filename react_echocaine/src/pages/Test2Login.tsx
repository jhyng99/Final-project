export const SpotifyLogin = () => {
  const clientId = "클라이언트_ID";
  const redirectUri = "http://localhost:3000/callback";
  const scopes = [
    "user-read-private",
    "user-read-email",
    "streaming",
    "playlist-read-private",
  ];

  const handleLogin = () => {
    const state = Math.random().toString(36).substring(2);
    sessionStorage.setItem("spotify_auth_state", state);

    const loginUrl =
      "https://accounts.spotify.com/authorize" +
      `?response_type=code&client_id=${clientId}` +
      `&scope=${encodeURIComponent(scopes.join(" "))}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}`;

    window.location.href = loginUrl;
  };

  return <button onClick={handleLogin}>🎵 Spotify 로그인</button>;
};
