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
    <div className="flex h-36 w-96 flex-col items-center justify-start gap-3.5 px-5">
      {/* 가운데 아이콘 */}
      <MemofileIcon className="mb-1 h-8 w-7" />
      {/* (디자인의 경우 추가 아이콘이 필요하면 여기에 배치) */}
      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center">
        <div className="text-center text-base leading-relaxed font-bold text-neutral-500">{title}</div>
        <div className="text-center text-sm leading-snug font-normal text-zinc-500">{description}</div>
      </div>
      <button
        className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded bg-neutral-200 px-7 py-3"
        onClick={() => router.push(pathname)}
      >
        <span className="text-sm leading-snug font-semibold text-neutral-700">{buttonText}</span>
      </button>
    </div>
  )
}
