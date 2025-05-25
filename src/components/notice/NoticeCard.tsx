import CheckBoxIcon from '@/assets/svgComponents/CheckBoxIcon'
import UnCheckBoxIcon from '@/assets/svgComponents/UnCheckBoxIcon'
import Image from 'next/image'
import { Clipboard, ClipboardIcon } from 'lucide-react'
import { CancelIcon, GrayClipboardIcon } from '@/assets/svgComponents'
interface NoticeCardProps {

}

const NoticeCard = ({} : NoticeCardProps) => {
  return (
    <div className="flex gap-x-2 border-b-[9px] border-gray-100 px-5 py-4">
      <UnCheckBoxIcon width={24} height={24} />
      <section className="flex w-full flex-col gap-y-3">
        <section className="flex justify-between">
          <div className="flex gap-x-3">
            <div className="relative h-[67px] w-[67px]">
              <Image src={'/common/cake1.png'} alt="케이크" fill className="rounded-[4px] object-cover" />
            </div>
            <div>
              <p className="body-m-m"><span className="title-m">케이커링</span>에서 <br />
                피커님의 주문서를 수락했어요.</p>
              <div className="flex gap-x-1">
                <div className="bg-blue-100 text-blue-400 rounded-[27px] px-[6px] body-s-m">수락</div>
                <p className="body-s text-gray-400">3분 전</p>
              </div>
            </div>
          </div>
          <CancelIcon width={24} height={24} />
        </section>
        <button className="body-m-m flex w-full items-center justify-center gap-x-1 rounded-[4px] border border-gray-200 py-2 text-gray-600">
          <GrayClipboardIcon width={16} height={16} />
          내가 보낸 주문서 보러가기
        </button>
      </section>
    </div>
  )
}
export default NoticeCard
