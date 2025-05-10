import Link from 'next/link'
import { useEffect, useState } from 'react'

const Login = () => {
  const [kakaoUrl, setKakaoUrl] = useState('');

  useEffect(() => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const clientId = process.env.NEXT_PUBLIC_REST_API_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    if (clientId && redirectUri) {
      const url = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
      setKakaoUrl(url);
    }
  }, []);

  if (!kakaoUrl) return null;

  return (
    <Link href={kakaoUrl} className="blue-200-button">카카오 로그인</Link>
  );
}
export default Login
