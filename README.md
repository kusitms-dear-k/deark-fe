# 🍰 디어케이 (Dear.K)
### 추억을 쉽고, 맛있게.  <u>**레터링 케이크 큐레이션 서비스**</u> 🎀

![240345](https://github.com/user-attachments/assets/9c03b11b-b68e-4e60-b728-dd5bfc4e7315)

디어케이는 **서로에게 핏-한 가게(메이커)와 고객(피커)를 연결하고 서로에게 집중할 수 있도록** 
환경을 제공하는 큐레이팅 주문 플랫폼입니다.

## 🗣️ 서비스 소개
<img width="1522" alt="image" src="https://github.com/user-attachments/assets/6f3dfaa6-248a-477f-8a48-91e928b77b02" />
<img width="1698" alt="image" src="https://github.com/user-attachments/assets/856bff90-3dec-4e30-8525-117733ff07e0" />
<img width="1698" alt="image" src="https://github.com/user-attachments/assets/03319df9-a9d4-40d5-98c3-da21899ff65e" />
<img width="1698" alt="image" src="https://github.com/user-attachments/assets/a87cc173-6d9d-41fa-855f-e92608c22961" />
<img width="1698" alt="image" src="https://github.com/user-attachments/assets/a0340323-3b28-4fa9-a89a-b93dc5d344e3" />
<img width="1699" alt="image" src="https://github.com/user-attachments/assets/ff2e536c-e80e-4746-aac3-6f2e0cfbf429" />
<img width="1698" alt="image" src="https://github.com/user-attachments/assets/9d3882ac-ce9b-4e7f-a4c2-d2dd02bd3d78" />


## 💘 팀원 소개
![Slide 16_9 - 207](https://github.com/user-attachments/assets/e9192488-ff3a-44c1-9577-e391baf2cc50)


## 🛠️ 사용 스택 & 선정 이유
- **Next.js**: 
이번 밋업 프로젝트를 진행하면서 성능 및 최적화 그리고 클린코드에 집중하기로 결정했습니다. 이에 맞춰 SSR을 통해 효율적인 데이터 페칭이 가능하고, 자동 코드 분할과 최적화된 이미지 처리로 빠른 페이지 로딩 속도를 제공하는 Next.js를 사용하기로 결정했습니다.
- **TypeScript**: 
컴파일 단에서의 파일 안정성 확보와 코드 가독성 및 유지보수성을 보장하기 위해 TypeScript를 사용합니다.
- **Tailwind CSS**:
앱웹 형식인 서비스 특성에 맞추어 반응형 디자인을 쉽게 할 수 있고, 유틸리티 클래스를 통해 빠르게 스타일링이 가능한 Tailwind CSS를 사용합니다.

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
│   │   ├── [id]
│   │   ├── landing
│   │   ├── login
│   │   └── mypage
│   │       ├── approve
│   │       ├── order
│   │       └── review
│   ├── mypage
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
