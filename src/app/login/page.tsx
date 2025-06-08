'use client';

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { KakaoIcon } from '@/assets/svgComponents'

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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-red-400">
      <p className="button-l text-bg-300 text-center">
        쉬운 검색, 딱- 맞는 가게
      </p>
      <div className="key-visual-el text-[60px] text-bg-300">Dear.k</div>
      <div className="relative w-[250px] h-[110px] mt-[65px]">
        <Image src={'/deark-logo.svg'} alt="로고" fill className="object-cover" />
      </div>
      <div className="absolute bottom-[95px] w-full px-5">
        <Link
          href={kakaoUrl}
          className="button-m flex w-full items-center justify-center gap-x-2 rounded-[8px] bg-[#FFF8EB] py-3 text-gray-800"
        >
          <KakaoIcon />
          카카오톡으로 쉬운 시작
        </Link>
      </div>

    </div>
  )
}
export default Login
