import Image from 'next/image';
import SearchInput from '@/components/home/SearchInput';
import { useRouter } from 'next/navigation';
import { HeaderType } from '@/types/common';

interface Props {
  onBack?: () => void;
  headerType: HeaderType;
}

const Header = (props: Props) => {
  const { onBack, headerType } = props;
  const router = useRouter();
  const renderHeaderType = (headerType: HeaderType) => {
    switch (headerType) {
      case 'DEFAULT':
        return (
          <section className={'absolute top-10 left-5 w-[90%]'}>
            <div className={'flex w-full justify-between'}>
              <h1 className={'key-visual-m text-[var(--red-400)]'}>Cake is easy</h1>
              <div className={'flex items-center gap-x-3'}>
                <div className={'relative p-1'}>
                  <Image
                    src={'/common/message.svg'}
                    width={24}
                    height={24}
                    alt={'쪽지'}
                    style={{ width: 24, height: 24 }}
                  />
                  <div className={'absolute top-0 right-0 h-[6px] w-[6px] rounded-full bg-[var(--red-400)]'}></div>
                </div>

                <Image
                  onClick={() => {
                    router.push('/mypage');
                  }}
                  src={'/common/profile.svg'}
                  width={32}
                  height={32}
                  alt={'프로필'}
                  style={{ width: 32, height: 32 }}
                />
              </div>
            </div>
            <div className={'body-el'}>
              안녕하세요, <span className={'headline-s text-[var(--gray-900)]'}>리무진님!</span>{' '}
            </div>
          </section>
        )
      case 'DYNAMIC':
        return (
          <div></div>
        );
      case 'SEARCH':
        return (
          <div className={'flex gap-x-2 items-center w-full'}>
            <Image
              onClick={() => {
                onBack ? onBack() : router.back();
              }}
              className={'cursor-pointer'}
              src={'/common/left_arrow.svg'}
              width={24}
              height={24}
              alt={'화살표'}
              style={{ width: 24, height: 24 }}
            />
            <SearchInput
              RightIcon={
                <div className={'flex gap-x-4 items-center'}>
                  <div className={'h-[16px] border-l border-[var(--gray-300)]'} />
                  <Image
                    src={'/common/search_icon_red.svg'}
                    width={24}
                    height={24}
                    alt={'찾기'}
                    style={{ width: 24, height: 24 }}
                  />
                </div>
              }
            />
          </div>
        )
    }
  }
  return (
    <section className={'flex items-center pt-[66px] w-full'}>
      {renderHeaderType(headerType)}
    </section>
  )
}
export default Header
