'use client';

import { useState } from 'react';
import Image from 'next/image';

import SearchInput from '@/components/home/SearchInput';
import TotalSearchPage from '@/components/search/TotalSearchPage';
import NavBar from '@/components/common/NavBar';
import Header from '@/components/common/Header';
import TagList from '@/components/home/TagList';

const HomePage = () => {
  const tagList = ['스승의 날', '여자친구 퇴사 케이크', '강아지 도시락 케이크', '어버이 날', '기념일']
  const [isTotalSearchPage, setIsTotalSearchPage] = useState(false);

  return (isTotalSearchPage ? <TotalSearchPage setIsTotalSearchPage={setIsTotalSearchPage} /> : (
    <main className={'relative flex min-h-screen flex-col items-center justify-center px-5'}>
      <Header headerType={'DEFAULT'} />
      <SearchInput
        onClick={() => {
          setIsTotalSearchPage(true);
        }}
        onChange={() => {

        }}
        LeftIcon={
        <Image
          src={'/common/search_icon_red.svg'}
          width={24}
          height={24}
          alt={'검색'}
          style={{ width: 24, height: 24 }}
        />}
      />
      <TagList tagList={tagList} />
      <NavBar />
    </main>
    )
  );
};
export default HomePage;
