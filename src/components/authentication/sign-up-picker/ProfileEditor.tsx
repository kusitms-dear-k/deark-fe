import Image from 'next/image'
import { CameraIcon } from '@/assets/svgComponents'
import { RefObject } from 'react'
import { useLoginStore } from '@/store/authStore'

interface Props {
  imgRef: RefObject<HTMLInputElement | null>
  uploadImage: string | ArrayBuffer | null | undefined
  handleImagePreview: () => void
}

const ProfileEditor = (props: Props) => {
  const {imgRef, uploadImage, handleImagePreview} = props
  const user = useLoginStore((state) => state.user)

  return (
    <section className="mt-20 flex w-full flex-col items-center justify-center gap-y-3">
      <div onClick={() => imgRef.current?.click()} className="relative w-fit cursor-pointer p-1">
        <div className="relative h-[60px] w-[60px]">
          <Image
            src={
              typeof uploadImage === 'string'
                ? uploadImage
                : user?.profileImageUrl
                  ? user?.profileImageUrl
                  : '/common/cake1.png'
            }
            alt="cake"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div
          className="absolute right-0 bottom-0 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-300">
          <CameraIcon />
        </div>
        <input
          type="file"
          id={'input-file'}
          ref={imgRef}
          name="input-file"
          onChange={handleImagePreview}
          className="hidden"
        />
      </div>

      <p className="title-l text-gray-900">디어케이에 오신 것을 환영합니다!</p>
    </section>
  )
}
export default ProfileEditor
