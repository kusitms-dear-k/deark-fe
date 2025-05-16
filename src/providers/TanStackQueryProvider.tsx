'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export default function TanStackQueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, //실패할 경우 재시도 x
          staleTime: 60000, //캐시 유지 시간 1분
        },
      },
    })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
