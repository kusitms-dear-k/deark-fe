# 🍰 디어케이 (Dear.K)
### 추억을 쉽고, 맛있게.  <u>**레터링 케이크 큐레이션 서비스**</u> 🎀

![240345](https://github.com/user-attachments/assets/9c03b11b-b68e-4e60-b728-dd5bfc4e7315)

디어케이는 **서로에게 핏-한 가게(메이커)와 고객(피커)를 연결하고 서로에게 집중할 수 있도록** 
환경을 제공하는 큐레이팅 주문 플랫폼입니다.

서비스 URL: https://deark-fe.vercel.app/

## 🗣️ 서비스 소개
<img width="500" alt="image" src="https://github.com/user-attachments/assets/6f3dfaa6-248a-477f-8a48-91e928b77b02" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/856bff90-3dec-4e30-8525-117733ff07e0" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/03319df9-a9d4-40d5-98c3-da21899ff65e" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/a87cc173-6d9d-41fa-855f-e92608c22961" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/a0340323-3b28-4fa9-a89a-b93dc5d344e3" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/ff2e536c-e80e-4746-aac3-6f2e0cfbf429" />
<img width="500" alt="image" src="https://github.com/user-attachments/assets/9d3882ac-ce9b-4e7f-a4c2-d2dd02bd3d78" />


## 💘 팀원 소개
![Slide 16_9 - 207](https://github.com/user-attachments/assets/e9192488-ff3a-44c1-9577-e391baf2cc50)


## 🛠️ 사용 스택 & 선정 이유
- **Next.js**: 
이번 밋업 프로젝트를 진행하면서 성능 및 최적화 그리고 클린코드에 집중하기로 결정했습니다. 이에 맞춰 SSR을 통해 효율적인 데이터 페칭이 가능하고, 자동 코드 분할과 최적화된 이미지 처리로 빠른 페이지 로딩 속도를 제공하는 Next.js를 사용하기로 결정했습니다.
- **TypeScript**: 
컴파일 단에서의 파일 안정성 확보와 코드 가독성 및 유지보수성을 보장하기 위해 TypeScript를 사용합니다.
- **Tailwind CSS**:
앱웹 형식인 서비스 특성에 맞추어 반응형 디자인을 쉽게 할 수 있고, 유틸리티 클래스를 통해 빠르게 스타일링이 가능한 Tailwind CSS를 사용합니다.

## 📱 시연 영상
<table>
  <tr>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/fd30da50-fee6-4d3e-977d-65d485853c29" /><br>1️⃣ 온보딩</td>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/9f725b2f-fe55-49f0-801e-211acf2b66d7" /><br>2️⃣ 홈 화면</td>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/74065798-febe-4c35-9d34-f8ff4b5ed027" /><br>3️⃣ 가게/디자인 상세</td>
  </tr>
  <tr>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/a8e1963c-d7a5-4bdf-a95b-b482701c3729" /><br>4️⃣ 마이페이지</td>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/9cd01092-943c-4f69-a115-bafcc3583864" /><br>5️⃣ 주문서</td>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/06ad67cd-51b1-486a-a7f7-1063af9d3458" /><br>6️⃣ 알림</td>
  </tr>
  <tr>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/af4349b2-a1b6-47f7-a0d5-51bd43d12fab" /><br>7️⃣ 이벤트</td>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/ebabcaba-86d7-4f1d-989a-5e1f2ecfc93d" /><br>8️⃣ 이벤트 상세</td>
    <td align="center"><img width="300" src="https://github.com/user-attachments/assets/071bbedf-edb2-476e-a1fd-f797347453e1" /><br>9️⃣ 찜하기</td>
  </tr>
</table>



## 🌐 시스템 아키텍처
![아키텍처](https://github.com/user-attachments/assets/d6fd0075-d54a-4082-b00e-6ddb7af37f72)

## 📦 Package
```
src
├── api
│   └── hooks
│       └── search
├── app
│   ├── design
│   │   └── [id]
│   ├── event
│   │   └── [id]
│   ├── landing
│   ├── login
│   ├── mypage
│   │   ├── approve     
│   │   ├── order
│   │   └── review
│   ├── notice
│   ├── search
│   ├── sign-up
│   └── store
│       └── [id]
├── assets
├── components
│   ├── alarm
│   ├── authentication
│   │   ├── sign-up-picker
│   │   └── terms-of-service
│   ├── common
│   ├── event
│   │   ├── detail
│   │   └── main
│   ├── home
│   ├── landing
│   ├── mypage
│   ├── notice
│   ├── onboarding
│   ├── order
│   │   └── order-form
│   ├── search
│   ├── skeleton
│   └── ui
├── hooks
├── lib
├── providers
├── store
├── types
└── utils
    └── common
```
