'use client';

import NavBar from '@/components/common/NavBar';

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}
export default SearchLayout;
