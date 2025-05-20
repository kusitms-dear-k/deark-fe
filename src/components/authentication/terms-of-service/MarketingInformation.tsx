import Header from '@/components/common/Header'

interface Props {
  onBack: () => void
}

const MarketingInformation = (props: Props) => {
  const { onBack } = props
  return (
    <>
      <Header headerType={'DYNAMIC'} onBack={onBack} title={'마케팅 수신 동의'} className={'border-b pb-2'} />
      <div className="caption-m p-5 pt-24">
        <strong>[선택] 마케팅 정보 수신 동의 (전문)</strong>

        <ol className="list-decimal space-y-4 pl-4">
          <br />
          <li>
            <p className="mb-1">수신 목적</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>할인 혜택, 신제품 출시, 이벤트 안내 등 홍보 및 마케팅 정보 제공</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">수신 수단</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>카카오톡 쪽지톡, 이메일, 문자(SMS)</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">보유 및 이용 기간</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>동의일로부터 회원 탈퇴 또는 수신 거부 시까지</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">동의 거부 권리 안내</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>해당 동의는 선택 사항이며, 동의하지 않아도 서비스 이용에는 제한이 없습니다.</li>
            </ul>
          </li>
        </ol>
      </div>
    </>
  )
}
export default MarketingInformation
