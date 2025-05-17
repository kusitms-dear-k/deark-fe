import { useSearchStore } from '@/store/searchStore'
import { useRouter } from 'next/navigation'

interface Props {
  tagList: string[];
}

const TagList = (props: Props) => {
  const {tagList} = props;
  const router = useRouter();
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  return (
    <section className={'mt-[12.5px] flex w-full gap-x-2 overflow-x-scroll'}>
      {tagList.map((tag) => {
        return (
          <button
            onClick={() => {
              setSearchParams({keyword: tag})
              router.push('/search')
            }}
            key={tag}
            className={
              'title-s flex items-center justify-center rounded-full bg-[#DCEDFF] px-4 py-2 whitespace-nowrap text-[var(--blue-400)]'
            }
          >
            {tag}
          </button>
        );
      })}
    </section>
  )
}
export default TagList
