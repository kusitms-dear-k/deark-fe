import * as React from 'react'
import type { SVGProps } from 'react'
const BlueCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill="#D9D9D9" d="M0 0h15.996v15.996H0z" />
    </mask>
    <g mask="url(#a)">
      <path fill="#3E98F9" d="M6.366 12 2.567 8.2l.95-.95 2.85 2.85 6.115-6.116.95.95z" />
    </g>
  </svg>
)
export default BlueCheckIcon
