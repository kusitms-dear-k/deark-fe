'use client'

import { useState } from 'react'

import SearchInput from '@/components/home/SearchInput'
import NavBar from '@/components/common/NavBar'
import Header from '@/components/common/Header'
import TagList from '@/components/home/TagList'
import { SearchIconRed } from '@/assets/svgComponents'
import TotalSearchPage from '@/components/search/TotalSearchPage';
import Order from '@/components/order/Order';

const HomePage = () => {
  const tagList = ['스승의 날', '여자친구 퇴사 케이크', '강아지 도시락 케이크', '어버이 날', '기념일']
  const [isTotalSearchPage, setIsTotalSearchPage] = useState(false)

  return isTotalSearchPage ? (
    <TotalSearchPage setIsTotalSearchPage={setIsTotalSearchPage} />
  ) : (
    <main className={'relative flex min-h-screen flex-col items-center justify-center px-5'}>
      <Header headerType={'DEFAULT'} />
      <SearchInput
        onClick={() => {
          setIsTotalSearchPage(true)
        }}
        LeftIcon={<SearchIconRed width={24} height={24}></SearchIconRed>}
      />
    </main>
  )
}
export default HomePage
