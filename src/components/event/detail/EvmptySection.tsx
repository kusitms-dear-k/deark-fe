'use client'

import { useRouter } from 'next/navigation'
import MemofileIcon from '@/assets/svgComponents/MemofileIcon'

interface EmptySectionProps {
  title: string
  description: string
  buttonText: string
  pathname: string
}

export default function EmptySection({ title, description, buttonText, pathname }: EmptySectionProps) {
  const router = useRouter()

  return (
    <div className="flex h-[10rem] w-full flex-col items-center justify-start gap-3.5">
      {/* 가운데 아이콘 */}
      <MemofileIcon />
      {/* (디자인의 경우 추가 아이콘이 필요하면 여기에 배치) */}
      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center">
        <div className="title-l text-center leading-relaxed text-gray-500">{title}</div>
        <div className="body-m text-center leading-snug text-gray-400">{description}</div>
      </div>
      <button
        className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-neutral-200 px-7 py-3"
        onClick={() => router.push(pathname)}
      >
        <span className="button-m leading-snug text-gray-700">{buttonText}</span>
      </button>
    </div>
  )
}
