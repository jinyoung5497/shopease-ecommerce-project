# SHOPEASE: 디자인 시스템과 모노레포 적용

![shopease](https://github.com/user-attachments/assets/3c215e5f-1fc0-4fa7-88a9-8bbec381783d)

#### 프로젝트 소개

디자인 시스템과 모노레포로 구축된 이커머스 플랫폼.
당신의 스타일을 완성할 모든 패션 아이템을 언제 어디서나 손쉽게 쇼핑하세요.

#### 프로젝트 진행기간

2024.10.16 ~ 2024.11.14 (4주)

#### 프로젝트 배포링크

[SHOPEASE 배포링크](https://shopease-ecommerce-project.vercel.app/)

[STORYBOOK 배포링크](https://672b14386c9e6d4a0c4ba4be-epvgxdzctl.chromatic.com/?path=/docs/components-button--docs)

##### 테스트 계정

##### 아래 로그인정보를 입력하거나 로그인 페이지에 테스터 로그인 버튼이 있습니다.

> 판매자  
> ID: testSeller@gmail.com  
> PW: Qlalfqjsgh1!
>
> 구매자  
> ID: testBuyer@gmail.com  
> PW: Qlalfqjsgh1!
> <br/>

## 🛠 기술스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"> <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

<img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white"/> <img src="https://img.shields.io/badge/Chromatic-FC521F?style=for-the-badge&logo=Chromatic&logoColor=white"/>

<img src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=Turborepo&logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">

<br/>

## 💭 기술적 의사결정

- **디자인 시스템 구축**: 재사용성과 일관성을 위한 설계 및 도구 활용법

- **모노레포의 필요성과 도입 전략**: 프로젝트 관리 효율성 증가 사례

- 스토리북과 크로마틱 배포 / CI/CD 효율적으로 활용하기 (feat. Github Actions) Chromatic

- 컴파운드 컴포넌트로 재사용성과 가독성 높이기

- 전역상태관리 기준에 대한 고찰

- 제어 컴포넌트와 비제어 컴포넌트 비교

- 비지니스 로직과 뷰 분리

- FSD 폴더 아키텍쳐

- asChild (render delegation 사용하기)

<br/>

## 🔥 성능 최적화

- 이미지 최적화로 이미지 크기 75% 줄이기
- 랜더링 최적화 React.memo, useCallback, useMemo
  - LCP 3s -> 1s / TBT 190ms -> 0ms
- lazy loading과 suspense 코드 스플리팅

  <br/>

## 🔫 트러블 슈팅

- 상품 prefetch로 인한 불필요한 네트워크 요청 해결 (throttledPrefetch)

- throttling과 debounce

- deferred component

<br/>

## 📌 주요기능

##### 토글을 열면 시연영상을 확인하실 수 있습니다

#### <details><summary>로그인 / 회원가입</summary> <br/> <p>로그인 (구글 로그인)</p> <img src="https://github.com/user-attachments/assets/02dac26f-3e37-4bcc-a65d-1a7646e2991a" width="600" /> <br/> <br/> <p>회원가입</p> <img src="https://github.com/user-attachments/assets/5e6c1822-e1fd-4c6d-a258-7f4774233bbd" width="600" /> <br/></details>

- 폼 유효성 검증
- 로그인 후 전역상태로 회원정보 관리
- 구글 로그인 구현

#### <details><summary>전체 상품 조회</summary> <br/> <p>전체상품 - 결과 필터링</p> <img src="https://github.com/user-attachments/assets/63231d86-3901-44fb-86cb-11a708825ab9" width="600" /> <br/> <br/> <p>전체상품 - 무한스크롤</p> <img src="https://github.com/user-attachments/assets/4e03581e-b71c-486c-94f2-a0b0d4bb6ed1" width="600" /> <br/></details>

- 카테고리에 따른 조회 결과 필터링 기능
- 무한스크롤을 활용한 페이지네이션 (React Query)

#### <details><summary>상품 상세 조회</summary><br/> <p>상품 상세정보</p> <img src="https://github.com/user-attachments/assets/2d012bd3-bb32-4a4f-81f2-4c39a6588299" width="600" /><br/></details>

- 상품 정보 조회 및 장바구니 추가
- 이미지 캐러셀을 통한 다량의 상품 이미지 전환

#### <details><summary>[판매자] 판매상품관리</summary> <br/> <p>판매상품관리 - 상품 등록 (이미지 최적화 업로드)</p> <img src="https://github.com/user-attachments/assets/ccc997a9-04e3-448c-99ca-3471dda3c0e8" width="600" /> <br/> <br/> <p>판매상품관리 - 상품 삭제</p> <img src="https://github.com/user-attachments/assets/bb1f1a06-adc2-4ec3-9b9f-6ae62355d760" width="600" /></details>

- 판매 상품 조회, 등록, 수정, 삭제 기능
- 이미지 등록시 webp로 압축

#### <details><summary>[판매자] 관리자페이지</summary> <br/> <p>판매상품관리 - 상품 확인 및 주문 상태 변경</p> <img src="https://github.com/user-attachments/assets/af25a0da-6d30-40e3-b6a1-4ab0b5a13374" width="600" /> <br/></details>

- 주문 완료된 상품 확인 및 주문 상태 변경
- 주문정보의 상태
  - 주문 완료
  - 발송 대기
  - 발송 시작
  - 주문 취소

#### <details><summary>[구매자] 장바구니</summary><br/> <p>장바구니 - 상품추가,수량변경, 상품 삭제</p> <img src="https://github.com/user-attachments/assets/954f9b0d-3c0b-4c36-9a77-a4d87adf78d5" width="600" /> <br/> </details>

- 장바구니 상품 수량 수정 기능
- 선택한 상품 금액 및 개수 계산
- 상품 전체/부분 삭제 기능

#### <details><summary>[구매자] 상품 주문</summary> <br/> <p>주문-결제</p> <img src="https://github.com/user-attachments/assets/c50e1ebe-f093-4290-a175-983b90994e89" width="600" /> <br/> </details>

- 포트원 SDK를 활용한 결제 기능

#### <details><summary>[구매자] 주문 내역 조회 및 주문 취소</summary><br/> <p>주문 정보 조회 및 주문 취소</p> <img src="https://github.com/user-attachments/assets/608c7176-c0f8-4836-b3c7-867c4ba03476" width="600" /></details>

- 상품별 주문 취소 기능

<br/>

## 와이어프레임 구조 설계

> 사용한 디자인 톨 : Figma  
> 설계 기준 : 페이지 및 컴포넌트 단위

![figma_1](https://github.com/user-attachments/assets/8b3204cc-9c2a-4ae6-94ad-ddeee3602bf5)

<br/>

## 🏗 아키텍쳐

![바이핸드아키테쳐](https://github.com/wjstjdus96/byhand/assets/77755620/fa74af48-df72-4b3c-9fb8-6699ba9c5972)
<br/>

## 🗂 폴더구조

```
┣ 📁my-monorepo
  ┣ 📁.turbo
  ┣ 📁apps
    ┣ 📁shopease
      ┣ 📁.turbo
      ┣ 📁public
      ┣ 📁src
        ┣ 📁app
          ┣ 📁assets
        ┣ 📁features
          ┣ 📁auth
            ┣ 📁api
            ┣ 📁hooks
          ┣ 📁cart
            ┣ 📁api
            ┣ 📁hooks
          ┣ 📁order
            ┣ 📁api
            ┣ 📁hooks
          ┣ 📁product
            ┣ 📁api
            ┣ 📁hooks
        ┣ 📁pages
          ┣ 📁administration
          ┣ 📁categoryProduct
          ┣ 📁checkout
          ┣ 📁detailedProduct
          ┣ 📁home
          ┣ 📁login
          ┣ 📁myProducts
          ┣ 📁purchaseHistory
          ┣ 📁signUp
        ┣ 📁shared
          ┣ 📁components
          ┣ 📁error
          ┣ 📁hooks
          ┣ 📁layout
          ┣ 📁types
        ┣ 📁store
          ┣ 📁auth
          ┣ 📁toast
        ┣ main.tsx
    ┣ 📁packages
      ┣ 📁eslint-config
      ┣ 📁typescript-config
      ┣ 📁ui
        ┣ 📁.storybook
        ┣ 📁src
          ┣ 📁components
            ┣ 📁button
            ┣ 📁carousel
            ┣ 📁dropdown
            ┣ 📁input
            ┣ 📁modal
            ┣ 📁sheet
            ┣ 📁toggle
          ┣ 📁hooks
        ┣ 📁turbo
```

- my-monorepo: 모노레포의 루트 디렉토리, 전체 설정 파일 포함
- apps : 개별 프로젝트 저장소
  - shopease: Fashion e-commerce 프로젝트
    - app: 전역 설정 및 초기화 파일
    - features: 기능별 모듈(api, hooks 포함)
    - pages: 페이지별 컴포넌트
    - shared: 공용 컴포넌트 및 훅
    - store: Zustand 기반 전역 상태 관리
- packages: 프로젝트 공용 패키지
  - ui: 디자인 시스템
    - components: 디자인 시스템 컴포넌트
    - hooks: 시스템 전용 커스텀 훅
