'use client'

import { useEffect, useState } from 'react';

import SearchInput from '@/components/home/SearchInput'
import NavBar from '@/components/common/NavBar'
import Header from '@/components/common/Header'
import TagList from '@/components/home/TagList'
import { SearchIconRed } from '@/assets/svgComponents'
import TotalSearchPage from '@/components/search/TotalSearchPage';
import { useLoginStore } from '@/store/authStore';
import WelcomeModal from '@/components/authentication/WelcomeModal';
import { AnimatePresence } from 'framer-motion';
import GuardianModal from '@/components/authentication/GuardianModal';

const HomePage = () => {
  const tagList = ['스승의 날', '여자친구 퇴사 케이크', '강아지 도시락 케이크', '어버이 날', '기념일']
  const [isTotalSearchPage, setIsTotalSearchPage] = useState(false)

  const setState = useLoginStore((state) => state.setState)
  const isWelcomeModalOpen = useLoginStore((state) => state.isWelcomeModalOpen)
  const isGuardianModalOpen = useLoginStore((state) => state.isGuardianModalOpen)


  // ✅ 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isWelcomeModalOpen) {
      const timer = setTimeout(() => {
        setState({ isWelcomeModalOpen: false, isGuardianModalOpen: true })
      }, 3000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isWelcomeModalOpen, setState])

  return isGuardianModalOpen ? (
      <AnimatePresence>
        <GuardianModal onClick={() => setState({ isGuardianModalOpen: false })} />
      </AnimatePresence>
  ) : isTotalSearchPage ? (
    <TotalSearchPage setIsTotalSearchPage={setIsTotalSearchPage} />
  ) : (
    <main className={'relative flex min-h-screen flex-col items-center justify-center px-5'}>
      {isWelcomeModalOpen && (
        <AnimatePresence>
          {isWelcomeModalOpen && (
            <WelcomeModal onClick={() => setState({ isWelcomeModalOpen: false })} />
          )}
        </AnimatePresence>
      )}
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
