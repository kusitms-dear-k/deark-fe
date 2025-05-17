import Cookies from 'js-cookie'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { getAddressData, getPublicDataToken } from '@/api/commonAPI'
import { AddressType, ResponseType } from '@/types/common'
import { getDesignSearchResult } from '@/api/searchAPI'
import { DesignListResponseType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'

interface Props {
  selectedFilterContents: string[] //최종으로 api 요청에 포함될 content
  setSelectedFilterContents: Dispatch<SetStateAction<string[]>>
}

const AddressFilterContent = (props: Props) => {
  const { selectedFilterContents, setSelectedFilterContents } = props
  const [provinces, setProvinces] = useState<AddressType[]>([]) //광역지방자치단체 ex) 서울특별시, 경기도
  const [districts, setDistricts] = useState<AddressType[]>([]) //시/군/구 ex) 이천시, 강남구
  const [towns, setTowns] = useState<AddressType[]>([]) //동/읍/면 ex) 증포동, 개포통
  const [selectedProvinceAddrName, setSelectedProvinceAddrName] = useState<string>('서울특별시')
  const [selectedDistrictAddrName, setSelectedDistrictAddrName] = useState<string>('')
  // zustand 상태
  const keyword = useSearchStore((state) => state.keyword)
  const startDate = useSearchStore((state) => state.startDate)
  const endDate = useSearchStore((state) => state.endDate)
  const isSameDayOrder = useSearchStore((state) => state.isSameDayOrder)
  const isLunchBoxCake = useSearchStore((state) => state.isLunchBoxCake)
  const isSelfService = useSearchStore((state) => state.isSelfService)
  const minPrice = useSearchStore((state) => state.minPrice)
  const maxPrice = useSearchStore((state) => state.maxPrice)
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  // 00 결과 보기 에서 00을 계산하는 코드
  useEffect(() => {
    if (selectedFilterContents.length > 0) {
      getDesignSearchResult({
        pageParam: 0,
        count: 4,
        sortType: 'ACCURACY',
        keyword: keyword,
        endDate: endDate,
        startDate: startDate,
        isSameDayOrder: isSameDayOrder,
        isLunchBoxCake: isLunchBoxCake,
        isSelfService: isSelfService,
        maxPrice: maxPrice,
        minPrice: minPrice,
        locationList: selectedFilterContents,
      }).then((res: ResponseType<DesignListResponseType>) => {
        setSearchParams({ totalCount: res.results.totalCount })
      })
    } else {
      setSearchParams({ totalCount: 0 })
    }
  }, [selectedFilterContents])

  //필터 기능 사용할 때 처음 token 불러와서 도로명 요청 -> 기본값 서울특별시
  useEffect(() => {
    getPublicDataToken().then((res) => {
      Cookies.set('publicAccessToken', res.result.accessToken, { expires: Date.now() + 604800000 })
      if (Cookies.get('publicAccessToken')) {
        //광역지방자치단체 요청 ex) 서울특별시, 경기도
        getAddressData(Cookies.get('publicAccessToken') as string).then((res) => {
          setProvinces(res.result)
        })
        //서울 특별시(cd:11) 시/군/구 요청 ex) 강남구, 강동구
        getAddressData(Cookies.get('publicAccessToken') as string, '11').then((res) => {
          const districtList = res.result

          const updatedDistricts = [
            {
              cd: '',
              full_addr: '',
              x_coor: '',
              y_coor: '',
              addr_name: '전체',
            },
            ...districtList,
          ]

          setDistricts(updatedDistricts)
        })
      }
    })
  }, [])

  /**
   * 최종 api filter 에 들어갈 리스트 선택 함수
   * @param filterContent
   */
  const toggleFilterContentsSelection = (filterContent: string) => {
    setSelectedFilterContents((prevState) => {
      // 이미 선택된 항목이면 제거
      if (prevState.includes(filterContent)) {
        return prevState.filter((name) => name !== filterContent)
      }

      // 새 항목 추가 (최대 10개 제한)
      if (prevState.length < 10) {
        return [...prevState, filterContent]
      }

      // 10개 이상이면 아무 변화 없이 반환
      return prevState
    })
  }

  /**
   * 광역지방자치단체 클릭 함수 ex) 서울특별시, 경기도
   * @param province 광역지방자치단체 객체 ex) 서울특별시, 경기도
   */
  const provinceButtonOnClick = (province: AddressType) => {
    setTowns([]) // province 가 변경될 때 동/읍/면도 초기화
    setSelectedDistrictAddrName('') // province 가 변경될 때 기존에 선택되었던 시/군/구도 초기화
    setSelectedProvinceAddrName(province.addr_name)

    getAddressData(Cookies.get('publicAccessToken') as string, province.cd).then((res) => {
      const districtList: AddressType[] = res.result

      // 기존 전체 항목 제거 (이전 province 기준)
      const filteredDistricts = districtList.filter((district) => district.addr_name !== '전체')

      // 새로운 전체 항목 추가
      const updatedDistricts = [
        {
          cd: '',
          full_addr: '',
          x_coor: '',
          y_coor: '',
          addr_name: '전체',
        },
        ...filteredDistricts,
      ]

      setDistricts(updatedDistricts)
    })
  }

  /**
   * 시/군/구 버튼 클릭 함수 ex) 이천시, 강남구 등
   * @param district 시/군/구 객체 ex) 이천시, 강남구 등
   */
  const districtButtonOnClick = (district: AddressType) => {
    setTowns([]) // district 가 변경될 때 동/읍/면도 초기화
    setSelectedDistrictAddrName(district.addr_name)

    // 예를 들어, 서울특별시 전체를 클릭한 경우에는 동/읍/면이 뜨지 않도록 요청 제어
    if (district.addr_name === '전체') {
      const fullName = `${selectedProvinceAddrName} 전체`
      toggleFilterContentsSelection(fullName)
      return
    }

    getAddressData(Cookies.get('publicAccessToken') as string, district.cd).then((res) => {
      const townList: AddressType[] = res.result

      // 기존 전체 항목 제거 (이전 province 기준)
      const filteredTowns = townList.filter((town) => town.addr_name !== `${district.addr_name} 전체`)

      // 새로운 전체 항목 추가
      const updatedTowns = [
        {
          cd: '',
          full_addr: '',
          x_coor: '',
          y_coor: '',
          addr_name: `${district.addr_name} 전체`,
        },
        ...filteredTowns,
      ]

      setTowns(updatedTowns)
    })
  }

  return (
    <>
      <div className={selectedFilterContents.length > 0 ? 'flex h-[230px]' : 'flex h-[322px]'}>
        {/* 광역지방자치단체, provinces */}
        <section className="w-[150px] overflow-y-scroll border-r border-[var(--gray-150)]">
          {provinces &&
            provinces.map((province) => {
              return (
                <button
                  onClick={() => {
                    provinceButtonOnClick(province)
                  }}
                  key={province.addr_name}
                  className={
                    selectedProvinceAddrName === province.addr_name
                      ? 'title-l flex w-full justify-start bg-[var(--blue-100)] px-5 py-[10px]'
                      : 'body-l flex w-full justify-start px-5 py-[10px] text-[var(--gray-600)]'
                  }
                >
                  {province.addr_name}
                </button>
              )
            })}
        </section>

        {/* 시/군/구, districts */}
        <section className="w-[160px] overflow-y-scroll border-r border-[var(--gray-150)]">
          {districts &&
            districts.map((district) => {
              return (
                <button
                  onClick={() => {
                    districtButtonOnClick(district)
                  }}
                  key={district.addr_name}
                  className={
                    selectedDistrictAddrName === district.addr_name
                      ? 'title-l flex w-full justify-start bg-[var(--gray-100)] px-5 py-[10px]'
                      : 'body-l flex w-full justify-start px-5 py-[10px] text-[var(--gray-600)]'
                  }
                >
                  {district.addr_name}
                </button>
              )
            })}
        </section>

        {/* 동/읍/면 - towns */}
        <section className="w-[140px] overflow-y-scroll border-r border-[var(--gray-150)]">
          {towns &&
            towns.map((town) => {
              return (
                <button
                  onClick={() => {
                    toggleFilterContentsSelection(town.addr_name)
                  }}
                  key={town.addr_name}
                  className={
                    selectedFilterContents.includes(town.addr_name)
                      ? 'title-l flex w-full justify-start px-5 py-[10px]'
                      : 'body-l flex w-full justify-start px-5 py-[10px] text-[var(--gray-600)]'
                  }
                >
                  {town.addr_name}
                </button>
              )
            })}
        </section>
      </div>

      {/* 지금까지 선택된 필터 내용 */}
      {selectedFilterContents.length > 0 && (
        <div
          style={{ boxShadow: '0px -6px 8px 0px rgba(129, 129, 129, 0.05)' }}
          className="flex flex-col gap-y-[8px] px-5 py-[10px]"
        >
          <section className="flex gap-x-[7px]">
            <p className="title-l">선택한 위치</p>
            <p className="body-l text-[var(--gray-500)]">
              <span className="text-[var(--blue-400)]">{selectedFilterContents.length}</span>/10
            </p>
          </section>
          <section className="flex flex-wrap gap-[9px]">
            {selectedFilterContents &&
              selectedFilterContents.map((selectedTownAddrName) => {
                return (
                  <button
                    onClick={() => {
                      setSelectedFilterContents((prevState) => {
                        // 이미 선택된 항목이면 제거
                        if (prevState.includes(selectedTownAddrName)) {
                          return prevState.filter((name) => name !== selectedTownAddrName)
                        }

                        return prevState
                      })
                    }}
                    key={selectedTownAddrName}
                    className="title-l flex items-center gap-x-1 rounded-[4px] bg-[var(--blue-100)] px-[6px] py-[5px] whitespace-nowrap text-[var(--blue-400)]"
                  >
                    {selectedTownAddrName}
                    <div className="relative h-[18px] w-[18px]">
                      <Image src="/search/blue-cancel.svg" alt="삭제" fill className="object-cover" />
                    </div>
                  </button>
                )
              })}
          </section>
        </div>
      )}
    </>
  )
}
export default AddressFilterContent
