import Header from '@/components/common/Header'

interface Props {
  onBack: () => void
}
const TermsOfServiceOptions = (props: Props) => {
  const { onBack } = props

  const ARTICLE1 = [
    '“서비스”란 이용자가 원하는 디자인의 케이크를 검색, 저장, 주문할 수 있도록 하고, 케이크 제작자(이하 "메이커")와 연결해주는 온라인 플랫폼을 의미합니다.',
    '“이용자”란 본 약관에 따라 서비스를 이용하는 자를 말합니다.',
    '“메이커”란 디어케이에 가게 및 디자인 정보를 등록하고, 이용자의 주문을 받아 케이크를 제작·판매하는 자를 말합니다.',
  ]

  const ARTICLE3 = [
    '본 약관은 서비스 초기화면 또는 별도의 연결화면에 게시하여 공지하며, 이에 동의한 이용자에게 효력을 발생합니다.',
    '회사는 관련 법령을 위반하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경된 약관은 공지사항을 통해 사전 고지합니다.',
  ]

  const ARTICLE5 = [
    '케이크 디자인 및 메이커 검색 기능',
    '디자인 및 가게 즐겨찾기, 저장 기능',
    '메이커에게 주문서 전달 및 수락/반려 기능',
    '주문 현황 확인 및 쪽지 기능',
  ]

  return (
    <>
      <Header headerType={'DYNAMIC'} title={'이용약관 동의'} onBack={onBack} className={'border-b pb-2'} />
      <div className="caption-m p-5 pt-24">
        <strong>[필수] 이용약관 동의 (전문)</strong>
        <div>
          <p>
            <br />
            제1조 (목적)
            <br /> 이 약관은 회원(이하 "이용자")이 디어케이(이하 "회사")가 제공하는 레터링 케이크 중개 플랫폼(이하
            "서비스")를 이용함에 있어, 회사와 이용자 간의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
            합니다.
            <br />
          </p>

          <div>
            <br />
            <p>제2조 (정의)</p>
            <ol className="list-decimal pl-5">
              {ARTICLE1.map((article) => {
                return <li key={article}>{article}</li>
              })}
            </ol>
          </div>

          <div>
            <br />
            <p>제3조 (약관의 효력 및 변경)</p>

            <ol start={4} className="list-decimal pl-5">
              {ARTICLE3.map((article) => {
                return <li key={article}>{article}</li>
              })}
            </ol>
          </div>

          <p>
            <br />
            제4조 (서비스 이용 계약의 성립)
            <br />
            이용자가 본 약관에 동의하고 회원가입 절차를 완료하면, 회사와 이용자 간의 서비스 이용 계약이 성립됩니다.
          </p>

          <div>
            <div>
              <br />
              <p>제5조 (서비스의 제공)</p>
              <ol start={6} className="list-decimal pl-5">
                <li>회사는 다음과 같은 서비스를 제공합니다:</li>
              </ol>
            </div>

            <ul className="list-disc space-y-1 pl-5">
              {ARTICLE5.map((article) => {
                return <li key={article}>{article}</li>
              })}
            </ul>

            <p className="pt-2">단, 회사는 서비스의 품질 향상을 위해 서비스 내용을 추가하거나 변경할 수 있습니다.</p>
          </div>

          <p>
            <br />
            제6조 (이용자의 의무)
            <br />
            이용자는 관계 법령, 본 약관의 규정, 이용안내 및 서비스 상의 주의사항 등을 준수해야 하며, 회사의 업무에
            방해되는 행위를 하여서는 안 됩니다.
          </p>
        </div>
      </div>
    </>
  )
}
export default TermsOfServiceOptions
