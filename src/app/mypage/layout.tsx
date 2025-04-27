'use client';

import NavBar from '@/components/common/NavBar';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}
export default MyPageLayout;
