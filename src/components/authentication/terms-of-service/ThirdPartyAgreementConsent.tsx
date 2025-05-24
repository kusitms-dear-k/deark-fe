import Header from '@/components/common/Header'

interface Props {
  onBack: () => void
}

const ThirdPartyAgreementConsent = (props: Props) => {
  const { onBack } = props

  const THIRD_PARTY_TERMS = [
    {
      title: '제공받는 자',
      items: ['케이크 주문을 수락 및 제작하는 메이커(가게)'],
    },
    {
      title: '제공 항목',
      items: ['수령자명, 연락처, 수령 희망일, 주문서 내용'],
    },
    {
      title: '제공 목적',
      items: ['정확한 주문 확인 및 제작, 배송 또는 수령 조율'],
    },
    {
      title: '보유 및 이용 기간',
      items: ['주문 완료 후 3개월 또는 관련 법령에 따른 기간까지'],
    },
    {
      title: '동의 거부 권리 안내',
      items: ['해당 동의는 선택 사항이며, 거부 시 일부 주문 기능 이용이 제한될 수 있습니다.'],
    },
  ]

  return (
    <>
      <Header headerType={'DYNAMIC'} onBack={onBack} title={'제3자 정보 제공 동의 '} />
      <div className="caption-m p-5 pt-24">
        <strong>[선택] 제3자 정보 제공 동의 (전문)</strong>
        <ol className="mt-4 list-decimal space-y-4 pl-4">
          {THIRD_PARTY_TERMS.map(({ title, items }, index) => (
            <li key={index}>
              <p className="mb-1">{title}</p>
              <ul className="list-disc space-y-1 pl-5">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
export default ThirdPartyAgreementConsent
