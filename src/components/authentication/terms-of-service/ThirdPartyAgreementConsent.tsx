import Header from '@/components/common/Header'

interface Props {
  onBack: () => void
}

const ThirdPartyAgreementConsent = (props: Props) => {
  const { onBack } = props
  return (
    <>
      <Header headerType={'DYNAMIC'} onBack={onBack} title={'제3자 정보 제공 동의 '} />
      <div className="caption-m p-5 pt-24">
        <strong>[선택] 제3자 정보 제공 동의 (전문)</strong>
        <ol className="list-decimal space-y-4 pl-4">
          <br />
          <li>
            <p className="mb-1">제공받는 자</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>케이크 주문을 수락 및 제작하는 메이커(가게)</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">제공 항목</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>수령자명, 연락처, 수령 희망일, 주문서 내용</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">제공 목적</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>정확한 주문 확인 및 제작, 배송 또는 수령 조율</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">보유 및 이용 기간</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>주문 완료 후 3개월 또는 관련 법령에 따른 기간까지</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">동의 거부 권리 안내</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>해당 동의는 선택 사항이며, 거부 시 일부 주문 기능 이용이 제한될 수 있습니다.</li>
            </ul>
          </li>
        </ol>
      </div>
    </>
  )
}
export default ThirdPartyAgreementConsent
