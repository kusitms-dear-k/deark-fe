import Link from 'next/link'
import { useEffect, useState } from 'react'
import { KakaoIcon } from '@/assets/svgComponents'
import Image from 'next/image'

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
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-[62px] h-[62px]">
        <Image src={'/common/cake-logo.svg'} alt="로고" fill className="object-cover" />
      </div>

      <p className="body-m-m text-gray-700 text-center">
        원하는 케이크,
        <br />
        원하는 추억을,
        <br />
        쉽고 빠르게.
      </p>
      <div className="key-visual-l text-red-400">Dear.k</div>
      <div className="absolute bottom-8 w-full px-5">
        <Link
          href={kakaoUrl}
          className="button-m flex w-full items-center justify-center gap-x-2 rounded-[8px] bg-[#FADD0E] py-3 text-gray-800"
        >
          <KakaoIcon />
          카카오 로그인
        </Link>
      </div>

    </div>
  )
}
export default Login
