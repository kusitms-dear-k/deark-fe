'use client';

import NavBar from '@/components/common/NavBar';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  );
};
export default HomeLayout;
