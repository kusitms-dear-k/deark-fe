import Link from 'next/link'

const Login = () => {
  return (
    <>
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`}
        className={'blue-200-button'}>로그인</Link>
    </>
  )
}
export default Login
