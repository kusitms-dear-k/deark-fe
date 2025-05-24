'use client'
import { useState, useEffect, useCallback } from 'react'
import EventButtons from './EventButtons'
import { GraySearchIcon } from '@/assets/svgComponents'
import debounce from 'lodash.debounce'

interface LocationSelectionContentProps {
  onSelect: (location: string) => void
  onCancel: () => void
}

declare global {
  interface Window {
    kakao: any
  }
}

const LocationSelectionContent = ({ onSelect, onCancel }: LocationSelectionContentProps) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  // Kakao 지도 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${'eacc39192beeb6795003897bf2fc9471'}&libraries=services&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        // API 로드 완료
      })
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 자동완성 기능 구현 전 그냥 검색
  //   const handleSearch = () => {
  //     if (!searchKeyword || !window.kakao) return

  //     const places = new window.kakao.maps.services.Places()

  //     places.keywordSearch(searchKeyword, (result: any, status: any) => {
  //       if (status === window.kakao.maps.services.Status.OK) {
  //         setSearchResults(result)
  //       } else {
  //         setSearchResults([])
  //       }
  //     })
  //   }

  //   const handleKeyDown = (e: React.KeyboardEvent) => {
  //     if (e.key === 'Enter') {
  //       handleSearch()
  //     }
  //   }

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (!query || !window.kakao) {
        setSearchResults([])
        return
      }

      const places = new window.kakao.maps.services.Places()
      places.keywordSearch(query, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(result)
        } else {
          setSearchResults([])
        }
      })
    }, 300), // 300ms 디바운스
    []
  )

  useEffect(() => {
    handleSearch(searchKeyword)
  }, [searchKeyword, handleSearch])

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location.place_name)
    setSearchKeyword(location.place_name)
  }

  return (
    <div className="flex flex-col items-center border-t border-t-gray-200 pt-6">
      <div className="relative mb-5 flex h-[3.125rem] w-[21.875rem] items-center">
        <div className="absolute inset-y-0 left-4 mr-2 flex items-center">
          <GraySearchIcon width={24} height={24} />
        </div>
        <input
          type="text"
          className="border-gray-150 button-m bg-whites shadow-location-search h-full w-full rounded-[7rem] border pr-4 pl-12 text-gray-900 placeholder:text-gray-400 focus:outline-none"
          placeholder="지번, 도로명, 건물명으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          //   onKeyDown={handleKeyDown}
        />
      </div>

      <div className="mb-4 w-full text-start">
        {!(searchResults.length > 0) && <h3 className="title-l mb-2 px-14">검색 예시</h3>}
        <div className="h-64 overflow-y-auto">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((place, index) => (
                <li key={index}>
                  <button
                    className="body-m-m h-[3.813rem] w-full px-7 text-left text-gray-900"
                    onClick={() => handleLocationSelect(place)}
                  >
                    {place.place_name}
                    <div className="body-s-m text-gray-600">({place.address_name})</div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="body-l-m space-y-3 px-16 text-gray-500">
              <li>
                <div>• 도로명 + 건물번호</div>
                <div className="body-m">(예: 송파대로 570)</div>
              </li>
              <li>
                <div>• 지역명 + 번지</div>
                <div className="body-m">(예: 신천동 7-30)</div>
              </li>
              <li>
                <div>• 건물명, 상호명</div>
                <div className="body-m">(예: 롯데월드타워)</div>
              </li>
            </ul>
          )}
        </div>
      </div>

      <hr className="w-full border-t border-gray-200" />
      <EventButtons
        onCancel={onCancel}
        onClickActiveBtn={() => onSelect(selectedLocation || searchKeyword)}
        eventValue={selectedLocation || searchKeyword}
        activeBtnText="선택 완료"
      />
    </div>
  )
}

export default LocationSelectionContent
