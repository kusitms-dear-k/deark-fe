'use client';

import NavBar from '@/components/common/NavBar';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}
export default StoreLayout;
