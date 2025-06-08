import { Dispatch, SetStateAction } from 'react'

interface Props {
  storeDetailMenu: '가게 정보' | '디자인' | '리뷰'
  setStoreDetailMenu: Dispatch<SetStateAction<'가게 정보' | '디자인' | '리뷰'>>
}

const StoreDetailMenu = (props: Props) => {
  const { storeDetailMenu, setStoreDetailMenu } = props

  const storeDetailMenuContents: ('가게 정보' | '디자인' | '리뷰')[] = ['가게 정보', '디자인', '리뷰']

  return (
    <div className="fixed top-68 flex w-full bg-white">
      {storeDetailMenuContents.map((storeDetailMenuContent: '가게 정보' | '디자인' | '리뷰') => {
        return (
          <button
            key={storeDetailMenuContent}
            onClick={() => {
              setStoreDetailMenu(storeDetailMenuContent)
            }}
            className={
              storeDetailMenu === storeDetailMenuContent
                ? 'title-l h-[2.75rem] w-full border-b-[0.25rem] border-red-400 text-red-400'
                : 'body-l h-[2.75rem] w-full border-b-[0.25rem] border-gray-300 text-gray-300'
            }
          >
            {storeDetailMenuContent}
          </button>
        )
      })}
    </div>
  )
}
export default StoreDetailMenu
