import Header from '@/components/common/Header'

interface Props {
  onBack: () => void
}

const PersonalInformation = (props: Props) => {
  const { onBack } = props
  return (
    <div>
      <Header headerType={'DYNAMIC'} title={'개인정보 수집이용 동의'} onBack={onBack} className={'border-b pb-2'} />
      <div className="caption-m p-5 pt-24">
        <strong>[필수] 개인정보 수집·이용 동의 (전문)</strong>

        <ol className="list-decimal space-y-4 pl-4">
          <br />
          <li>
            <p className="mb-1">수집 항목</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>(필수) 카카오 계정 정보: 닉네임, 프로필 이미지, 이메일 주소</li>
              <li>(필수) 주문 시: 수령자명, 연락처, 수령 희망일, 수령 장소</li>
              <li>(선택) 마케팅 수신 동의 시: 광고 수신을 위한 이메일/전화번호</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">수집 및 이용 목적</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>서비스 제공 및 운영을 위한 회원 식별 및 관리</li>
              <li>주문 접수 및 메이커 전달, 쪽지 발송</li>
              <li>고객 문의 응대, 공지사항 전달</li>
              <li>통계 분석 및 서비스 개선</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">보유 및 이용 기간</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>회원 탈퇴 시 또는 법령이 정하는 기간까지 보관 후 파기</li>
            </ul>
          </li>

          <li>
            <p className="mb-1">동의 거부 권리 안내</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>개인정보 수집·이용에 대한 동의를 거부할 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다.</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  )
}
export default PersonalInformation
