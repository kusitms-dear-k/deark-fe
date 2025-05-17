import React from 'react';
import {
  BellIcon, DownLineIcon,
  ProfileIcon,
  RedHeartIcon,
  RedHomeIcon,
  RedMypageIcon,
  RedSearchIcon,
  UpLineIcon,
} from '@/assets/svgComponents'

interface Props {
  onClick: () => void
}
const GuardianModal = (props: Props) => {
  const { onClick } = props
  return (
    <div className="bg-white min-h-screen">
      <div className="px-5 pt-[48px] flex w-full justify-between">
        <div>
          <h1 className="key-visual-m text-red-400">Cake is easy</h1>

          <div className="body-el">
            안녕하세요, <span className="headline-s text-gray-900">리무진님!</span>{' '}
          </div>
        </div>
        <div className="relative flex w-[130px] items-center justify-center gap-x-[0.75rem]">
          <ProfileIcon className="absolute top-1 right-0" width={32} height={32} />
        </div>
      </div>
      <div
        onClick={onClick}
        className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]">
        <div className="absolute top-6 left-5 w-[90%]">
          <div className="flex w-full justify-between">
            <div>
            </div>
            <div className="relative flex w-[130px] items-center justify-center gap-x-[0.75rem]">
              <section className="absolute left-5 top-6 flex flex-col items-center justify-center">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FFA7B380]">
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
                    <BellIcon width={24} height={24} />
                  </div>
                </div>
                <div className={'h-[40px] w-[1px] border border-dashed border-[#FFB2B2]'} />
                <section className="mt-2 flex flex-col items-center justify-center gap-y-[2px]">
                  <h5 className="chip-s-bold text-white">알림</h5>
                  <p className="caption-m text-center text-white">
                    최근 주문 문의에 대한 <br />
                    대답을 확인해요.
                  </p>
                </section>
              </section>
            </div>
          </div>
        </div>

        <div className={' top-1/2 right-3 bottom-1/2 left-3 flex flex-col gap-y-2'}>
          <div className="ml-20 flex gap-x-[2px]">
            <div className="flex flex-col justify-end">
              <p className="chip-m text-white">준비하는 상황, 받는 사람, 위치, 스타일 등</p>
              <p className="chip-s-bold text-white">다양한 키워드로 케이크를 찾아보세요.</p>
            </div>
            <DownLineIcon width={29} height={43} />
          </div>

          <div className="flex w-full gap-x-2 rounded-full bg-white px-4 py-[12px]">
            <RedSearchIcon width={24} height={24} />
            <p className="body-l-m text-gray-400">어떤 추억이 필요하세요?</p>
          </div>
          <div
            className="flex w-full items-center justify-center gap-x-2 rounded-full border border-dashed border-red-200 p-[6px]">
            <div className="title-s w-fit rounded-full bg-[#DCEDFF] px-4 py-2 text-blue-400">스승의 날</div>
            <div className="title-s w-fit rounded-full bg-[#DCEDFF] px-4 py-2 text-blue-400">여자친구 퇴사 케이크</div>
            <div className="title-s w-fit rounded-full bg-[#DCEDFF] px-4 py-2 text-blue-400">강아지 도시락 케이크</div>
          </div>
          <div className="flex gap-x-[2px] ml-5">
            <UpLineIcon width={20} height={36} />
            <div className="mt-3 chip-s-bold text-white">요즘 뜨는 레터링케이크 검색 트렌드예요.</div>
          </div>
        </div>

        <div className="absolute bottom-5 flex gap-x-[17px]">
          <section className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center gap-x-[2px]">
              <h5 className="chip-s-bold text-white">홈</h5>
              <p className="caption-m text-center text-white">
                레터링케이크
                <br />
                트렌드를 한 눈에 <br />볼 수 있어요.
              </p>
            </section>
            <div className={'mt-2 h-[28px] w-[1px] border border-dashed border-[#FFB2B2]'}></div>
            <section className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FFA7B34D]">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFA7B380]">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white">
                  <RedHomeIcon width={22} height={22} />
                </div>
              </div>
            </section>
          </section>

          <section className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center gap-x-[2px]">
              <h5 className="chip-s-bold text-white">검색</h5>
              <p className="caption-m text-center text-white">
                나에게 꼭 맞는
                <br />
                디자인과 가게를 <br />
                쉽게 찾아요.
              </p>
            </section>
            <div className={'mt-2 h-[28px] w-[1px] border border-dashed border-[#FFB2B2]'}></div>
            <section className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FFA7B34D]">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFA7B380]">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white">
                  <RedSearchIcon width={22} height={22} />
                </div>
              </div>
            </section>
          </section>

          <section className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center gap-x-[2px]">
              <h5 className="chip-s-bold text-white">찜하기</h5>
              <p className="caption-m text-center text-white">
                이벤트별로
                <br />
                찜해두고 <br />
                쉽게 비교해요.
              </p>
            </section>
            <div className={'mt-2 h-[28px] w-[1px] border border-dashed border-[#FFB2B2]'}></div>
            <section className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FFA7B34D]">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFA7B380]">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white">
                  <RedHeartIcon width={22} height={22} />
                </div>
              </div>
            </section>
          </section>

          <section className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center gap-x-[2px]">
              <h5 className="chip-s-bold text-white">마이페이지</h5>
              <p className="caption-m text-center text-white">
                내 계정 정보와
                <br />
                주문 내역을
                <br />
                확인해요.
              </p>
            </section>
            <div className={'mt-2 h-[28px] w-[1px] border border-dashed border-[#FFB2B2]'}></div>
            <section className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#FFA7B34D]">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFA7B380]">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white">
                  <RedMypageIcon width={22} height={22} />
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>

  )
}
export default GuardianModal
