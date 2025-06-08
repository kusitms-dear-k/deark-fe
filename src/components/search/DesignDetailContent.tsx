import Image from 'next/image'
import { DesignDetailType } from '@/types/search'
import { Gray700HeartIcon, HeartIconFill } from '@/assets/svgComponents'
import { useOrderStore } from '@/store/orderStore'
import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useSearchStore } from '@/store/searchStore'
import { useHeartClick } from '@/hooks/useHeartClick'
import { EventApi } from '@/api/eventAPI'
import EventModal from '../event/EventModal'
import EventSelectionContent from '../event/EventSelectContent'
import ToastMsg from '../event/ToastMsg'
import Cookies from 'js-cookie'
import { useEffect } from 'react'


interface Props {
  designDetail: DesignDetailType | undefined
}

const DesignDetailContent = ({ designDetail }: Props) => {

}


export default DesignDetailContent
