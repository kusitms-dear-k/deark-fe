'use client'

import NavBar from '@/components/common/NavBar'

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}
export default EventLayout
