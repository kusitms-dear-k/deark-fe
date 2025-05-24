import CheckBoxIcon from '@/assets/svgComponents/CheckBoxIcon'
import UnCheckBoxIcon from '@/assets/svgComponents/UnCheckBoxIcon'
import Image from 'next/image'
import { Clipboard, ClipboardIcon } from 'lucide-react'
import { GrayClipboardIcon } from '@/assets/svgComponents'
interface NoticeCardProps {

}

const NoticeCard = ({} : NoticeCardProps) => {
  return (
    <div className="flex gap-x-2 py-4 px-5 border-b-[9px] border-gray-100">
      <UnCheckBoxIcon width={24} height={24} />
      <section className="flex flex-col gap-y-3 w-full">
        <section>
          <div className="relative w-[67px] h-[67px]">
            <Image src={'/common/cake1.png'} alt="케이크" fill className="object-cover rounded-[4px]" />
          </div>

        </section>
        <button className="flex gap-x-1 items-center justify-center body-m-m text-gray-600 rounded-[4px] border border-gray-200 py-2 w-full">
          <GrayClipboardIcon width={16} height={16} />
          내가 보낸 주문서 보러가기
        </button>
      </section>
    </div>
  )
}
export default NoticeCard
