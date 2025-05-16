'use client'

import NavBar from '@/components/common/NavBar'

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  )
}
export default OrderLayout
